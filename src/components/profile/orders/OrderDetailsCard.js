import React from "react";
import { Row, Col } from "react-bootstrap";
import Styles from "./OrderDetailsCard.module.css";
import { CircularProgress } from "@material-ui/core";
import InputTextArea from "../general/InputTextArea.js";

import { validateProductDescriptionString } from "../../services/InputValidation.js";
function OrderDetailsCard(props) {
  var formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "ZAR",
  });

  //Loading State For Order Update
  var [loadShipp, setLoadShipp] = React.useState(false);
  var [loadDeliver, setLoadDeliver] = React.useState(false);
  var [loadCancel, setLoadCancel] = React.useState(false);
  var [cancelDescription, setCancelDescription] = React.useState(null);

  var [showCancelBox, setShowCancelBox] = React.useState(false);
  var [cancelDescriptionError, setCancelDescriptionError] =
    React.useState(null);
  return (
    <>
      <Row className={Styles.OrderDetailsCard}>
        <Row className={Styles.TopRow}>
          <Col xl={8}>
            <p>#OrderID: {props.orderId}</p>
          </Col>

          <Col xl={4}>
            <p style={{ textAlign: "right" }}> {props.date}</p>
          </Col>
        </Row>

        <Row className={Styles.CardRow}>
          <Col xl={2}>
            <p>Product Name</p>
          </Col>

          <Col xl={2}>
            <p>Color</p>
          </Col>

          <Col xl={2}>
            <p>Size</p>
          </Col>

          <Col xl={2}>
            <p>Quantity</p>
          </Col>

          <Col xl={4}>
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
                <Col xl={2}>
                  <p>Product Name</p>
                </Col>

                <Col xl={2}>
                  {/* getting color of item */}
                  <p>{item.option.color}</p>
                </Col>

                <Col xl={2}>
                  <p>{item.option.size}</p>
                </Col>

                <Col xl={2}>
                  <p>{item.quantity}</p>
                </Col>

                <Col xl={4}>
                  <p style={{ textAlign: "right" }}>
                    {formatter.format(item.sellingPriceAmount * item.quantity)}
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

        <Row className={Styles.SummaryLine}>
          <Col xl={4}>
            <p>Total</p>
          </Col>

          <Col xl={8}>
            <p style={{ textAlign: "right" }}>{props.totalCost}</p>
          </Col>
        </Row>
        <Row className={Styles.BottomDivider}>
          <Col>
            <hr />
          </Col>
        </Row>

        <Row>
          <Col xl={4} className={Styles.ShippingAddress}>
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
                  <p>{props.paymentComplete ? "Done" : "False"}</p>
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
                <Col xl={1}>
                  {loadShipp ? (
                    <div className={Styles.loadingBox}>
                      <CircularProgress size={20} />
                    </div>
                  ) : (
                    <p>
                      {props.hasShipped ? (
                        "Done"
                      ) : (
                        <div
                          className={Styles.SetFlag}
                          onClick={async () => {
                            if (
                              typeof props.setShipped !== "undefined" &&
                              props.paymentComplete
                            ) {
                              setLoadShipp(true);
                              await props.setShipped(props.orderId);
                              setLoadShipp(false);
                            }
                          }}
                        >
                          <p>Set</p>
                        </div>
                      )}
                    </p>
                  )}
                </Col>

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
                  {" "}
                  {loadDeliver ? (
                    <div className={Styles.loadingBox}>
                      <CircularProgress size={20} />
                    </div>
                  ) : (
                    <p>
                      {props.hasBeenDelivered ? (
                        "Done"
                      ) : (
                        <div
                          className={Styles.SetFlag}
                          onClick={async () => {
                            if (
                              typeof props.setDelivered !== "undefined" &&
                              props.hasShipped
                            ) {
                              setLoadDeliver(true);
                              await props.setDelivered(props.orderId);
                              setLoadDeliver(false);
                            }
                          }}
                        >
                          <p>Set</p>
                        </div>
                      )}
                    </p>
                  )}
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
                    {" "}
                    {loadCancel ? (
                      <div className={Styles.loadingBox}>
                        <CircularProgress size={20} />
                      </div>
                    ) : (
                      <p>
                        {props.isCancelled ? (
                          "Done"
                        ) : (
                          <div
                            className={Styles.SetFlag}
                            onClick={async () => {
                              if (!props.hasBeenDelivered) {
                                setShowCancelBox(!showCancelBox);
                              }
                            }}
                          >
                            <p>Set</p>
                          </div>
                        )}
                      </p>
                    )}
                  </Col>
                  <Col xl={8} style={{ textAlign: "right" }}>
                    {" "}
                    <p>{props.isCancelled ? props.cancelTime : ""}</p>
                  </Col>
                </Row>

                {showCancelBox && (
                  <>
                    {" "}
                    <Row style={{ marginTop: "5px" }}>
                      <InputTextArea
                        value={cancelDescription}
                        placeholder="Cancel Description"
                        entireComponentStyle={{ width: "100%" }}
                        wrapperStyle={{ width: "100%", height: "60px" }}
                        onChange={(value) => {
                          setCancelDescription(value);
                        }}
                        onBlur={async (value) => {
                          var validateCancelDescription =
                            await validateProductDescriptionString(
                              cancelDescription
                            );
                          setCancelDescriptionError(validateCancelDescription);
                        }}
                        error={cancelDescriptionError}
                      />
                    </Row>
                    <Row>
                      <div
                        className={Styles.cancelFlag}
                        onClick={async () => {
                          var validateCancelDescription =
                            await validateProductDescriptionString(
                              cancelDescription
                            );

                          if (!validateCancelDescription.ok) {
                            setCancelDescriptionError(
                              validateCancelDescription
                            );
                          } else {
                            setCancelDescription(null);
                            setCancelDescriptionError(null);
                            setShowCancelBox(false);
                            if (
                              typeof props.setCancelled !== "undefined" &&
                              !props.hasBeenDelivered
                            ) {
                              setLoadCancel(true);
                              await props.setCancelled(
                                props.orderId,
                                cancelDescription
                              );
                              setLoadCancel(false);
                            }
                          }
                        }}
                      >
                        <p>Cancel Order</p>
                      </div>
                    </Row>
                  </>
                )}
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
