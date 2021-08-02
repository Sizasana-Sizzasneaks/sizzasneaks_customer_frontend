var data = {
  firstName: null,
  lastName: null,
  displayName: null,
  email: null,
};

const profileState = function (state = data, action) {
  switch (action.type) {
    case "GET_USER_PROFILE":
      return action.payload;
    case "ClEAR_USER_PROFILE":
      return data
    default:
      return state;
  }
};

export { profileState };
