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
    const {email, displayName} = userAuth;
    const createdAt = new Date()

    try {
      await userRef.set({
        displayName,
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

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  const collectionRef = firestore.collection(collectionKey);
  
  const batch = firestore.batch();
  objectsToAdd.forEach(obj => {
    const newDocRef = collectionRef.doc()
    batch.set(newDocRef, obj);
  })

  return await batch.commit();
}

export const convertCollectionsSnapshotToMap = (collections) => {
  const transformedCollection = collections.docs.map(doc => {
    const {title, items} = doc.data();

    return {
      routeName: encodeURI(title.toLowerCase()), 
      id: doc.id,
      title,
      items
    }
  })
  console.log(transformedCollection)
  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {}); //this code here is to convert the transformedCollection array into an object as it is in our shop-data
}

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged(userAuth => {
      unsubscribe();
      resolve(userAuth);
    }, reject)
  })
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider()
googleProvider.setCustomParameters({params: 'select_account'});

export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;
