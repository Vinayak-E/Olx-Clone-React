import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";  
import { getStorage } from "firebase/storage";       

const firebaseConfig = {
    apiKey: "AIzaSyBPVN1nchOXhUTJ-WFggTmU3tQ7-eBmgAg",
    authDomain: "olx-clone-react-45570.firebaseapp.com",
    projectId: "olx-clone-react-45570",
    storageBucket: "olx-clone-react-45570.appspot.com",
    messagingSenderId: "1018991413094",
    appId: "1:1018991413094:web:50b35d2a59c808e064aaa7"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);   
export const storage = getStorage(app); 
