import axios from "axios";
import { getCurrentUserIdToken } from "../services/authentication.js";
import * as API_CONSTANTS from "./index.js";

export const updateUserDetails = async (data) => {
  var getTokenResult = await getCurrentUserIdToken();

  if (getTokenResult.ok === true) {
    const config = {
      headers: { Authorization: "Bearer " + getTokenResult.data },
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
      headers: { Authorization: "Bearer " + getTokenResult.data },
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
