var data = {
  firstName: null,
  lastName: null,
  displayName: null,
  email: null,
  loading: false
};

const profileState = function (state = data, action) {
  switch (action.type) {
    case "GET_USER_PROFILE":
      return action.payload;
    case "ClEAR_USER_PROFILE":
      return data
      case "USER_PROFILE_LOADING":
        return {loading: true}
    default:
      return state;
  }
};

export { profileState };
