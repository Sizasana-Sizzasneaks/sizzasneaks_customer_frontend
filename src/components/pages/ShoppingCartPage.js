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
//getShoppingCart is used to get the shopping cart that belong to the current user 
  async function getShoppingCart() {
    var getCartResult = await getCart();
    
    if (getCartResult.ok === true) {
      console.log(getCartResult);
    } else {
      console.log(getCartResult);
    }
  }
//deleteCartItem is used when the cutomer deletes a certain product from his cart
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
// updateItemQuantity is used to update the product quantity when a customer add or deletes the amount of products 
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
