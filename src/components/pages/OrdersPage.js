import React from "react";

//Styles & Themes
import Styles from "./OrdersPage.module.css";

//Functions
import {
  getOrders,
  getOrder,
  postOrder,
  orderPayment,
} from "../../api/orders.js";

function OrdersPage() {
  React.useEffect(() => {
    //retrieveOrders()
    //retrieveOrder();
    //createOrder()
    payOrder();
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

  async function createOrder() {
    var postOrderResult = await postOrder("61447b1e0177213640efdef4");

    if (postOrderResult.ok) {
      console.log("Worked");
      console.log(postOrderResult);
    } else {
      console.log("Failed");
      console.log(postOrderResult);
    }
  }

  async function payOrder() {
    var orderPaymentResult = await orderPayment("614e300c5201ab4bb47eb61b", {});

    if (orderPaymentResult.ok) {
      console.log("Worked");
      console.log(orderPaymentResult);
    } else {
      console.log("Failed");
      console.log(orderPaymentResult);
    }
  }

  return (
    <div>
      <p>Orders Page</p>
    </div>
  );
}

export default OrdersPage;
