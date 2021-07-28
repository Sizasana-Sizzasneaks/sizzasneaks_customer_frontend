import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import Reducers from "./reducers/index.js";
import { composeWithDevTools } from "redux-devtools-extension";
import {getFirebase, reactReduxFirebase} from "react-redux-firebase";
import firebase from "../config/firebaseConfig.js"


const store = createStore(
  Reducers,
   +window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  composeWithDevTools(
    applyMiddleware(thunk.withExtraArgument({getFirebase}))
  )
);

export default store;
