import { map } from "lodash";
import firebaseApp from "../../constants/Firebase";
import * as actionTypes from "../actionTypes";

const firebaseRef = firebaseApp.database().ref();

export const fetchPhotos = () => dispatch => {
  dispatch({
    type: actionTypes.FETCH_PHOTOS_REQUEST,
    isFetching: true
  });

  firebaseRef.child("photos").once(
    "value",
    snapshot => {
      const photos = [];

      map(snapshot.val(), (val, uid) => {
        const photo = val;
        photo.uid = uid;

        if (!photo.likes) photo.likes = [];
        if (!photo.comments) photo.comments = [];

        photos.unshift(photo);
      });

      dispatch({
        type: actionTypes.FETCH_PHOTOS_SUCCESS,
        photos,
        isFetching: false
      });
    },
    err => {
      dispatch({
        type: actionTypes.FETCH_PHOTOS_FAILURE,
        isFetching: false,
        error: err
      });
    }
  );
};

export const likePhoto = photoID => dispatch => {
  dispatch({
    type: actionTypes.LIKE_PHOTO,
    photoID
  });
};

export const unlikePhoto = photoID => dispatch => {
  dispatch({
    type: actionTypes.UNLIKE_PHOTO,
    photoID
  });
};
