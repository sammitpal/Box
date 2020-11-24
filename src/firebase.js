import firebase from 'firebase';
const firebaseConfig = {
  apiKey: "AIzaSyB_Y_ma29NybJV7kcR3IXdCHsq46xAE_1Y",
  authDomain: "unlimited-stora.firebaseapp.com",
  databaseURL: "https://unlimited-stora.firebaseio.com",
  projectId: "unlimited-stora",
  storageBucket: "unlimited-stora.appspot.com",
  messagingSenderId: "429061011594",
  appId: "1:429061011594:web:6e91332833fd8112a71573",
  measurementId: "G-JLX7ZX4ZG2"
  };

const firebaseApp  = firebase.initializeApp(firebaseConfig);
const auth = firebaseApp.auth();
const storage = firebaseApp.storage();
const database = firebaseApp.firestore();
export {auth,storage,database};