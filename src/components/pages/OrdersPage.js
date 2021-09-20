import React from "react";

//Styles & Themes
import Styles from "./OrdersPage.module.css";

//Functions
import { getOrders, getOrder, postOrder } from "../../api/orders.js";

function OrdersPage() {
  React.useEffect(() => {
    //retrieveOrders()
    //retrieveOrder();
  }, []);

  async function retrieveOrders() {
    var getOrdersResult = await getOrders();

    if (getOrdersResult.ok) {
      console.log("Worked");
      console.log(getOrdersResult);
    } else {
      console.log("Failed");
      console.log(getOrdersResult);
    }
  }

  async function retrieveOrder() {
    var getOrderResult = await getOrder("614891b4935a1001e071cb2b");

    if (getOrderResult.ok) {
      console.log("Worked");
      console.log(getOrderResult);
    } else {
      console.log("Failed");
      console.log(getOrderResult);
    }
  }

  return (
    <div>
      <p>Orders Page</p>
    </div>
  );
}

export default OrdersPage;
