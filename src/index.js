import dotenv from "dotenv";
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import "@fortawesome/fontawesome-free/css/all.min.css";
//import 'bootstrap-css-only/css/bootstrap.min.css';
//import 'mdbreact/dist/css/mdb.css';

import { Provider } from "react-redux";
import {
  ReactReduxFirebaseProvider,
  isLoaded,
  isEmpty,
} from "react-redux-firebase";
import firebase from "./config/firebaseConfig.js";
import store from "./redux/index.js";
import createGuestUser from "./services/createGuestUser.js";

dotenv.config();

const rrfConfig = {
  //userProfile: "users",
  // useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
};

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
};

const subscription = store.subscribe(appStart);

function appStart() {
  if (isLoaded(store.getState().firebase.auth)) {
    if (isEmpty(store.getState().firebase.auth)) {
      //Has Loaded & Is Empty - No User
      //We create a Guest User Now
      createGuestUser();
    } else {
      //Has Loaded & Not Empty - Has User
      //We Close the Listener
      subscription();
    }
  }
}

ReactDOM.render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <App />
    </ReactReduxFirebaseProvider>
  </Provider>,
  document.getElementById("root")
);

