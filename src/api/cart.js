import axios from "axios";
import { isLoaded, isEmpty } from "react-redux-firebase";
import * as API_CONSTANTS from "./index.js";
import { getCurrentUserIdToken } from "../services/authentication.js";
import store from "../redux/index.js";

import { createGuestUser } from "../services/authentication.js";

//Build Two
//Add to Cart function
export const addToCart = async (productId,variant) => {
  if (isLoaded(store.getState().firebase.auth)) {
    if (isEmpty(store.getState().firebase.auth)) {
      //Create Guest Account
     // await createGuestUser();
    }
    var getTokenResult = await getCurrentUserIdToken();

    if (getTokenResult.ok === true) {
      console.log(getTokenResult.data);
      const config = {
        headers: {credentialclaims: "customer",
        Authorization: "Bearer " + getTokenResult.data
        },
      };

      return axios
        .put(API_CONSTANTS.CART_ROUTE, { product_id:productId, variant: variant  }, config)
        .then((res) => {
          return { ok: true };
        })
        .catch((error) => {
          return { ok: false, error: error };
        });
    } else {
      //Failed to get Token
      return getTokenResult;
    }
    // Add to Cart Logic
  } else {
    return { ok: false, message: "Add to Cart Failed - Try again" };
  }
};


