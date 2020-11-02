// For uploading images functions
import firebase from "firebase/app";
import "firebase/storage";

/*Reference from https://dev.to/itnext/how-to-do-image-upload-with-firebase-in-react-cpj  

https://stackoverflow.com/questions/61215555/how-to-upload-image-to-firebase-storage-and-upload-url-to-firestore-simultaneous 

https://github.com/ClintPy/Image-Uploader-React-Firebase/tree/master/src
*/

//Firebase account configuration to upload without login
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