
import { initializeApp } from 'firebase/app';
import {getAuth, GoogleAuthProvider} from 'firebase/auth'

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "chatzilla-a9980.firebaseapp.com",
  projectId: "chatzilla-a9980",
  storageBucket: "chatzilla-a9980.appspot.com",
  messagingSenderId: "766781814161",
  appId: "1:766781814161:web:af171ddb5de30a19e5d630",
  measurementId: "G-00BZHTG6ED"
};

const app = initializeApp(firebaseConfig);
export const auth=getAuth();
export const provider=new GoogleAuthProvider();

export default app;