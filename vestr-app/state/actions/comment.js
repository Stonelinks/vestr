import update from "react-addons-update";
import moment from "moment";
import firebaseApp from "../../constants/Firebase";
import * as actionTypes from "../actionTypes";

const firebaseRef = firebaseApp.database().ref();

export const addComment = comment => (dispatch, getState) => {
  dispatch({
    type: actionTypes.ADD_COMMENT_REQUEST,
    isUploaded: false,
    isUploading: true
  });

  const comments = getState().comment.comments;
  const user = getState().auth.user;

  const photo = {
    id: comment.photoId,
    comments
  };

  const commentObject = comment;
  commentObject.id = `COMMENT:${moment().format()}`;
  commentObject.username = user.name;
  commentObject.profilePicture = user.profilePicture;
  commentObject.creationDate = moment().format();
  delete commentObject.comments;
  delete commentObject.isUploading;
  delete commentObject.isUploaded;
  delete commentObject.error;

  // photo.comments.push(commentObject); // Hey, don't change state!!!
  photo.comments = update(photo.comments, { $push: [commentObject] });

  // Update photo
  firebaseRef
    .child("photos")
    .child(photo.id)
    .child("comments")
    .set(photo.comments)
    .then(
      () => {
        dispatch({
          type: actionTypes.ADD_COMMENT_SUCCESS,
          isUploaded: true,
          isUploading: false,
          comment: commentObject
        });
      },
      err => {
        dispatch({
          type: actionTypes.ADD_COMMENT_FAILURE,
          isUploaded: false,
          isUploading: false,
          error: err
        });
      }
    );
};

export const setCommentText = comment => dispatch => {
  dispatch({
    type: actionTypes.SET_COMMENT_TEXT,
    comment
  });
};

export const setPhotoComments = (photoId, comments) => dispatch => {
  dispatch({
    type: actionTypes.SET_PHOTO_COMMENTS,
    photoId,
    comments
  });
};
