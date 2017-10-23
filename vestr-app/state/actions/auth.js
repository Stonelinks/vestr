import { AsyncStorage, Alert } from "react-native";
import Exponent from "expo";
import pushNotifications from "../../api/pushNotifications";
import googleConfig from "../../constants/Google";
import facebookConfig from "../../constants/Facebook";
import * as actionTypes from "../actionTypes";

export const isLoggedIn = () => dispatch => {
  dispatch({
    type: actionTypes.CHECK_LOGIN_REQUEST,
    isLoading: true
  });

  AsyncStorage.getItem("session").then(response => {
    const session = JSON.parse(response);

    if (session) {
      pushNotifications.registerForPushNotifications();

      dispatch({
        type: actionTypes.CHECK_LOGIN_SUCCESS,
        loggedIn: true,
        isLoading: false,
        user: session.user,
        facebookToken: session.facebookToken
      });
    } else {
      dispatch({
        type: actionTypes.CHECK_LOGIN_FAILURE,
        loggedIn: false,
        isLoading: false
      });
    }
  });
};

export const loginGoogle = () => dispatch => {
  const options = {
    androidClientId: googleConfig.androidClientId,
    iosClientId: googleConfig.iosClientId,
    scopes: ["profile", "email"],
    behavior: "web"
  };

  Exponent.Google.logInAsync(options).then(response => {
    const { type, accessToken, user } = response;

    if (type === "success") {
      dispatch({
        type: actionTypes.LOGIN_GOOGLE_REQUEST,
        isLoading: true
      });

      const userProfile = {
        name: user.name,
        email: user.email,
        profilePicture: user.photoUrl
      };

      const session = {
        googleToken: accessToken,
        user: userProfile
      };

      // Save session
      AsyncStorage.setItem("session", JSON.stringify(session)).then(
        () => {
          pushNotifications.registerForPushNotifications();

          dispatch({
            type: actionTypes.LOGIN_GOOGLE_SUCCESS,
            loggedIn: true,
            isLoading: false,
            user: userProfile,
            googleToken: accessToken
          });
        },
        err => {
          dispatch({
            type: actionTypes.LOGIN_GOOGLE_FAILURE,
            error: err,
            loggedIn: false,
            isLoading: false
          });

          Alert.alert("Error!", err, [{ text: "OK", onPress: () => {} }]);
        }
      );
    }
  });
};

export const loginFacebook = () => dispatch => {
  const options = {
    behavior: "web",
    permissions: ["public_profile", "email"]
  };

  Exponent.Facebook
    .logInWithReadPermissionsAsync(facebookConfig.appID, options)
    .then(response => {
      const { type, token, expires } = response;

      if (type === "success") {
        dispatch({
          type: actionTypes.LOGIN_FACEBOOK_REQUEST,
          isLoading: true
        });

        fetch(
          `https://graph.facebook.com/me?fields=name,email,picture&access_token=${token}`
        )
          .then(data => data.json())
          .then(
            dataJson => {
              const user = {
                name: dataJson.name,
                email: dataJson.email,
                profilePicture: dataJson.picture.data.url
              };

              const session = {
                facebookToken: token,
                user
              };

              // Save session
              AsyncStorage.setItem("session", JSON.stringify(session)).then(
                () => {
                  pushNotifications.registerForPushNotifications();

                  dispatch({
                    type: actionTypes.LOGIN_FACEBOOK_SUCCESS,
                    loggedIn: true,
                    isLoading: false,
                    user,
                    facebookToken: token
                  });
                },
                err => {
                  dispatch({
                    type: actionTypes.LOGIN_FACEBOOK_FAILURE,
                    error: err,
                    loggedIn: false,
                    isLoading: false
                  });

                  Alert.alert("Error!", err, [
                    { text: "OK", onPress: () => {} }
                  ]);
                }
              );
            },
            err => {
              dispatch({
                type: actionTypes.LOGIN_FACEBOOK_FAILURE,
                error: err,
                loggedIn: false,
                isLoading: false
              });

              Alert.alert("Error!", err, [{ text: "OK", onPress: () => {} }]);
            }
          );
      }
    });
};

export const logout = () => dispatch => {
  const doLogout = () => {
    dispatch({
      type: actionTypes.LOGOUT_REQUEST,
      isLoading: true
    });

    AsyncStorage.removeItem("session").then(
      () => {
        Alert.alert("See you next time!", null);

        dispatch({
          type: actionTypes.LOGOUT_SUCCESS
        });
      },
      err => {
        dispatch({
          type: actionTypes.LOGOUT_FAILURE,
          error: err,
          isLoading: false
        });
      }
    );
  };

  Alert.alert("Log out on Rmotrgram?", null, [
    { text: "Cancel", onPress: () => {} },
    { text: "Log out", onPress: doLogout }
  ]);
};
