import firebase from 'firebase/app';
import 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyDmGPtMOC7gEghInWCNkokJCZ0BzUeqkH0",
  authDomain: "cs394-a4e37.firebaseapp.com",
  databaseURL: "https://cs394-a4e37.firebaseio.com",
  projectId: "cs394-a4e37",
  storageBucket: "cs394-a4e37.appspot.com",
  messagingSenderId: "796618119823",
  appId: "1:796618119823:web:d44881c7128dd8f762aefa",
  measurementId: "G-V6QT0DFX5R"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database().ref();

export default db;