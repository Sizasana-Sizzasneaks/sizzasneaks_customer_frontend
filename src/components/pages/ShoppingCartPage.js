import React from "react";
import { sendEmailVerificationEmail } from "../../services/authentication.js";
import {
  updateCartItemQuantity,
  deleteSingleCartItem,
} from "../../api/cart.js";
import { useHistory, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getUserCart } from "../../redux/actions/cart.js";

import {
  Card,
  ListGroup,
  Row,
  Col,
  Container,
  Breadcrumb,
} from "react-bootstrap";
import CartItemLine from "../Cart/CartItemLine";
import { CircularProgress } from "@material-ui/core";
import CustomButton from "../general/Button.js";
import Styles from "./ShoppingCartPage.module.css";

function ShoppingCartPage() {
  var formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "ZAR",
  });
  const history = useHistory();
  const dispatch = useDispatch();

  const authState = useSelector((state) => state.firebase.auth);
  const shoppingCart = useSelector((state) => state.cart);

  var [loadingRequest, setLoadingRequest] = React.useState(false);
  var [requestVerEmailState, setRequestVerEmailState] = React.useState(null);

  React.useEffect(() => {
    dispatch(getUserCart());
  }, []);

  return (
    <div>
      <Breadcrumb style={{ margin: "20px" }}>
        <Breadcrumb.Item>
          <Link to="/">Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item active>Shopping Cart</Breadcrumb.Item>
      </Breadcrumb>

      <Container className={Styles.container}>
        <Row>
          <Col xs={12} md={8}>
            <Card>
              <Card.Header className={Styles.Name}> Cart Items</Card.Header>

              {authState.isEmpty ? (
                <div className={Styles.EmptyCartBanner}>
                  <p>Your shopping cart is empty.</p>
                  <CustomButton
                    label="Continue Shopping"
                    styles={{
                      backgroundColor: "#38CCCC",
                      margin: "20px auto",

                      textAlign: "center",
                    }}
                    onClick={() => {
                      history.push("/");
                    }}
                  />
                </div>
              ) : (
                <>
                  {shoppingCart.loading ? (
                    <div className={Styles.CartItemsLoading}>
                      <CircularProgress size={120} />
                    </div>
                  ) : (
                    <div>
                      <ListGroup variant="flush">
                        <ListGroup.Item>
                          {!shoppingCart.error ? (
                            <div>
                              {" "}
                              {shoppingCart.cart &&
                                (shoppingCart.cart.cart.length != 0 ? (
                                  shoppingCart.cart.cart.map((cartItem) => {
                                    return (
                                      <>
                                        <CartItemLine
                                          cartItemImage={
                                            cartItem.imgURls.imgURL
                                          }
                                          cartItemProductId={
                                            cartItem.product_id
                                          }
                                          cartItemName={cartItem.productName}
                                          cartItemQuantity={cartItem.quantity}
                                          cartItemOption={cartItem.option}
                                          cartItemColor={cartItem.option.color}
                                          cartItemSize={cartItem.option.size}
                                          available={cartItem.available}
                                          cartItemSellingPrice={
                                            cartItem.sellingPrice *
                                            cartItem.quantity
                                          }
                                        />
                                        <hr />
                                      </>
                                    );
                                  })
                                ) : (
                                  <div className={Styles.EmptyCartBanner}>
                                    <p>Your shopping cart is empty.</p>
                                    <CustomButton
                                      label="Continue Shopping"
                                      styles={{
                                        backgroundColor: "#38CCCC",
                                        margin: "20px auto",

                                        textAlign: "center",
                                      }}
                                      onClick={() => {
                                        history.push("/");
                                      }}
                                    />
                                  </div>
                                ))}{" "}
                            </div>
                          ) : (
                            <div className={Styles.EmptyCartBanner}>
                              <span
                                class="material-icons"
                                style={{ color: "red", fontSize: "45px" }}
                              >
                                error
                              </span>
                              <p>{shoppingCart.error}</p>
                            </div>
                          )}
                        </ListGroup.Item>
                      </ListGroup>
                    </div>
                  )}
                </>
              )}
            </Card>
          </Col>

          {/* Summary detail card component */}
          <Col xs={6} md={4}>
            <Card className="cardStyle">
              <Card.Header className={Styles.Name}> Cart Summary</Card.Header>

              {authState.isEmpty ? (
                <div className={Styles.EmptyCartBanner}>
                  <p>Your shopping cart is empty.</p>
                  <CustomButton
                    label="Continue Shopping"
                    styles={{
                      backgroundColor: "#38CCCC",
                      margin: "20px auto",

                      textAlign: "center",
                    }}
                    onClick={() => {
                      history.push("/");
                    }}
                  />
                </div>
              ) : (
                <>
                  {shoppingCart.loading ? (
                    <div className={Styles.CartSummaryLoading}>
                      <CircularProgress size={90} />
                    </div>
                  ) : (
                    <div>
                      {!shoppingCart.error ? (
                        <div>
                          {shoppingCart.cart &&
                            (shoppingCart.cart.cart.length != 0 ? (
                              <div>
                                <ListGroup variant="flush">
                                  <ListGroup.Item
                                    className={Styles.SingleLineItem}
                                  >
                                    <Row>
                                      <Col
                                        xl={6}
                                        className={Styles.SummaryItemLabel}
                                      >
                                        {" "}
                                        <p>
                                          Price ({shoppingCart.cart.cartCount}{" "}
                                          Items):{" "}
                                        </p>
                                      </Col>
                                      {/* <Col xl={1} /> */}
                                      <Col
                                        xl={6}
                                        className={Styles.SummaryCostValue}
                                      >
                                        {formatter.format(
                                          shoppingCart.cart.cartTotal
                                        )}
                                      </Col>
                                    </Row>
                                  </ListGroup.Item>
                                  <ListGroup.Item
                                    className={Styles.SingleLineItem}
                                  >
                                    <Row>
                                      <Col
                                        xl={6}
                                        className={Styles.SummaryItemLabel}
                                      >
                                        {" "}
                                        <p>Delivery Charge: </p>{" "}
                                      </Col>

                                      <Col
                                        xl={6}
                                        className={Styles.SummaryCostValue}
                                      >
                                        {formatter.format(
                                          shoppingCart.cart.cartDeliveryCharge
                                        )}
                                      </Col>
                                    </Row>
                                  </ListGroup.Item>
                                  <ListGroup.Item
                                    className={Styles.SingleLineItem}
                                  >
                                    <Row>
                                      <Col
                                        xl={4}
                                        className={Styles.SummaryItemLabel}
                                      >
                                        <p>Total Price: </p>
                                      </Col>

                                      <Col
                                        xl={8}
                                        className={Styles.SummaryCostValue}
                                        style={{
                                          fontSize: "23px",
                                          fontWeight: "500",
                                        }}
                                      >
                                        {formatter.format(
                                          shoppingCart.cart.cartTotal +
                                            shoppingCart.cart.cartDeliveryCharge
                                        )}
                                      </Col>
                                    </Row>
                                  </ListGroup.Item>
                                </ListGroup>
                                <div
                                  style={{
                                    display: "grid",
                                    alignItems: "center",
                                    marginTop: "15px",
                                    marginBottom: "15px",
                                  }}
                                >
                                  {authState.isEmpty ||
                                  authState.isAnonymous ? (
                                    <div className={Styles.VerifiyEmailBox}>
                                      <p
                                        style={{
                                          margin: "auto",
                                          textAlign: "center",
                                          fontSize: "16px",
                                          padding: "10px",
                                        }}
                                      >
                                        <span
                                          className={
                                            Styles.RequestVerificationText
                                          }
                                          onClick={() => {
                                            history.push("/sign-up");
                                          }}
                                          style={{ fontWeight: "500" }}
                                        >
                                          Sign up
                                        </span>{" "}
                                        /{" "}
                                        <span
                                          className={
                                            Styles.RequestVerificationText
                                          }
                                          onClick={() => {
                                            history.push("/log-in");
                                          }}
                                          style={{ fontWeight: "500" }}
                                        >
                                          log in
                                        </span>{" "}
                                        to{" "}
                                        <span style={{ fontWeight: "500" }}>
                                          place{" "}
                                        </span>
                                        an{" "}
                                        <span style={{ fontWeight: "500" }}>
                                          order
                                        </span>
                                        .
                                      </p>
                                    </div>
                                  ) : authState.emailVerified ? (
                                    <CustomButton
                                      label="Place Order"
                                      styles={{
                                        backgroundColor: "#18723A",
                                        color: "white",
                                        margin: "10px auto",
                                        width: "80%",
                                        textAlign: "center",
                                      }}
                                      onClick={() => {
                                        //Push To Shipping
                                        // history.push("/");
                                      }}
                                    />
                                  ) : (
                                    <>
                                      <div className={Styles.VerifiyEmailBox}>
                                        <p
                                          style={{
                                            margin: "auto",
                                            textAlign: "center",
                                            fontSize: "16px",
                                            marginBottom: "10px",
                                          }}
                                        >
                                          Please
                                          <span style={{ fontWeight: "500" }}>
                                            {" "}
                                            verify your email address{" "}
                                          </span>
                                          to
                                          <span style={{ fontWeight: "500" }}>
                                            {" "}
                                            place{" "}
                                          </span>
                                          an
                                          <span style={{ fontWeight: "500" }}>
                                            {" "}
                                            order
                                          </span>
                                          .
                                        </p>
                                        <p
                                          className={
                                            Styles.RequestVerificationText
                                          }
                                          onClick={async () => {
                                            setRequestVerEmailState(null);
                                            setLoadingRequest(true);
                                            var sendEmailVerificationEmailResult =
                                              await sendEmailVerificationEmail();

                                            if (
                                              sendEmailVerificationEmailResult.ok
                                            ) {
                                              setLoadingRequest(false);
                                              setRequestVerEmailState({
                                                ok: true,
                                              });
                                            } else {
                                              setLoadingRequest(false);
                                              setRequestVerEmailState({
                                                ok: false,
                                              });
                                            }
                                          }}
                                          style={{
                                            fontWeight: "500",
                                            color: "blue",
                                            margin: "auto",
                                            textAlign: "center",
                                            fontSize: "16px",
                                            marginBottom: "10px",
                                          }}
                                        >
                                          {" "}
                                          Request Verification Email
                                        </p>
                                        {loadingRequest && (
                                          <div
                                            style={{
                                              alignContent: "center",
                                              display: "flex",
                                            }}
                                          >
                                            <CircularProgress
                                              size={20}
                                              style={{ margin: "0px auto" }}
                                            />
                                          </div>
                                        )}
                                        {requestVerEmailState &&
                                          (requestVerEmailState.ok ? (
                                            <p
                                              style={{
                                                fontWeight: "400",
                                                color: "green",
                                                margin: "auto",
                                                textAlign: "center",
                                                fontSize: "18px",
                                                marginBottom: "0px",
                                              }}
                                            >
                                              {" "}
                                              Sent
                                            </p>
                                          ) : (
                                            <p
                                              style={{
                                                fontWeight: "400",
                                                color: "red",
                                                margin: "auto",
                                                textAlign: "center",
                                                fontSize: "18px",
                                                marginBottom: "0px",
                                              }}
                                            >
                                              {" "}
                                              Failed
                                            </p>
                                          ))}
                                      </div>
                                    </>
                                  )}
                                  <CustomButton
                                    label="Continue Shopping"
                                    styles={{
                                      backgroundColor: "#38CCCC",
                                      margin: "20px auto",
                                      width: "80%",
                                      textAlign: "center",
                                    }}
                                    onClick={() => {
                                      history.push("/");
                                    }}
                                  />
                                </div>
                              </div>
                            ) : (
                              <div className={Styles.EmptyCartBanner}>
                                <p>Your shopping cart is empty.</p>
                                <CustomButton
                                  label="Continue Shopping"
                                  styles={{
                                    backgroundColor: "#38CCCC",
                                    margin: "20px auto",

                                    textAlign: "center",
                                  }}
                                  onClick={() => {
                                    history.push("/");
                                  }}
                                />
                              </div>
                            ))}
                        </div>
                      ) : (
                        <div className={Styles.EmptyCartBanner}>
                          <span
                            class="material-icons"
                            style={{ color: "red", fontSize: "45px" }}
                          >
                            error
                          </span>
                          <p>{shoppingCart.error}</p>
                        </div>
                      )}
                    </div>
                  )}
                </>
              )}
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default ShoppingCartPage;

//the div rendered when cart is empty
function emptyCard() {
  return <div>Empty Cart</div>;
}
