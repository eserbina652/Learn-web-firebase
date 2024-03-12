import {initializeApp} from "firebase/app"
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'

const firebase = {
    apiKey: "AIzaSyAirFw0F6Ngy82Jr2aH03zFSdLnJwPl5tc",
    authDomain: "learning-firebase-ea376.firebaseapp.com",
    projectId: "learning-firebase-ea376",
    storageBucket: "learning-firebase-ea376.appspot.com",
    messagingSenderId: "397130524257",
    appId: "1:397130524257:web:b1ad9684c0cfb5eb86ec20",
    measurementId: "G-HCF9ZLBW6Z"
};

const app = initializeApp(firebase);
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()
export const db = getFirestore(app)
export const storage = getStorage(app)
