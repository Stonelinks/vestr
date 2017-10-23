import { combineReducers, createStore, applyMiddleware, compose } from "redux";
import {
  createNavigationEnabledStore,
  NavigationReducer
} from "@expo/ex-navigation";

import thunk from "redux-thunk";
import devToolsEnhancer from "remote-redux-devtools";
import photosReducer from "./reducers/photos";
import photoReducer from "./reducers/photo";
import commentReducer from "./reducers/comment";
import authReducer from "./reducers/auth";

const createStoreWithNavigation = createNavigationEnabledStore({
  createStore,
  navigationStateKey: "navigation"
});

const rootReducer = combineReducers({
  // navigation: NavigationReducer,
  photos: photosReducer,
  photo: photoReducer,
  comment: commentReducer,
  auth: authReducer
});

/* eslint-disable no-underscore-dangle */
// const store = createStoreWithNavigation(
const store = createStore(
  rootReducer,
  compose(applyMiddleware(thunk), devToolsEnhancer())
);
/* eslint-enable */

export default store;
