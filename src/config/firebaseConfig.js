import firebase from "firebase/app";
import "firebase/auth";

import { firebaseCredentials } from "../secrets";

const firebaseConfig = firebaseCredentials;

firebase.initializeApp(firebaseConfig);

export default firebase;
