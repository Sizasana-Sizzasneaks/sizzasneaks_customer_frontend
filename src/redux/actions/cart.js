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
        
      dispatch({
        type: "GET_USER_CART",
        payload: {
          ok: false,
          error: "Error getting user cart",
          loading: false,
        },
      });
    }
  } catch (error){
    
    dispatch({
      type: "GET_USER_CART",
      payload: {
        ok: false,
        error: "Error getting user cart",
        loading: false,
      },
    });
  }
};

export const clearUserCart = () => {
  return {
    type: "ClEAR_USER_CART",
  };
};