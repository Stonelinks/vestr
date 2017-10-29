import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAPWOrH9hk_z72FrIegy26JYL-1XdVKSxA",
  authDomain: "vestr-1509235102045.firebaseapp.com",
  databaseURL: "https://vestr-1509235102045.firebaseio.com",
  storageBucket: "vestr-1509235102045.appspot.com",
  messagingSenderId: "834813443811"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

export default firebaseApp;
