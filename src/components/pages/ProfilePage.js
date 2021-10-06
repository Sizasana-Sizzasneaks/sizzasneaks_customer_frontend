import React from "react";
import { Breadcrumb, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import OrderDetailsCard from "../profile/orders/OrderDetailsCard.js";
import { convertDateToString } from "../../services/dateManipulationFunctions";

import Styles from "./ProfilePage.module.css";

import {
  getOrders,
  getOrder,
  postOrder,
  orderPayment,
} from "../../api/orders.js";
import { CircularProgress } from "@material-ui/core";

function ProfilePage(props) {
  var formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "ZAR",
  });

  var [orders, setOrders] = React.useState(null);
  var [ordersError, setOrdersError] = React.useState(null);
  var [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    retrieveOrders();
  }, []);

  async function retrieveOrders() {
    setLoading(true);
    setOrders(null);
    setOrdersError(null);

    var getOrdersResult = await getOrders();
    setLoading(false);
    if (getOrdersResult.ok) {
      setOrders(getOrdersResult.data);
    } else {
      setOrdersError(getOrdersResult);
    }
  }

  return (
    <div>
      {" "}
      <Breadcrumb style={{ margin: "20px" }}>
        <Breadcrumb.Item>
          <Link to="/">Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item active>Profile</Breadcrumb.Item>
      </Breadcrumb>
      {loading ? (
        <div className={Styles.LoadingBox}>
          <CircularProgress size={150} />
        </div>
      ) : (
        <>
          {" "}
          {orders && (
            <Row>
              <p className={Styles.ProfileCatBanner}>Orders</p>
              <div className={Styles.BannerDivideBox}>
                <hr />
              </div>
            </Row>
          )}
          {orders &&
            orders.map((order) => {
              var totalCost = 0;

              order.orderItems.forEach((element) => {
                totalCost =
                  totalCost + element.sellingPriceAmount * element.quantity;
              });

              totalCost = totalCost + order.shippingCost;

              var totalTax = 0;

              order.orderItems.forEach((item) => {
                totalTax = totalTax + item.sellingPriceAmount * 0.15 * item.quantity;
              });

              return (
                <Row className={Styles.OrderCardRow}>
                  <OrderDetailsCard
                    orderId={order._id}
                    orderItems={order.orderItems}
                    shippingAddress={order.shippingAddress}
                    shippingCost={order.shippingCost}
                    totalTax={formatter.format(totalTax)}
                    totalCost={formatter.format(totalCost)}
                    paymentComplete={order.paymentComplete}
                    paymentTime={
                      order.paymentComplete
                        ? convertDateToString(order.paymentTime)
                        : "Not Paid"
                    }
                    hasShipped={order.hasShipped}
                    shippedTime={
                      order.hasShipped
                        ? convertDateToString(order.shippedTime)
                        : "Not Shipped"
                    }
                    hasBeenDelivered={order.hasBeenDelivered}
                    deliveredTime={
                      order.hasBeenDelivered
                        ? convertDateToString(order.deliveredTime)
                        : "Not Delivered"
                    }
                    isCancelled={order.isCancelled}
                    cancelTime={
                      order.isCancelled
                        ? convertDateToString(order.cancelTime)
                        : "Not cancelled"
                    }
                    cancelDescription={order.cancelDescription}
                    date={convertDateToString(order.createdAt)}
                  />
                </Row>
              );
            })}
          {ordersError && (
            <div className={Styles.ErrorBox}>
              <div className={Styles.InnerErrorBox}>
                <span class="material-icons">error</span>
              </div>
              <div className={Styles.InnerErrorBox}>
                <p>{ordersError.message}</p>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default ProfilePage;
