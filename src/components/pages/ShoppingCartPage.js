import React from "react";
import { getCart } from "../../api/cart.js";

function ShoppingCartPage(props) {
  React.useEffect(() => {
      getShoppingCart();
  }, []);

  async function getShoppingCart () {
      
    var getCartResult = await getCart();

    if (getCartResult.ok === true) {
      console.log("It Worked");
      console.log(getCartResult);
    } else {
      console.log("Sad");
      console.log(getCartResult);
    }
  }

  return (
    <div>
      <p>Shopping Cart Page</p>
    </div>
  );
}

export default ShoppingCartPage;
