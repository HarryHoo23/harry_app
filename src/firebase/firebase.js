import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/database';
import 'firebase/firestore';

var firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: "https://season-app-edc93.firebaseio.com",
    projectId: "season-app-edc93",
    storageBucket: "season-app-edc93.appspot.com",
    messagingSenderId: "228382689444",
    appId: "1:228382689444:web:05b989604b6fa1ff86fe31",
    measurementId: "G-3T3TKNNZMH"
  };

const app = firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();
const database = firebase.database();
const projectFireStore = firebase.firestore();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export const auth = firebase.auth();
export {
  app, projectFireStore, storage, timestamp, database
};
