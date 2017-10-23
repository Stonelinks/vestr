import {
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAILURE,
  SET_COMMENT_TEXT,
  SET_PHOTO_COMMENTS
} from "../actionTypes";
import { comment as commentInitialState } from "../initialState";

let newComments;

const commentReducer = (state = commentInitialState, action) => {
  switch (action.type) {
    case ADD_COMMENT_REQUEST:
      return {
        ...state,
        isUploaded: action.isUploaded,
        isUploading: action.isUploading
      };
    case ADD_COMMENT_SUCCESS:
      newComments = state.comments;
      newComments.push(action.comment);

      return {
        ...commentInitialState,
        isUploaded: true,
        isUploading: false,
        photoId: state.photoId,
        comments: newComments
      };
    case ADD_COMMENT_FAILURE:
      return {
        ...state,
        error: action.error,
        isUploaded: action.isUploaded,
        isUploading: action.isUploading
      };
    case SET_COMMENT_TEXT:
      return {
        ...state,
        text: action.comment
      };
    case SET_PHOTO_COMMENTS:
      return {
        ...state,
        photoId: action.photoId,
        comments: action.comments
      };
    default:
      return state;
  }
};

export default commentReducer;
