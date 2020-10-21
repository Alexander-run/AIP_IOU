import firebase from "firebase/app";
import "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCZMpfOjPbVrI6SASYy7EtuS8CuzBEVl4E",
    authDomain: "aip-v1.firebaseapp.com",
    databaseURL: "https://aip-v1.firebaseio.com",
    projectId: "aip-v1",
    storageBucket: "aip-v1.appspot.com",
    messagingSenderId: "58432139796",
    appId: "1:58432139796:web:766eda07c8a2526dd22d01",
    measurementId: "G-0WVQN796N7"
  };

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };