import React from "react";
import { sendEmailVerificationEmail } from "../../services/authentication.js";
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

import { CircularProgress, LinearProgress } from "@material-ui/core";
import CustomButton from "../general/Button.js";
import Styles from "./ShippingPage.module.css";
import EditShippingAddress from "./EditShippingAddress.js";
import ShippingAddressLine from "../shippingAddress/ShippingAddressLine.js";

import {
  createNewShippingAddress,
  getShippingAddresses,
  deleteShippingAddress,
} from "../../api/shipping.js";
import { postOrder } from "../../api/orders.js";

import { validateAddressSelected } from "../../services/inputValidation.js";
import BoxSelector from "../general/BoxSelector.js";
function ShippingPage() {
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

  //Addresses
  var [userAddresses, setUserAddresses] = React.useState(null);
  var [loadingAddresses, setLoadingAddresses] = React.useState(true);
  var [errorAddresses, setErrorAddresses] = React.useState(null);

  //Selected Address
  var [selectedAddress, setSelectedAddress] = React.useState(null);

  //State
  var [stateLoading, setStateLoading] = React.useState(false);
  var [actionState, setActionState] = React.useState(null);

  //Place Order State
  var [placeOrderError, setPlaceOrderError] = React.useState(null);
  var [placeOrderLoading, setPlaceOrderLoading] = React.useState(true);

  //Place Order State
  var [placeOrderValidation, setPlaceOrderValidation] = React.useState(null);

  // Show Add/Edit Address
  var [showEditAddress, setShowEditAddress] = React.useState(false);
  var [newMode, setNewMode] = React.useState(true);
  var [editAddress, setEditAddress] = React.useState(true);

  React.useEffect(() => {
    dispatch(getUserCart());
    getAddresses();
  }, []);

  function generateTaxAmount() {
    var totalTax = 0;
    shoppingCart.cart.cart.forEach((item) => {
      if (item.available) {
        totalTax = totalTax + item.sellingPrice * 0.15 * item.quantity;
      }
    });
    return totalTax;
  }

  function generateTotalCost() {
    var totalCost = 0;
    shoppingCart.cart.cart.forEach((item) => {
      if (item.available) {
        totalCost = totalCost + item.sellingPrice * item.quantity;
      }
    });
    totalCost = totalCost + shoppingCart.cart.cartDeliveryCharge;

    return totalCost;
  }

  async function addNewShippingAddress(
    addressName,
    firstName,
    lastName,
    addressLineOne,
    addressLineTwo,
    city,
    province,
    country,
    zipCode,
    contactNumber
  ) {
    // pass in the parameters needed to create an address object in the backend
    var createNewAddressResult = await createNewShippingAddress(
      addressName,
      firstName,
      lastName,
      addressLineOne,
      addressLineTwo,
      city,
      province,
      country,
      zipCode,
      contactNumber
    );

    //confirm if it was a success
    if (createNewAddressResult.ok) {
      console.log("Worked");
      console.log(createNewAddressResult);
    } else {
      // sign it failed
      console.log("Failed");
      console.log(createNewAddressResult);
    }
  }

  async function getAddresses() {
    setSelectedAddress(null);
    setPlaceOrderLoading(true);
    setLoadingAddresses(true);

    setUserAddresses(null);
    setErrorAddresses(null);

    var getShippingAddressesResult = await getShippingAddresses();

    if (getShippingAddressesResult.ok) {
      setLoadingAddresses(false);
      setPlaceOrderLoading(false);
      setUserAddresses(getShippingAddressesResult.data);
    } else {
      setLoadingAddresses(false);
      setPlaceOrderLoading(false);
      setErrorAddresses(getShippingAddressesResult);
    }
  }

  async function validatePaceOrderRequest() {
    var validateAddressSelectedResult = await validateAddressSelected(
      selectedAddress
    );

    if (validateAddressSelectedResult.ok) {
      setPlaceOrderValidation(null);
      return true;
    } else {
      setPlaceOrderValidation(validateAddressSelectedResult.message);
      return false;
    }
  }

  async function selectAddress(addressId) {
    setPlaceOrderValidation(null);
    setSelectedAddress(addressId);

    var validateAddressSelectedResult = await validateAddressSelected(
      addressId
    );

    if (!validateAddressSelectedResult.ok) {
      setActionState(validateAddressSelectedResult.ok);
    } else {
      setActionState(null);
    }
  }

  //function deletes an one specified address from the user's account based on its address id
  async function deleteAddress(address_id) {
    setStateLoading(true);
    setActionState(null);
    // get the select address from the user and send the id to the backend
    var deleteShippingAddressResult = await deleteShippingAddress(address_id);
    // unit testing by confirm if it was a success
    if (deleteShippingAddressResult.ok) {
      setActionState(deleteShippingAddressResult);
      setStateLoading(false);
      // Remove the State Message
      setTimeout(() => {
        setActionState(null);
        getAddresses();
      }, 500);
    } else {
      //unit testing by confirm if it was a success
      setActionState(deleteShippingAddressResult);
      setStateLoading(false);
      // Remove the State Message
      setTimeout(() => {
        setActionState(null);
      }, 500);
    }
  }

  async function createOrder() {
    setPlaceOrderLoading(true);
    setPlaceOrderError(null);
    setUserAddresses(null);
    var postOrderResult = await postOrder(selectedAddress);

    if (postOrderResult.ok) {
      history.push({
        pathname: "/billing",
        state: {
          orderId: postOrderResult.id,
        },
      });

      dispatch(getUserCart());
    } else {
      setPlaceOrderLoading(false);
      setPlaceOrderError(postOrderResult);
    }
  }

  function switchMode(mode) {
    switch (mode.mode) {
      case "new":
        setNewMode(true);
        setShowEditAddress(true);
        break;
      case "edit":
        setNewMode(false);
        setEditAddress(mode.id);
        setShowEditAddress(true);

        break;
      case "hide":
        setNewMode(true);
        setEditAddress(null);
        setShowEditAddress(false);
        getAddresses();
        break;

      default:
        setNewMode(true);
        setEditAddress(null);
        setShowEditAddress(false);
        getAddresses();
    }
  }

  return (
    <div>
      <Breadcrumb style={{ margin: "20px" }}>
        <Breadcrumb.Item>
          <Link to="/">Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to="/cart">Shopping Cart</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item active>Shipping Address</Breadcrumb.Item>
      </Breadcrumb>

      {placeOrderLoading ? (
        <div className={Styles.LoadingBox}>
          <CircularProgress size={150} />
        </div>
      ) : (
        <>
          {placeOrderError && (
            <div className={Styles.ErrorBox}>
              <div className={Styles.InnerErrorBox}>
                <span class="material-icons">error</span>
              </div>
              <div className={Styles.InnerErrorBox}>
                <p>{placeOrderError.message}</p>
              </div>
            </div>
          )}
          {userAddresses && (
            <Container className={Styles.container}>
              <Row>
                <Col xs={12} md={8}>
                  {showEditAddress ? (
                    <EditShippingAddress
                      newMode={newMode}
                      editAddress={editAddress}
                      switchMode={switchMode}
                    />
                  ) : (
                    <Card>
                      <Card.Header className={Styles.Name}>
                        Select a shipping address
                        <span class="material-icons">arrow_drop_down</span>
                        {stateLoading ? (
                          <div
                            style={{
                              marginLeft: "auto",
                              display: "flex",
                              justifyContent: "left",
                              alignItems: "center",
                            }}
                          >
                            <CircularProgress size={25} />
                          </div>
                        ) : (
                          <>
                            {actionState ? (
                              <>
                                {actionState.ok ? (
                                  <p className={Styles.StateMessageSuccess}>
                                    {actionState.message}
                                  </p>
                                ) : (
                                  <p className={Styles.StateMessageError}>
                                    {actionState.message}
                                  </p>
                                )}
                              </>
                            ) : (
                              <></>
                            )}
                          </>
                        )}
                      </Card.Header>

                      {loadingAddresses && <LinearProgress />}

                      {userAddresses &&
                        userAddresses.map((address) => {
                          return (
                            <ShippingAddressLine
                              key={address._id}
                              selected={address._id === selectedAddress}
                              id={address._id}
                              addressName={address.addressName}
                              name={address.firstName + " " + address.lastName}
                              addressLineOne={address.addressLineOne}
                              addressLineTwo={address.addressLineTwo}
                              city={address.city}
                              province={address.province}
                              country={address.country}
                              zipCode={address.zipCode}
                              contactNumber={address.contactNumber}
                              deleteAddress={deleteAddress}
                              selectAddress={selectAddress}
                              showEditAddress={switchMode}
                            />
                          );
                        })}
                      {errorAddresses && <p>{errorAddresses.message}</p>}
                      <CustomButton
                        label="Add New Address"
                        styles={{
                          backgroundColor: "#38CCCC",
                          margin: "20px auto",

                          textAlign: "center",
                        }}
                        onClick={() => {
                          switchMode({ mode: "new" });
                        }}
                      />
                    </Card>
                  )}
                </Col>

                {/* Summary detail card component */}
                <Col xs={6} md={4}>
                  <Card className="cardStyle">
                    <Card.Header className={Styles.Name}>
                      {" "}
                      Cart Summary
                    </Card.Header>

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
                                              className={
                                                Styles.SummaryItemLabel
                                              }
                                            >
                                              {" "}
                                              <p>
                                                Price (
                                                {shoppingCart.cart.cartCount}{" "}
                                                Items):{" "}
                                              </p>
                                            </Col>
                                            {/* <Col xl={1} /> */}
                                            <Col
                                              xl={6}
                                              className={
                                                Styles.SummaryCostValue
                                              }
                                            >
                                              {formatter.format(
                                                generateTotalCost() -
                                                  generateTaxAmount() -
                                                  shoppingCart.cart
                                                    .cartDeliveryCharge
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
                                              className={
                                                Styles.SummaryItemLabel
                                              }
                                            >
                                              {" "}
                                              <p>Tax Amount: </p>{" "}
                                            </Col>

                                            <Col
                                              xl={6}
                                              className={
                                                Styles.SummaryCostValue
                                              }
                                            >
                                              {formatter.format(
                                                generateTaxAmount()
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
                                              className={
                                                Styles.SummaryItemLabel
                                              }
                                            >
                                              {" "}
                                              <p>Delivery Charge: </p>{" "}
                                            </Col>

                                            <Col
                                              xl={6}
                                              className={
                                                Styles.SummaryCostValue
                                              }
                                            >
                                              {formatter.format(
                                                shoppingCart.cart
                                                  .cartDeliveryCharge
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
                                              className={
                                                Styles.SummaryItemLabel
                                              }
                                            >
                                              <p>Total Amount: </p>
                                            </Col>

                                            <Col
                                              xl={8}
                                              className={
                                                Styles.SummaryCostValue
                                              }
                                              style={{
                                                fontSize: "23px",
                                                fontWeight: "500",
                                              }}
                                            >
                                              {formatter.format(
                                                generateTotalCost()
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
                                          <div
                                            className={Styles.VerifiyEmailBox}
                                          >
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
                                              <span
                                                style={{ fontWeight: "500" }}
                                              >
                                                place{" "}
                                              </span>
                                              an{" "}
                                              <span
                                                style={{ fontWeight: "500" }}
                                              >
                                                order
                                              </span>
                                              .
                                            </p>
                                          </div>
                                        ) : authState.emailVerified ? (
                                          <>
                                            {placeOrderValidation && (
                                              <div
                                                className={
                                                  Styles.CartNotFullAvailable
                                                }
                                              >
                                                {" "}
                                                <p>{placeOrderValidation}</p>
                                              </div>
                                            )}
                                            <CustomButton
                                              label="Place Order"
                                              styles={{
                                                backgroundColor: "#18723A",
                                                color: "white",
                                                margin: "10px auto",
                                                width: "80%",
                                                textAlign: "center",
                                              }}
                                              onClick={async () => {
                                                //place Order
                                                var result =
                                                  await validatePaceOrderRequest();

                                                if (result) {
                                                  createOrder();
                                                }
                                              }}
                                            />
                                          </>
                                        ) : (
                                          <>
                                            <div
                                              className={Styles.VerifiyEmailBox}
                                            >
                                              <p
                                                style={{
                                                  margin: "auto",
                                                  textAlign: "center",
                                                  fontSize: "16px",
                                                  marginBottom: "10px",
                                                }}
                                              >
                                                Please
                                                <span
                                                  style={{ fontWeight: "500" }}
                                                >
                                                  {" "}
                                                  verify your email address{" "}
                                                </span>
                                                to
                                                <span
                                                  style={{ fontWeight: "500" }}
                                                >
                                                  {" "}
                                                  place{" "}
                                                </span>
                                                an
                                                <span
                                                  style={{ fontWeight: "500" }}
                                                >
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
                                                    style={{
                                                      margin: "0px auto",
                                                    }}
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
          )}
        </>
      )}
    </div>
  );
}

export default ShippingPage;
