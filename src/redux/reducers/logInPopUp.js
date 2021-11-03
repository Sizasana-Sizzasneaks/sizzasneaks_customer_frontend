var data = {
  show: false,
};

const logInPopUpState = function (state = data, action) {
  switch (action.type) {
    case "SHOW_LOGIN_POPUP":
      return { show: true };
    case "HIDE_LOGIN_POPUP":
      return { show: false };
    case "TOGGLE_LOGIN_POPUP":
      return { show: action.payload };
    default:
      return state;
  }
};
export { logInPopUpState };
