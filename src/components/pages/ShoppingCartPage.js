import React from "react";
import {
  getCart,
  updateCartItemQuantity,
  deleteSingleCartItem,
} from "../../api/cart.js";

function ShoppingCartPage(props) {
  React.useEffect(() => {
    // getShoppingCart();
   // updateItemQuantity("6101340adc7a0305bc700017",{color:"Red", size:3}, 4);
   // deleteCartItem("6101340adc7a0305bc700017", { color: "Green", size: 2 });
  }, []);

  async function getShoppingCart() {
    var getCartResult = await getCart();

    if (getCartResult.ok === true) {
      console.log(getCartResult);
    } else {
      console.log(getCartResult);
    }
  }

  async function deleteCartItem(product_id, option) {
    var deleteSingleCartItemResult = await deleteSingleCartItem(
      product_id,
      option
    );

    if (deleteSingleCartItemResult.ok === true) {
      console.log(deleteSingleCartItemResult);
    } else {
      console.log(deleteSingleCartItemResult);
    }
  }

  async function updateItemQuantity(product_id, option, newQuantity) {
    var updateCartItemQuantityResult = await updateCartItemQuantity(
      product_id,
      option,
      newQuantity
    );

    if (updateCartItemQuantityResult.ok === true) {
      console.log(updateCartItemQuantityResult);
    } else {
      console.log(updateCartItemQuantityResult);
    }
  }

  return (
    <div>
      <p>Shopping Cart Page</p>
    </div>
  );
}

export default ShoppingCartPage;
