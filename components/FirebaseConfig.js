

import * as firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyAnP2KTy7qPP3UIPs0kt4dunzL1PhGKsmg",
    authDomain: "restaurantmanager-1264b.firebaseapp.com",
    databaseURL: "https://restaurantmanager-1264b.firebaseio.com",
    projectId: "restaurantmanager-1264b",
    storageBucket: "restaurantmanager-1264b.appspot.com",
    messagingSenderId: "509484123254",
    appId: "1:509484123254:web:6fcdea809ea9ab3c730b57",
    measurementId: "G-ZK83LH5KD6"
  };
  // Initialize Firebase
  export const firebaseApp = firebase.initializeApp(firebaseConfig);
