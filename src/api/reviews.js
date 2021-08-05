import axios from "axios";
import * as API_CONSTANTS from "./index.js";

import { getCurrentUserIdToken } from "../services/authentication.js";

export const sendAReview = async (review) => {
  var getTokenResult = await getCurrentUserIdToken();

  if (getTokenResult.ok === true) {
    const config = {
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
      )
      .then((res) => {
        //Request Succesfull
        //Handle Different HTTP Status Codes and Responses
        if (res.status === 200) {
          console.log(res.data);
          return res.data;
        } else {
          return res.data;
        }
      })
      .catch((error) => {
        //Request Unsuccesfull
        return { ok: false, error: error };
      });
  } else {
    //Failed to get Token
    return getTokenResult;
  }
};

export const getReviewsByProductId = async (id) => {
  const config = {
    headers: {},
  };

  return axios
    .get(API_CONSTANTS.REVIEWS_ROUTE + "/" + id, config)
    .then((res) => {
      //Request Succesfull
      //Handle Different HTTP Status Codes and Responses
      if (res.status === 200) {
        console.log(res.data);
        return res.data;
      } else {
        return res.data;
      }
    })
    .catch((error) => {
      //Request Unsuccesfull
      return { ok: false, error: error };
    });
};

export const deleteReviewByReviewId = async (id) => {
  var getTokenResult = await getCurrentUserIdToken();

  if (getTokenResult.ok === true) {
    const config = {
      headers: {
        credentialclaims: "customer",
        Authorization: "Bearer " + getTokenResult.data,
      },
    };
    return axios
      .delete(API_CONSTANTS.REVIEWS_ROUTE + "/" + id, config)
      .then((res) => {
        //Request Succesfull
        //Handle Different HTTP Status Codes and Responses
        if (res.status === 200) {
          console.log(res.data);
          return res.data;
        } else {
          return res.data;
        }
      })
      .catch((error) => {
        //Request Unsuccesfull
        return { ok: false, error: error };
      });
  } else {
    //Failed to get Token
    return getTokenResult;
  }
};
