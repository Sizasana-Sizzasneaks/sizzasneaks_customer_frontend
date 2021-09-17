import axios from "axios";
import { getCurrentUserIdToken } from "../services/authentication.js";
import * as API_CONSTANTS from "./index.js";

export const createNewShippingAddress = async (
  addressName,
  addressLineOne,
  addressLineTwo,
  city,
  province,
  country,
  zipCode,
  contactNumber
) => {
  var getTokenResult = await getCurrentUserIdToken();

  // checks whether the current user's token was retrieved successfully
  if (getTokenResult.ok === true) {
    // sets the necessary header information for authentication based on the user's token
    const config = {
      headers: {
        credentialclaims: "customer",
        Authorization: "Bearer " + getTokenResult.data,
      },
    };
    return axios
      .post(
        API_CONSTANTS.SHIPPING_ROUTE,
        {
          addressName,
          addressLineOne,
          addressLineTwo,
          city,
          province,
          country,
          zipCode,
          contactNumber,
        },
        config
      )
      .then((res) => {
        // Request Successful
        //Handle Different HTTP Status Codes and Responses
        return res.data; // returns the corresponding details for a signed in user
      })
      .catch((error) => {
        // returns general error when the system fails to retrieve a user's details
        return { ok: false, error: error };
      });
  } else {
    //returns a general error when the system has failed to get the user's token
    return getTokenResult;
  }
};

export const getShippingAddressById = async (addressId) => {
  var getTokenResult = await getCurrentUserIdToken();

  // checks whether the current user's token was retrieved successfully
  if (getTokenResult.ok === true) {
    // sets the necessary header information for authentication based on the user's token
    const config = {
      headers: {
        credentialClaims: "customer",
        Authorization: "Bearer " + getTokenResult.data,
      },
      params: {
        addressId: addressId,
      }
    };
    return axios
      .get(API_CONSTANTS.SHIPPING_ROUTE + "/address", config)
      .then((res) => {
        //Request Successful
        //Handle Different HTTP Status Codes and Responses
        return res.data; // Returns the corresponding Shipping address.
      })
      .catch((error) => {
        // returns general error when the system fails to retrieve a user's shipping address
        return { ok: false, error: error };
      });
  } else {
    //returns a general error when the system has failed to get the user's token
    return getTokenResult;
  }
};
