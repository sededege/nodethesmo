import { getApp, getApps, initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator} from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyB-xm6vR1lAW_afQip14wEpszXvHvNmshw",
  authDomain: "eccomerceapp-4c533.firebaseapp.com",
  databaseURL: "https://eccomerceapp-4c533.firebaseio.com",
  projectId: "eccomerceapp-4c533",
  storageBucket: "eccomerceapp-4c533.appspot.com",
  messagingSenderId: "882407440548",
  appId: "1:882407440548:web:74b4ff94fb2e34d9356631",
  measurementId: "G-4JPVRY2C3F"
};

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig)
const firestore = getFirestore(app)

const auth = getAuth(app)

const storage = getStorage(app)


export { app, firestore, storage, auth }; 

