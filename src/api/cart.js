import axios from "axios";
import { isLoaded, isEmpty } from "react-redux-firebase";
import * as API_CONSTANTS from "./index.js";
import { getCurrentUserIdToken } from "../services/authentication.js";

import store from "../redux/index.js";

import { createGuestUser } from "../services/authentication.js";

//Build Two
//Used to add products to a user's cart when button is clicked  
export const addToCart = async (productId, variant) => {
  //Checks whether data from the redux store has been loaded
  if (isLoaded(store.getState().firebase.auth)) {
    // Checks whether the item loaded is empty
    if (isEmpty(store.getState().firebase.auth)) {
      //Create Guest Account
      // await createGuestUser();
    }
    var getTokenResult = await getCurrentUserIdToken();
    // checks whether the current user's token was retrieved successfully 
    if (getTokenResult.ok === true) {
      const config = {
        // sets the necessary header information for authentication based on the user's token 
        headers: {
          credentialclaims: "customer",
          Authorization: "Bearer " + getTokenResult.data,
        },
      };

      //returns the product object being sent to the user's cart 
      return axios
        
        .post(
          API_CONSTANTS.CART_ROUTE + "/cart_item",
          { product_id: productId, variant: variant },
          config
        ) //sends the data of the selected product to the current user's cart using the backend cart api
        .then((res) => {
          return res.data; // returns the corresponding data for the product that has been added to the cart 
        })
        .catch((error) => {
          return { ok: false, error: error }; // returns general error when adding products to the cart is unsuccessful
        });
    } else {

      return getTokenResult; //returns a general error when the system has failed to get the user's token 
    }
    
  } else {
    return { ok: false, message: "Add to Cart Failed - Try again" }; //Returns a message when data has not been loaded from the redux store.
  }
};

export const getCart = async () => {
  //Checks whether data from the redux store has been loaded
  if (isLoaded(store.getState().firebase.auth)) {

    // Checks whether the item loaded is not empty
    if (!isEmpty(store.getState().firebase.auth)) {
      var getTokenResult = await getCurrentUserIdToken();

      // checks whether the current user's token was retrieved successfully 
      if (getTokenResult.ok === true) {
        
        const config = {
          // sets the necessary header information for authentication based on the user's token 
          headers: {
            credentialclaims: "customer",
            Authorization: "Bearer " + getTokenResult.data,
          },
        };

        //returns the cart object from the user 
        return axios
          .get(API_CONSTANTS.CART_ROUTE, config)
          .then((res) => {
            // Request Succesfull
            //Handle Different HTTP Status Codes and Responses
            return res.data;
          })// returns the corresponding data for a signed in user's cart
          .catch((error) => {
            // returns general error when trying to getting art is unsuccessful
            return { ok: false, error: error };
          });
      } else {
        //returns a general error when the system has failed to get the user's token 
        return getTokenResult;
      }
    } else {
      //returns a message if the current user is not signed into the platform
      return { ok: false, message: "No User Signed In" };
    }
   
  } else {
    //returns a message when data has not been loaded from the redux store.
    return { ok: false, message: "Getting Cart Failed - Try again" };
  }
};

//changes the quantity of a specific item in a user's cart based on an item's product id, option and a users input
export const updateCartItemQuantity = async (
  product_id,
  option,
  newQuantity
) => {
  //Checks whether data from the redux store has been loaded
  if (isLoaded(store.getState().firebase.auth)) {
    // Checks whether the item loaded is not empty
    if (!isEmpty(store.getState().firebase.auth)) {
      var getTokenResult = await getCurrentUserIdToken();

      // checks whether the current user's token was retrieved successfully 
      if (getTokenResult.ok === true) {
        const config = {
          // sets the necessary header information for authentication based on the user's token 
          headers: {
            credentialclaims: "customer",
            Authorization: "Bearer " + getTokenResult.data,
          },
        };
        return axios
          .patch(
            API_CONSTANTS.CART_ROUTE + "/cart_item",
            { product_id: product_id, option: option, newQuantity },
            config
          )//changes the quantity of the selected product in the current user's cart
          .then((res) => {
            // Request Succesfull
            //Handle Different HTTP Status Codes and Responses
            return res.data;
          }) //returns the value of the respective quantity change being made by the user 
          .catch((error) => {
            //returns a general error when the system has failed to change the quantity of a product in a user's cart
            return { ok: false, error: error };
          });
      } else {
        //returns a general error when the system has failed to get the user's token 
        return getTokenResult;
      }
    } else {
      //returns a message if the current user is not signed into the platform
      return { ok: false, message: "No User Signed In" };
    }
    
  } else {
    //returns a message when data has not been loaded from the redux store.
    return { ok: false, message: "Updating a Cart Item Failed - Try again" };
  }
};

//deletes an item from the user's cart based on its product id and selected option
export const deleteSingleCartItem = async (product_id, option) => {
  //Checks whether data from the redux store has been loaded
  if (isLoaded(store.getState().firebase.auth)) {
    // Checks whether the item loaded is not empty
    if (!isEmpty(store.getState().firebase.auth)) {
      var getTokenResult = await getCurrentUserIdToken();

      // checks whether the current user's token was retrieved successfully
      if (getTokenResult.ok === true) {
        const config = {
          headers: {
            //sets the necessary header information for authentication using the user's token
            credentialclaims: "customer",
            Authorization: "Bearer " + getTokenResult.data,
          },
          data: {
            //sets the product id and option values of the item being deleted
            product_id: product_id,
            option: option,
          },
        };
        return axios
          .delete(API_CONSTANTS.CART_ROUTE + "/cart_item", config)
          .then((res) => {
            // Request Succesfull
            //Handle Different HTTP Status Codes and Responses
            return res.data;
          })//returns the corresponding data of an item being deleted from a user's cart
          .catch((error) => {
            //Request Unsuccesfull
            return { ok: false, error: error };//returns a general error when the system is unsuccessful with the deletion process
          });
      } else {
        //returns a general error when the system has failed to get the user's token 
        return getTokenResult;
      }
    } else {
      //returns a message if the current user is not signed into the platform
      return { ok: false, message: "No User Signed In" };
    }
  } else {
    //returns a message when data has not been loaded from the redux store.
    return { ok: false, message: "Deleting a Cart Item Failed - Try again" };
  }
};
