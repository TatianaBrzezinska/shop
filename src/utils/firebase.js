import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyD5lsuF5wvmS5CxkTIhY6ZxA02Bil-t6rk",
    authDomain: "shop-dfc08.firebaseapp.com",
    projectId: "shop-dfc08",
    storageBucket: "shop-dfc08.appspot.com",
    messagingSenderId: "672299589944",
    appId: "1:672299589944:web:8abe29064c907a28bee1cd"
  };

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: 'select_account',
});

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  console.log(userAuth);
};

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);