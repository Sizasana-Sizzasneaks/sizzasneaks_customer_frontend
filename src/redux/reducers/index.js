import { combineReducers } from "redux";

import { firebaseReducer } from "react-redux-firebase";
import { profileState } from "./profile.js";
import { cartState } from "./cart.js";
import { logInPopUpState } from "./logInPopUp.js";

const reducers = combineReducers({
  firebase: firebaseReducer,
  profile: profileState,
  cart: cartState,
  logInPopUpState: logInPopUpState,
});

export default reducers;
