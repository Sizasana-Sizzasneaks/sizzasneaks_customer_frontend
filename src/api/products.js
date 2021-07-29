import axios from "axios";
import { getCurrentUserIdToken } from "../services/authentication.js";
import * as API_CONSTANTS from "./index.js";

export const getProducts = async (queryObject) => {
  var getTokenResult = await getCurrentUserIdToken();

  if (getTokenResult.ok === true) {
    const config = {
      headers: { Authorization: "Bearer " + getTokenResult.data },
      params: queryObject,
    };

    return axios
      .get(API_CONSTANTS.PRODUCTS_ROUTE, config)
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        console.log(error.message);

        if (error.message === "Network Error") {
          return {
            ok: false,
            message: "Network Error - Please Check your Internet Connection",
          };
        }
        return { ok: false, message: "Error getting products" };
      });
  } else {
    return getTokenResult;
  }
};

export const getProduct = async (id) => {
  var getTokenResult = await getCurrentUserIdToken();

  if (getTokenResult.ok === true) {
    const config = {
      headers: { Authorization: "Bearer " + getTokenResult.data },
    };
    return axios
      .get(API_CONSTANTS.PRODUCTS_ROUTE + "/" + id, config)
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        console.log(error.message);

        if (error.message === "Network Error") {
          return {
            ok: false,
            message: "Network Error - Please Check your Internet Connection",
          };
        }
        return { ok: false, message: "Error getting products" };
      });
  } else {
    return getTokenResult;
  }
};
