import {
  ADD_PHOTO_REQUEST,
  ADD_PHOTO_SUCCESS,
  ADD_PHOTO_FAILURE,
  SET_PHOTO_URI,
  SET_PHOTO_SOURCE,
  SET_PHOTO_CAPTION,
  SET_PHOTO_LOCATION
} from "../actionTypes";
import { photo as photoInitialState } from "../initialState";

const photoReducer = (state = photoInitialState, action) => {
  switch (action.type) {
    case ADD_PHOTO_REQUEST:
      return {
        ...state,
        isUploaded: action.isUploaded,
        isUploading: action.isUploading
      };
    case ADD_PHOTO_SUCCESS:
      return {
        ...photoInitialState,
        isUploaded: action.isUploaded,
        isUploading: action.isUploading
      };
    case ADD_PHOTO_FAILURE:
      return {
        ...state,
        error: action.error,
        isUploaded: action.isUploaded,
        isUploading: action.isUploading
      };
    case SET_PHOTO_URI:
      return {
        ...state,
        uri: action.uri
      };
    case SET_PHOTO_SOURCE:
      return {
        ...state,
        source: action.source
      };
    case SET_PHOTO_CAPTION:
      return {
        ...state,
        caption: action.caption
      };
    case SET_PHOTO_LOCATION:
      return {
        ...state,
        locationName: action.locationName,
        latitude: action.latitude,
        longitude: action.longitude
      };
    default:
      return state;
  }
};

export default photoReducer;
