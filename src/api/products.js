import axios from "axios";
import * as API_CONSTANTS from "./index.js";

export const getProducts = async (queryObject) => {

    const config = {
      headers: {},
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
 
};

export const getProduct = async (id) => {

    const config = {
      headers: {},
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
 
};
