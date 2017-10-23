import moment from "moment";
import Exponent, { Permissions } from "expo";
import { Alert } from "react-native";
import { map, includes } from "lodash";
import pushNotifications from "../../api/pushNotifications";
import googleConfig from "../../constants/Google";
import firebaseApp from "../../constants/Firebase";
import imgurConfig from "../../constants/Imgur";
import * as actionTypes from "../actionTypes";
import { photosActions } from "./";

const firebaseRef = firebaseApp.database().ref();

export const addPhoto = photo => (dispatch, getState) => {
  dispatch({
    type: actionTypes.ADD_PHOTO_REQUEST,
    isUploaded: false,
    isUploading: true
  });

  const user = getState().auth.user;
  const photoObject = photo;

  photoObject.id = `PHOTO:${moment().format()}`;
  photoObject.username = user.name;
  photoObject.profilePicture = user.profilePicture;
  photoObject.creationDate = moment().format();
  delete photoObject.isUploading;
  delete photoObject.isUploaded;
  delete photoObject.error;

  // Upload photo URI
  uploadPhotoURI(photoObject.uri)
    .then(url => {
      photoObject.url = url;
      delete photoObject.uri;

      // Save photo
      firebaseRef
        .child("photos")
        .child(photoObject.id)
        .set(photoObject)
        .then(
          () => {
            pushNotifications.photoUploadedPushNotification();

            dispatch({
              type: actionTypes.ADD_PHOTO_SUCCESS,
              isUploaded: true,
              isUploading: false
            });

            dispatch(photosActions.fetchPhotos());
          },
          err => {
            dispatch({
              type: actionTypes.ADD_PHOTO_FAILURE,
              isUploaded: false,
              isUploading: false,
              error: err
            });
          }
        );
    })
    .catch(err => {
      dispatch({
        type: actionTypes.ADD_PHOTO_FAILURE,
        isUploaded: false,
        isUploading: false,
        error: err
      });
    });
};

const uploadPhotoURI = uri => {
  const c = uri.split("/");
  const v = c[c.length - 1];

  const formData = new FormData();
  formData.append("type", "file");
  formData.append("image", {
    uri,
    name: v,
    type: "image/jpeg"
  });

  return fetch(imgurConfig.url, {
    method: "POST",
    headers: {
      Authorization: `Client-ID ${imgurConfig.client}`,
      Accept: "*/*",
      "Content-Type": "multipart/form-data"
    },
    body: formData
  })
    .then(res => res.json())
    .then(res2 => res2.data.link);
};

export const setPhotoURI = uri => dispatch => {
  dispatch({
    type: actionTypes.SET_PHOTO_URI,
    uri
  });

  dispatch(setPhotoLocation());
};

export const setPhotoSource = source => dispatch => {
  dispatch({
    type: actionTypes.SET_PHOTO_SOURCE,
    source
  });
};

export const setPhotoCaption = caption => dispatch => {
  dispatch({
    type: actionTypes.SET_PHOTO_CAPTION,
    caption
  });
};

export const setPhotoLocation = () => dispatch => {
  const options = {
    enableHighAccuracy: true
  };

  Permissions.getAsync(Permissions.LOCATION).then(response => {
    const { status } = response;

    if (status !== "granted") {
      Alert.alert(
        "Please allow Location permission from your phone configuration"
      );

      dispatch({
        type: actionTypes.SET_PHOTO_LOCATION,
        locationName: "Unknown",
        latitude: null,
        longitude: null
      });
    } else {
      Permissions.askAsync(Permissions.LOCATION).then(res => {
        const { status } = res;

        if (status === "granted") {
          Exponent.Location.getCurrentPositionAsync(options).then(
            response => {
              const infoUrl = googleConfig.getInfoUrl(
                response.coords.latitude,
                response.coords.longitude
              );

              return fetch(infoUrl)
                .then(resp => resp.json())
                .then(json => {
                  const locationInfo = json.results[0];
                  let locality;
                  let country;

                  map(locationInfo.address_components, component => {
                    if (includes(component.types, "locality")) {
                      locality = component.long_name;
                    } else if (includes(component.types, "country")) {
                      country = component.long_name;
                    }
                  });

                  dispatch({
                    type: actionTypes.SET_PHOTO_LOCATION,
                    locationName: `${locality}, ${country}`,
                    latitude: locationInfo.geometry.location.lat,
                    longitude: locationInfo.geometry.location.lng
                  });
                });
            },
            () => {
              dispatch({
                type: actionTypes.SET_PHOTO_LOCATION,
                locationName: "Unknown",
                latitude: null,
                longitude: null
              });
            }
          );
        } else {
          dispatch({
            type: actionTypes.SET_PHOTO_LOCATION,
            locationName: "Unknown",
            latitude: null,
            longitude: null
          });
        }
      });
    }
  });
};
