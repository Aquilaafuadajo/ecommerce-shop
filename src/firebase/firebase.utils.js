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

export const createUserProfileDocument = async(userAuth, additionalData ) => {
  if(!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get()
  console.log(snapShot)

  if(!snapShot.exists) {
    // const {displayName, email} = userAuth;
    const {email} = userAuth;
    const createdAt = new Date()

    try {
      await userRef.set({
        // displayName,
        email,
        createdAt,
        ...additionalData
      })
    }catch(error) {
      console.log('error creating user', error.message) 
    }
  }
  return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider()
provider.setCustomParameters({params: 'select_account'});

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;