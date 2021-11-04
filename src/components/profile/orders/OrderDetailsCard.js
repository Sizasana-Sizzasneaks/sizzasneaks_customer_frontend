import React from "react";
import { Row, Col } from "react-bootstrap";

import Styles from "./OrderDetailsCard.module.css";
import { useHistory } from "react-router";
import { CircularProgress } from "@material-ui/core";

function OrderDetailsCard(props) {
  const history = useHistory();
  var formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "ZAR",
  });

  return (
    <>
      <Row className={Styles.OrderDetailsCard}>
        <Row className={Styles.TopRow}>
          <Col xl={8} xs={12} >
            <p>#OrderID: {props.orderId}</p>
          </Col>

          <Col xl={4} xs={12}>
            <p style={{ textAlign: "right" }}> {props.date}</p>
          </Col>
        </Row>

        <Row className={Styles.CardRow}>
          <Col xs={2}>
            <p>Product Name</p>
          </Col>

          <Col xs={2}>
            <p>Color</p>
          </Col>

          <Col xs={2}>
            <p>Size</p>
          </Col>

          <Col xs={2}>
            <p>Quantity</p>
          </Col>

          <Col xs={4}>
            <p style={{ textAlign: "right" }}>Total</p>
          </Col>
        </Row>

        <Row>
          <Col>
            <hr />
          </Col>
        </Row>

        {props.orderItems.map((item) => {
          return (
            <>
              <Row className={Styles.TextRow}>
                <Col xs={2}>
                  <p>{item.productName}</p>
                </Col>

                <Col xs={2}>
                  {/* getting color of item */}
                  <p>{item.option.color}</p>
                </Col>

                <Col xs={2}>
                  <p>{item.option.size}</p>
                </Col>

                <Col xs={2}>
                  <p>{item.quantity}</p>
                </Col>

                <Col xs={4}>
                  <p style={{ textAlign: "right" }}>
                    {formatter.format(
                      (item.sellingPriceAmount -
                        item.sellingPriceAmount * 0.15) *
                        item.quantity
                    )}
                  </p>
                </Col>
              </Row>
              <Row>
                <Col>
                  <hr />
                </Col>
              </Row>
            </>
          );
        })}
        <Row className={Styles.TaxDeliveryLine}>
          <Col xs={6}>
            <p>Tax Amount</p>
          </Col>

          <Col xs={6}>
            <p style={{ textAlign: "right" }}>{props.totalTax}</p>
          </Col>
        </Row>
        <Row>
          <Col>
            <hr />
          </Col>
        </Row>

        <Row className={Styles.TaxDeliveryLine}>
          <Col xs={6}>
            <p>Delivery Charge</p>
          </Col>

          <Col xs={6}>
            <p style={{ textAlign: "right" }}>
              {formatter.format(props.shippingCost)}
            </p>
          </Col>
        </Row>
        <Row>
          <Col>
            <hr />
          </Col>
        </Row>

        <Row className={Styles.SummaryLine}>
          <Col xs={4}>
            <p>Total</p>
          </Col>

          <Col xs={8}>
            <p style={{ textAlign: "right" }}>{props.totalCost}</p>
          </Col>
        </Row>
        <Row className={Styles.BottomDivider}>
          <Col>
            <hr />
          </Col>
        </Row>

        <Row>
          <Col xl={4} lg={12} className={Styles.ShippingAddress}>
            <Row>
              <p
                style={{
                  fontWeight: "400",
                  fontSize: "20px",
                  marginBottom: "8px",
                }}
              >
                Shipping Address
              </p>
            </Row>
            <Row>
              <p>
                {props.shippingAddress.firstName +
                  " " +
                  props.shippingAddress.lastName}
              </p>
            </Row>
            <Row>
              <p>{props.shippingAddress.addressLineOne}</p>
            </Row>
            <Row>
              <p>{props.shippingAddress.addressLineTwo}</p>
            </Row>
            <Row>
              <p>{props.shippingAddress.city}</p>
            </Row>
            <Row>
              <p>{props.shippingAddress.province}</p>
            </Row>
            <Row>
              <p>{props.shippingAddress.country}</p>
            </Row>
            <Row>
              <p>{props.shippingAddress.zipCode}</p>
            </Row>
            <Row>
              <p>{props.shippingAddress.contactNumber}</p>
            </Row>
          </Col>

          <Col></Col>

          <Col className={Styles.OrderStatus}>
            <Row>
              <Col>
                <p
                  style={{
                    fontWeight: "400",
                    fontSize: "20px",
                    marginBottom: "8px",
                  }}
                >
                  Order Status
                </p>
              </Col>
            </Row>

            <Row>
              <Row
                className={
                  props.paymentComplete
                    ? [
                        Styles.OrderStatusRow,
                        Styles.OrderStatusRowComplete,
                      ].join(" ")
                    : Styles.OrderStatusRow
                }
              >
                <Col xl={3}>
                  {" "}
                  <p>Paid:</p>
                </Col>
                <Col xl={1}>
                  {" "}
                  <p>
                    {props.paymentComplete ? (
                      "Done"
                    ) : (
                      <>
                        {props.isCancelled ? (
                          "False"
                        ) : (
                          <div
                            className={Styles.PayFlag}
                            onClick={async () => {
                              history.push({
                                pathname: "/billing",
                                state: {
                                  orderId: props.orderId,
                                },
                              });
                            }}
                          >
                            <p>Pay</p>
                          </div>
                        )}
                      </>
                    )}
                  </p>
                </Col>
                <Col xl={8} style={{ textAlign: "right" }}>
                  {" "}
                  <p>{props.paymentComplete ? props.paymentTime : ""}</p>
                </Col>
              </Row>

              <Row
                className={
                  props.hasShipped
                    ? [
                        Styles.OrderStatusRow,
                        Styles.OrderStatusRowComplete,
                      ].join(" ")
                    : Styles.OrderStatusRow
                }
              >
                <Col xl={3}>
                  <p>Shipped:</p>
                </Col>
                <Col xl={1}>{props.hasShipped ? "Done" : "False"}</Col>

                <Col xl={8} style={{ textAlign: "right" }}>
                  {" "}
                  <p>{props.hasShipped ? props.shippedTime : ""}</p>{" "}
                </Col>
              </Row>

              <Row
                className={
                  props.hasBeenDelivered
                    ? [
                        Styles.OrderStatusRow,
                        Styles.OrderStatusRowComplete,
                      ].join(" ")
                    : Styles.OrderStatusRow
                }
              >
                <Col xl={3}>
                  {" "}
                  <p>Delivered:</p>
                </Col>
                <Col xl={1}>
                  <p>{props.hasBeenDelivered ? "Done" : "False"}</p>
                </Col>
                <Col xl={8} style={{ textAlign: "right" }}>
                  {" "}
                  <p>{props.hasBeenDelivered ? props.deliveredTime : ""}</p>
                </Col>
              </Row>

              <Row
                className={
                  props.isCancelled
                    ? [
                        Styles.OrderStatusRow,
                        Styles.OrderStatusRowCancelled,
                      ].join(" ")
                    : Styles.OrderStatusRow
                }
              >
                <Row>
                  <Col xl={3}>
                    <p>Cancelled:</p>
                  </Col>
                  <Col xl={1}>
                    <p>{props.isCancelled ? "Done" : "False"}</p>
                  </Col>
                  <Col xl={8} style={{ textAlign: "right" }}>
                    {" "}
                    <p>{props.isCancelled ? props.cancelTime : ""}</p>
                  </Col>
                </Row>
              </Row>

              {props.cancelDescription && (
                <Row className={Styles.OrderStatusRow}>
                  <Col xl={3}>
                    <p>Cancel Description:</p>
                  </Col>

                  <Col xl={9} style={{ textAlign: "right" }}>
                    {" "}
                    <p>{props.cancelDescription}</p>
                  </Col>
                </Row>
              )}
            </Row>
          </Col>
        </Row>
      </Row>
      <hr className={Styles.TopLine} />
    </>
  );
}

export default OrderDetailsCard;
