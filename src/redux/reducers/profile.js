var data = {
  firstName: null,
  lastName: null,
  displayName: null,
  email: null,
};

const profileState = function (state = data, action) {
  if (action.type === "GET_USER_PROFILE") {
    return action.payload;
  }
  else{
      return state;
  }
};

export { profileState };
