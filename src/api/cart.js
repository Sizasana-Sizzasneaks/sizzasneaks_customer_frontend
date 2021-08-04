import axios from "axios";
import { isLoaded, isEmpty } from "react-redux-firebase";
import * as API_CONSTANTS from "./index.js";

import store from "../redux/index.js";

import { createGuestUser } from "../services/authentication.js";

//Build Two
//Add to Cart function
export const addToCart = async (productId) => {
  if (isLoaded(store.getState().firebase.auth)) {
    if (isEmpty(store.getState().firebase.auth)) {
      //Create Guest Account
     // await createGuestUser();
    }

    // Add to Cart Logic
  } else {
    return { ok: false, message: "Add to Cart Failed - Try again" };
  }
};
