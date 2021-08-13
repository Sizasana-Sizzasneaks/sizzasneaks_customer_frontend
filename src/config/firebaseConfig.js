import firebase from "firebase/app";
import "firebase/auth";

export const firebaseConfig = {
  apiKey: "AIzaSyDTN0jJ8EA_6LO_r6XVzx_wD4zW3a3Y2jA",
  authDomain: "sizasana-ecommerce-platform.firebaseapp.com",
  projectId: "sizasana-ecommerce-platform",
  storageBucket: "sizasana-ecommerce-platform.appspot.com",
  messagingSenderId: "547246626952",
  appId: "1:547246626952:web:8cce3136bd09299eaae73d",
};

firebase.initializeApp(firebaseConfig);

export default firebase;
