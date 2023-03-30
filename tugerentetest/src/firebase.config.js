import { initializeApp } from 'firebase/app'
import { getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBuptCV3cxOVi8hcgL-1xrGmYqy8_h1Fh4",
  authDomain: "tugerente-4b7a6.firebaseapp.com",
  projectId: "tugerente-4b7a6",
  storageBucket: "tugerente-4b7a6.appspot.com",
  messagingSenderId: "819064997978",
  appId: "1:819064997978:web:5c4d11d0cb8c9cde8af063",
  measurementId: "G-9GF77J70VZ"
};

const app = initializeApp(firebaseConfig)
const firestore = getFirestore(app)

export { app, firestore}; 

