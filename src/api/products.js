import axios from "axios";
import * as API_CONSTANTS from "./index.js";

//used to display all the products from the database based on a specified query
export const getProducts = async (queryObject) => {
  const config = {
    //sets the necessary header information and route parameter with a query defined by the user
    headers: {},
    params: queryObject,
  };

  return axios
    .get(API_CONSTANTS.PRODUCTS_ROUTE, config)
    .then((res) => {
      return res.data;
    }) //returns the corresponding product data based on the user specified query
    .catch((error) => {
      //checks whether the user's internet connection is fine
      if (error.message === "Network Error") {
        return {
          ok: false,
          message: "Network Error - Please Check your Internet Connection",
        }; //returns a message if there is a problem with the user's internet connection
      }
      //returns a message if the system failed to get the products from the database
      return { ok: false, message: "Error when getting products - Please try again" };
    });
};

//used to display the details of a single product based on its id
export const getProduct = async (id) => {
  const config = {
    //sets the necessary header information based on a products id
    headers: {},
  };
  return axios
    .get(API_CONSTANTS.PRODUCTS_ROUTE + "/" + id, config)
    .then((res) => {
      return res.data;
    }) //returns the details of the product selected based on its id
    .catch((error) => {
     

      //checks whether the user's internet connection is fine
      if (error.message === "Network Error") {
        return {
          ok: false,
          message: "Network Error - Please Check your Internet Connection",
        }; //returns a message if there is a problem with the user's internet connection
      }
      //returns a message if the system failed to get the product's details from the database
      return { ok: false, message: "Error when getting product - Please try again" };
    });
};

export const getProductBrands = async () => {
  const config = {
    //sets the necessary header information based on a products id
    headers: {},
  };
  return axios
    .get(API_CONSTANTS.PRODUCTS_ROUTE + "/brands/list", config)
    .then((res) => {
      return res.data;
    }) //returns the details of the product selected based on its id
    .catch((error) => {

      //checks whether the user's internet connection is fine
      if (error.message === "Network Error") {
        return {
          ok: false,
          message: "Network Error - Please Check your Internet Connection",
        }; //returns a message if there is a problem with the user's internet connection
      }
      //returns a message if the system failed to get the product's details from the database
      return { ok: false, message: "Error getting product brands - Please try again" };
    });
};
