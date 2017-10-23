import {
  FETCH_PHOTOS_REQUEST,
  FETCH_PHOTOS_SUCCESS,
  FETCH_PHOTOS_FAILURE,
  LIKE_PHOTO,
  UNLIKE_PHOTO
} from "../actionTypes";
import { photos as photosInitialState } from "../initialState";

let newPhotosList;

const photosReducer = (state = photosInitialState, action) => {
  switch (action.type) {
    case FETCH_PHOTOS_REQUEST:
      return {
        ...state,
        isFetching: action.isFetching
      };
    case FETCH_PHOTOS_SUCCESS:
      return {
        ...state,
        all: action.photos,
        isFetching: action.isFetching
      };
    case FETCH_PHOTOS_FAILURE:
      return {
        ...state,
        error: action.error,
        isFetching: action.isFetching
      };
    case LIKE_PHOTO:
      newPhotosList = state.all;

      newPhotosList.map(photo => {
        if (photo.id === action.photoID) {
          // FIXME: shouln't reassing param
          photo.isLiked = true;
        }

        return photo;
      });

      return {
        ...state,
        all: newPhotosList
      };
    case UNLIKE_PHOTO:
      newPhotosList = state.all;

      newPhotosList.map(photo => {
        if (photo.id === action.photoID) {
          // FIXME: shouln't reassing param
          photo.isLiked = false;
        }

        return photo;
      });

      return {
        ...state,
        all: newPhotosList
      };
    default:
      return state;
  }
};

export default photosReducer;
