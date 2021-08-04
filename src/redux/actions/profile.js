import { getUserDetails } from "../../api/users.js";

export const getUserProfile = () => async (dispatch) => {

  dispatch({
    type: "USER_PROFILE_LOADING",
  });




  var getUserDetailsResult = await getUserDetails();

  if (getUserDetailsResult.ok === true) {
    dispatch({
      type: "GET_USER_PROFILE",
      payload: {...getUserDetailsResult.data, loading:false },
    });
  } else {
    dispatch({
      type: "GET_USER_PROFILE",
      payload: { ok: false, error: "Failed Geting Details From backend" },
    });
  }
};

export const clearUserProfile = () => {
  return {
    type: "ClEAR_USER_PROFILE",
  };
};
