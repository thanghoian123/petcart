import firebase from "firebase/app";
import "firebase/storage"

const firebaseConfig = {
    apiKey: "AIzaSyBrDjiDA--i1Ib1kI9iojWF3TKpy5y40hM",
    authDomain: "image-file-upload.firebaseapp.com",
    databaseURL: "https://image-file-upload.firebaseio.com",
    projectId: "image-file-upload",
    storageBucket: "image-file-upload.appspot.com",
    messagingSenderId: "830876755991",
    appId: "1:830876755991:web:8619808b7b45bee3219452",
    measurementId: "G-ZTXZQTETLH"
  };

  firebase.initializeApp(firebaseConfig);

  const storage = firebase.storage();
  export {storage,firebase as default};