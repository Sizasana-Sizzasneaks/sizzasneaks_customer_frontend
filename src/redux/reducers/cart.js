var data = {
  loading: false,
  cart: null,
  error: null,
};

const cartState = function (state = data, action) {
  switch (action.type) {
    case "GET_USER_CART":
      return { ...data, ...action.payload};
    case "ClEAR_USER_CART":
      return data;
    case "USER_CART_LOADING":
      return { ...data, loading: true, cart: null, error: null };
    default:
      return state;
  }
};

export { cartState };
