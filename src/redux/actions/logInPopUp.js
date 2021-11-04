export const showLogInPopUp = () => {
  return {
    type: "SHOW_LOGIN_POPUP",
  };
};

export const hideLogInPopUp = () => {
  return {
    type: "HIDE_LOGIN_POPUP",
  };
};

export const toggleLogInPopUp = (show) => {
  return {
    type: "TOGGLE_LOGIN_POPUP",
    payload: show,
  };
};
