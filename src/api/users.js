import axios from "axios";
import { getCurrentUserIdToken } from "../services/authentication.js";
import * as API_CONSTANTS from "./index.js";

export const updateUserDetails = async (data) => {
  if (data.firstName && data.lastName) {
    var firstName =
      data.firstName.substr(0, 1).toUpperCase() +
      data.firstName.substr(1, data.firstName.length);
    var lastName =
      data.lastName.substr(0, 1).toUpperCase() +
      data.lastName.substr(1, data.lastName.length);
    var displayName = firstName.substr(0, 1) + ". " + lastName;

    data = { ...data, firstName, lastName, displayName };
  }

  var getTokenResult = await getCurrentUserIdToken();

  if (getTokenResult.ok === true) {
    const config = {
      headers: {credentialclaims: "customer",
       Authorization: "Bearer " + getTokenResult.data
      },
    };
    return axios
      .patch(API_CONSTANTS.USER_ROUTE, data, config)
      .then((res) => {
        //Request Succesfull
        //Handle Different HTTP Status Codes and Responses
        return { ok: true };
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

export const getUserDetails = async () => {
  var getTokenResult = await getCurrentUserIdToken();

  if (getTokenResult.ok === true) {
    const config = {
      headers: {credentialclaims: "customer",
       Authorization: "Bearer " + getTokenResult.data
      },
    };
    return axios
      .get(API_CONSTANTS.USER_ROUTE, config)
      .then((res) => {
        // Request Succesfull
        //Handle Different HTTP Status Codes and Responses
        return { ok: true, data: res.data };
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

export const createNewUser = async (userData) => {
  var getTokenResult = await getCurrentUserIdToken();

  if (getTokenResult.ok === true) {
    console.log(getTokenResult.data);
    const config = {
      headers: {credentialclaims: "customer",
       Authorization: "Bearer " + getTokenResult.data
      },
    };

    return axios
      .post(API_CONSTANTS.USER_ROUTE, { ...userData }, config)
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
};
