import {
  LOGIN_FACEBOOK_REQUEST,
  LOGIN_FACEBOOK_SUCCESS,
  LOGIN_FACEBOOK_FAILURE,
  LOGIN_GOOGLE_REQUEST,
  LOGIN_GOOGLE_SUCCESS,
  LOGIN_GOOGLE_FAILURE,
  CHECK_LOGIN_REQUEST,
  CHECK_LOGIN_SUCCESS,
  CHECK_LOGIN_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE
} from "../actionTypes";
import { auth as authInitialState } from "../initialState";

const authReducer = (state = authInitialState, action) => {
  switch (action.type) {
    case CHECK_LOGIN_REQUEST:
      return {
        ...state,
        isLoading: action.isLoading
      };
    case CHECK_LOGIN_SUCCESS:
      return {
        ...state,
        loggedIn: action.loggedIn,
        isLoading: action.isLoading,
        user: action.user,
        facebookToken: action.facebookToken
      };
    case CHECK_LOGIN_FAILURE:
      return {
        ...state,
        loggedIn: action.loggedIn,
        isLoading: action.isLoading
      };
    case LOGIN_GOOGLE_REQUEST:
      return {
        ...state,
        isLoading: action.isLoading
      };
    case LOGIN_GOOGLE_SUCCESS:
      return {
        ...state,
        loggedIn: action.loggedIn,
        isLoading: action.isLoading,
        user: action.user,
        facebookToken: action.facebookToken
      };
    case LOGIN_GOOGLE_FAILURE:
      return {
        ...state,
        error: action.error,
        loggedIn: action.loggedIn,
        isLoading: action.isLoading
      };
    case LOGIN_FACEBOOK_REQUEST:
      return {
        ...state,
        isLoading: action.isLoading
      };
    case LOGIN_FACEBOOK_SUCCESS:
      return {
        ...state,
        loggedIn: action.loggedIn,
        isLoading: action.isLoading,
        user: action.user,
        facebookToken: action.facebookToken
      };
    case LOGIN_FACEBOOK_FAILURE:
      return {
        ...state,
        error: action.error,
        loggedIn: action.loggedIn,
        isLoading: action.isLoading
      };
    case LOGOUT_REQUEST:
      return {
        ...state,
        isLoading: action.isLoading
      };
    case LOGOUT_SUCCESS:
      return {
        ...authInitialState
      };
    case LOGOUT_FAILURE:
      return {
        ...state,
        error: action.error,
        isLoading: action.isLoading
      };
    default:
      return state;
  }
};

export default authReducer;
