import axios from "axios";
import { getCurrentUserIdToken } from "../services/authentication.js";
import * as API_CONSTANTS from "./index.js";

//used to update a user's personal details
export const updateUserDetails = async (data) => {
  //checks whether the data provided matches the current users details
  if (data.firstName && data.lastName) {
    var firstName =
      data.firstName.substr(0, 1).toUpperCase() +
      data.firstName.substr(1, data.firstName.length);
    var lastName =
      data.lastName.substr(0, 1).toUpperCase() +
      data.lastName.substr(1, data.lastName.length);
    var displayName = firstName.substr(0, 1) + ". " + lastName;

    data = { ...data, firstName, lastName, displayName };//sets the current user's
  }

  var getTokenResult = await getCurrentUserIdToken();

  // checks whether the current user's token was retrieved successfully
  if (getTokenResult.ok === true) {
    const config = {
      // sets the necessary header information for authentication based on the user's token 
      headers: {credentialclaims: "customer",
       Authorization: "Bearer " + getTokenResult.data
      },
    };
    return axios
      .patch(API_CONSTANTS.USER_ROUTE, data, config) //replaces the data of  the current user based on the new data the provide
      .then((res) => {
        //Request Succesfull
        //Handle Different HTTP Status Codes and Responses
        return { ok: true };
      })
      .catch((error) => {
        //returns a general error when the initial patch request is unsuccessful 
        return { ok: false, error: error };
      });
  } else {
    //returns a general error when the system has failed to get the user's token 
    return getTokenResult;
  }
};

//used to retrieve a user's details
export const getUserDetails = async () => {
  var getTokenResult = await getCurrentUserIdToken();

  // checks whether the current user's token was retrieved successfully 
  if (getTokenResult.ok === true) {
    // sets the necessary header information for authentication based on the user's token
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
        return { ok: true, data: res.data };// returns the corresponding details for a signed in user
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

//used to create a new user 
export const createNewUser = async (userData) => {
  var getTokenResult = await getCurrentUserIdToken();

  // checks whether the current user's token was retrieved successfully
  if (getTokenResult.ok === true) {
    console.log(getTokenResult.data);
    const config = {
      // sets the necessary header information for authentication based on the user's token
      headers: {credentialclaims: "customer",
       Authorization: "Bearer " + getTokenResult.data
      },
    };

    return axios
      .post(API_CONSTANTS.USER_ROUTE, { ...userData }, config)
      .then((res) => {
        return { ok: true };
      })//sends the data from a user's input in signup form to the customer collection in the database
      .catch((error) => {
        //returns a general error when the post request is unsuccessful
        return { ok: false, error: error };
      });
  } else {
    //returns a general error when the system has failed to get the user's token 
    return getTokenResult;
  }
};
