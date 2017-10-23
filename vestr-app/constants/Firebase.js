import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCfsZvCrxVnbtNO_iyGmLJTwKn-M6UozqQ",
  authDomain: "rmotrgram.firebaseapp.com",
  databaseURL: "https://rmotrgram.firebaseio.com",
  storageBucket: "rmotrgram.appspot.com",
  messagingSenderId: "871135189855"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

export default firebaseApp;
