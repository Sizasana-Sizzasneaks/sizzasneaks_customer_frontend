import React from "react";
import { getCart, updateCartItemQuantity } from "../../api/cart.js";

function ShoppingCartPage(props) {
  React.useEffect(() => {
    // getShoppingCart();
    //updateItemQuantity("6101340adc7a0305bc700018",{color:"Blue", size:7}, 2);
  }, []);

  async function getShoppingCart() {
    var getCartResult = await getCart();

    if (getCartResult.ok === true) {
      console.log("It Worked");
      console.log(getCartResult);
    } else {
      console.log("Sad");
      console.log(getCartResult);
    }
  }

  async function updateItemQuantity(product_id, option, newQuantity) {
    var updateCartItemQuantityResult = await updateCartItemQuantity(
      product_id,
      option,
      newQuantity
    );

    if (updateCartItemQuantityResult.ok === true) {
      console.log("It Worked");
      console.log(updateCartItemQuantityResult);
    } else {
      console.log("Sad");
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
