import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyBNnKUz60uZzgZ149K1TumfWkbdaSGymIY",
  authDomain: "crown-clothing-b919b.firebaseapp.com",
  databaseURL: "https://crown-clothing-b919b.firebaseio.com",
  projectId: "crown-clothing-b919b",
  storageBucket: "crown-clothing-b919b.appspot.com",
  messagingSenderId: "563738870422",
  appId: "1:563738870422:web:1446fbc4ddb96c8404f8b7",
  measurementId: "G-QBY6LQV53H"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider()
provider.setCustomParameters({params: 'select_account'});

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;