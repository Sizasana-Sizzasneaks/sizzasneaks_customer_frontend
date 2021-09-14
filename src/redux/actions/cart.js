import { getCart } from "../../api/cart.js";

export const getUserCart = () => async (dispatch) => {
  try {
      
    dispatch({
      type: "USER_CART_LOADING",
    });

    var getUserCartResult = await getCart();

    if (getUserCartResult.ok === true) {
      dispatch({
        type: "GET_USER_CART",
        payload: { cart: getUserCartResult.data, loading: false },
      });
    } else {
        console.log("Got");
      dispatch({
        type: "GET_USER_CART",
        payload: {
          ok: false,
          error: "Failed Getting User Cart",
          loading: false,
        },
      });
    }
  } catch (error){
    console.log("Error");
    console.log(error);
    dispatch({
      type: "GET_USER_CART",
      payload: {
        ok: false,
        error: "Error Getting User Cart",
        loading: false,
      },
    });
  }
};
