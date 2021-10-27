import axios from "axios";
import * as API_CONSTANTS from "./index.js";

import { getCurrentUserIdToken } from "../services/authentication.js";

//used to create a review for a product
export const sendAReview = async (review) => {
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
      .post(
        API_CONSTANTS.REVIEWS_ROUTE + "/" + review.product_id,
        review,
        config
      )//sends the data of the review of a product based on its id in addition to with the user's details to the review collection in the database
      .then((res) => {
        //Request Succesfull
        //Handle Different HTTP Status Codes and Responses

        //checks whether the post request was successful
        if (res.status === 200) {
          console.log(res.data);
          return res.data; //returns the data of the review that has just been created
        } else {
          return res.data;//returns a general error when adding a review to the product is unsuccessful 
        }
      })
      .catch((error) => {
        //returns a general error when the initial post request is unsuccessful 
        return { ok: false, error: error };
      });
  } else {
    //returns a general error when the system has failed to get the user's token 
    return getTokenResult;
  }
};

//used to display all the reviews made for a specific product
export const getReviewsByProductId = async (id) => {
  const config = {
    //sets the necessary header information based on a products id
    headers: {},
  };

  return axios
    .get(API_CONSTANTS.REVIEWS_ROUTE + "/" + id, config) //gets the data of all the reviews made for a product based on its id 
    .then((res) => {
      //Request Succesfull
      //Handle Different HTTP Status Codes and Responses

      //checks whether the post request was successful
      if (res.status === 200) {
        console.log(res.data);
        return res.data;//returns the data of the review that has just been created
      } else {
        return res.data;//returns a general error when adding a review to the product is unsuccessful
      }
    })
    .catch((error) => {
      //returns a general error when the initial get request is unsuccessful 
      return { ok: false, error: error };
    });
};

export const deleteReviewByReviewId = async (id, productId) => {
  var getTokenResult = await getCurrentUserIdToken();

  // checks whether the current user's token was retrieved successfully 
  if (getTokenResult.ok === true) {
    const config = {
      // sets the necessary header information for authentication based on the user's token
      headers: {
        credentialclaims: "customer",
        Authorization: "Bearer " + getTokenResult.data,
      },
      params: {
        productId: productId,
      },
    };
    return axios
      .delete(API_CONSTANTS.REVIEWS_ROUTE + "/" + id, config)//removes a review from the reviews collection based on an id
      .then((res) => {
        //Request Succesfull
        //Handle Different HTTP Status Codes and Responses

        //checks whether the post request was successful
        if (res.status === 200) {
          console.log(res.data);
          return res.data;//returns the data of the review that has just been deleted
        } else {
          return res.data;//returns a general error when adding a review to the product is unsuccessful
        }
      })
      .catch((error) => {
        //returns a general error when the initial delete request is unsuccessful
        return { ok: false, error: error };
      });
  } else {
    //returns a general error when the system has failed to get the user's token 
    return getTokenResult;
  }
};
