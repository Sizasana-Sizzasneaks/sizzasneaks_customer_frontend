import React from "react";
import { useHistory, Link } from "react-router-dom";
import { sendEmailVerificationEmail } from "../../services/authentication.js";
import { useSelector, useDispatch } from "react-redux";

import { CircularProgress } from "@material-ui/core";
import CustomButton from "../general/Button.js";
import BoxSelector from "../general/BoxSelector.js";
import InputField from "../general/InputField.js";
import InputTextArea from "../general/InputField.js";
import {
  Card,
  Row,
  Col,
  Container,
  Breadcrumb,
  ListGroup,
} from "react-bootstrap";

import {
  validateBasicString,
  validateName,
  validateDeliveryInstructionString,
} from "../../services/inputValidation.js";
import * as InputValidation from "../../services/inputValidation.js";

import {
  createNewShippingAddress,
  getShippingAddressById,
  updateShippingAddressById,
  getShippingAddresses,
  deleteShippingAddress,
} from "../../api/shipping.js";

import Styles from "./ShippingPage.module.css";
import { array } from "yup/lib/locale";

function ShippingPage(props) {
  var formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "ZAR",
  });

  const authState = useSelector((state) => state.firebase.auth);
  const history = useHistory();
  const shoppingCart = useSelector((state) => state.cart);

  // const userProfile=useSelector((state)=>state.profile);
  // var addressId=getShippingAddressById();

  var [loadingRequest, setLoadingRequest] = React.useState(false);
  var [requestVerEmailState, setRequestVerEmailState] = React.useState(null);

  //state manage of the form input fields
  var [firstName, setFirstName] = React.useState("");
  var [lastName, setLastName] = React.useState("");
  var [addressName, setAddressName] = React.useState("");
  var [addressLineOne, setAddressLineOne] = React.useState("");
  var [addressLineTwo, setAddressLineTwo] = React.useState("");
  var [country, setCountry] = React.useState("");
  var [city, setCity] = React.useState("");
  var [province, setProvince] = React.useState("");
  var [zipCode, setZipCode] = React.useState(null);
  var [contactNumber, setContactNumber] = React.useState("");
  var [deliveryInstruction, setDeliveryInstruction] = React.useState("");

  //input Validation Error
  var [errorFirstName, setErrorFirstName] = React.useState(null);
  var [errorLastName, setErrorLastName] = React.useState(null);
  var [errorAddressName, setErrorAddressName] = React.useState(null);
  var [errorAddressLineOne, setErrorAddressLineOne] = React.useState(null);
  var [errorAddressLineTwo, setErrorAddressLineTwo] = React.useState(null);
  var [errorCountry, setErrorCountry] = React.useState(null);
  var [errorCity, setErrorCity] = React.useState(null);
  var [errorProvince, setErrorProvince] = React.useState(null);
  var [errorZipCode, setErrorZipCode] = React.useState(null);
  var [errorContactNumber, setErrorContactNumber] = React.useState(null);
  var [errorDeliveryInstruction, setErrorDeliveryInstruction] =
    React.useState(null);

  //Addresses
  var [userAddresses, setUserAddresses] = React.useState(null);

  var [formValid, setFormValid] = React.useState(false);
  var [shippingState, setShippingState] = React.useState(false);
  var [addressState, addressState] = React.useState();
  var [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    // function used when user clicks submit button when
    // creating/adding a new shipping address
    // retrieveShippingAddress("61433e978cffb44990a602b5");
    //updateAddress();
    getAddresses();
    // addNewShippingAddress();
    //deleteAddress();
  }, []);

  async function checkFormFieldsValidity() {
    //Check FirstName
    var firstNameValidationResult = await InputValidation.validateName(
      firstName
    );
    await setErrorFirstName(firstNameValidationResult);

    //Check Last Name
    var lastNameValidationResult = await InputValidation.validateName(lastName);
    await setErrorLastName(lastNameValidationResult);

    //Check addressName
    var addressNameValidationResult = await InputValidation.validateBasicString(
      addressName
    );
    await setErrorAddressName(addressNameValidationResult);

    //Check addressLineOne
    var addressLineOneValidationResult =
      await InputValidation.validateBasicString(addressLineOne);
    await setErrorAddressLineOne(addressLineOneValidationResult);

    //Check AddressLineTwo
    var addressLineTwoValidationResult =
      await InputValidation.validateBasicString(addressLineTwo);
    await setErrorAddressLineTwo(addressLineTwoValidationResult);

    //Check country
    var countryValidationResult = await InputValidation.validateName(country);
    await setErrorCountry(countryValidationResult);

    //Check City
    var cityValidationResult = await InputValidation.validateName(city);
    await setErrorCity(cityValidationResult);

    //Check province
    var provinceValidationResult = await InputValidation.validateName(province);
    await setErrorProvince(provinceValidationResult);

    //Check zipCode
    var zipCodeValidationResult = await InputValidation.validateZipCode(
      zipCode
    );
    await setErrorZipCode(zipCodeValidationResult);

    //Check contact Number
    var contactNumberValidationResult =
      await InputValidation.validateMobileNumber(contactNumber);
    await setErrorContactNumber(contactNumberValidationResult);

    //Check contact Number
    var deliveryInstructionValidationResult =
      await InputValidation.validateDeliveryInstructionString(
        deliveryInstruction
      );
    await setErrorDeliveryInstruction(deliveryInstructionValidationResult);

    return { ok: true };
  }

  function checkFormValidity() {
    if (
      errorFirstName && //if all the fields are provided only then proceed to next if statemen
      errorLastName &&
      errorAddressName &&
      errorAddressLineOne &&
      errorAddressLineTwo &&
      errorCountry &&
      errorCity &&
      errorProvince &&
      errorZipCode &&
      errorContactNumber &&
      errorDeliveryInstruction
    ) {
      if (
        errorFirstName.valid === true && //this checks if all the information provided is in right format
        errorLastName.valid === true &&
        errorAddressName.valid === true &&
        errorAddressLineOne.valid === true &&
        errorAddressLineTwo.valid === true &&
        errorCountry.valid === true &&
        errorCity.valid === true &&
        errorProvince.valid === true &&
        errorZipCode.valid === true &&
        errorContactNumber.valid === true &&
        errorDeliveryInstruction.valid === true
      ) {
        setFormValid(true);
        return true; //if everything is fine then setFormValid is set to true otherwise false
      } else {
        setFormValid(false);
        return false;
      }
    } else {
      setFormValid(false);
      return false; //setFormValid is set false all the info in not provided
    }
  }
  async function updateAddress(
    addressID,
    addressName,
    addressLineOne,
    addressLineTwo,
    city,
    province,
    country,
    zipCode,
    contactNumber
  ) {
    var addressId = addressID;
    var addressData = {
      addressName: addressName,
      addressLineOne: addressLineOne,
      addressLineTwo: addressLineTwo,
      city: city,
      province: province,
      country: country,
      zipCode: zipCode,
      contactNumber: contactNumber,
    };

    var updateShippingAddressByIdResult = await updateShippingAddressById(
      addressId,
      addressData
    );
    if (updateShippingAddressByIdResult.ok) {
      console.log("Worked");
      console.log(updateShippingAddressByIdResult);
    } else {
      console.log("Failed");
      console.log(updateShippingAddressByIdResult);
    }
  }
  //"Res Address 3""145 Peter Rd""Ruimsig, Roodepoort""Johannesburg""Gauteng""South Africa""5674""0743018891"
  async function addNewShippingAddress(
    addressNAme,
    addressLineONe,
    addressLineTWo,
    citY,
    provinces,
    countrY,
    zipCodes,
    contactNumbers
  ) {
    var addressName = addressNAme;
    var addressLineOne = addressLineONe;
    var addressLineTwo = addressLineTWo;
    var city = citY;
    var province = provinces;
    var country = countrY;
    var zipCode = zipCodes;
    var contactNumber = contactNumbers;

    // pass in the parameters needed to create an address object in the backend
    var createNewAddressResult = await createNewShippingAddress(
      addressName,
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

  //function deletes an one specified address from the user's account based on its address id
  async function deleteAddress() {
    // get the select address from the user and send the id to the backend
    var address_id = "61447d1a0177213640efdf07";
    var deleteShippingAddressResult = await deleteShippingAddress(address_id);
    // unit testing by confirm if it was a success
    if (deleteShippingAddressResult.ok) {
      console.log("Delete worked");
      console.log(deleteShippingAddressResult);
    } else {
      //unit testing by confirm if it was a success
      console.log("Delete failed");
      console.log(deleteShippingAddressResult);
    }
  }
  // function gets users stored shipping address
  async function retrieveShippingAddress(addressId) {
    if (typeof addressId !== typeof undefined && addressId !== null) {
      var getShippingAddressByIdResult = await getShippingAddressById(
        addressId
      );

      if (getShippingAddressByIdResult.ok) {
        console.log("Worked");
        console.log(getShippingAddressByIdResult);
      } else {
        console.log("Failed");
        console.log(getShippingAddressByIdResult);
      }
    }
  }

  async function getAddresses() {
    var getShippingAddressesResult = await getShippingAddresses();

    if (getShippingAddressesResult.ok) {
      console.log("Worked");
      console.log(getShippingAddressesResult);
      setUserAddresses(getShippingAddressesResult.data);
    } else {
      console.log("Failed");
      console.log(getShippingAddressesResult);
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

      <Container className={Styles.container}>
        <Row>
          <Col xs={12} md={8}>
            <Card>
              <Card.Header className={Styles.Name}>
                {" "}
                Place Order-Shipping
              </Card.Header>
              {/* if at least one address is found, get user address */}
              <Col>
                <BoxSelector label="Address 1" />
              </Col>
              {/* Address data column  */}
              <Container>
                <Row
                  xs="2"
                  style={{
                    margin: "10px auto 50px",
                    padding: "0px 40px",
                  }}
                >
                  <Col>
                    <InputField
                      label="First Name"
                      value={firstName}
                      onChange={async (value) => {
                        if (typeof setFirstName !== "undefined") {
                          setFirstName(value);
                        }
                      }}
                      onBlur={async (value) => {
                        if (typeof setFirstNameError !== "undefined") {
                          var firstNameCheck = await validateName(value);
                          setErrorFirstName(firstNameCheck);
                        }
                      }}
                      error={errorFirstName}
                    />
                  </Col>
                  <Col>
                    <InputField
                      label="Last Name"
                      value={lastName}
                      onChange={async (value) => {
                        if (typeof setLastName !== "undefined") {
                          setLastName(value);
                        }
                      }}
                      onBlur={async (value) => {
                        if (typeof setLastNameError !== "undefined") {
                          var lastNameCheck = await validateName(value);
                          setErrorLastName(lastNameCheck);
                        }
                      }}
                      error={errorLastName}
                    />
                  </Col>
                  <Col>
                    <InputField
                      label="Address Name"
                      value={addressName}
                      onChange={async (value) => {
                        if (typeof setAddressName !== "undefined") {
                          setAddressName(value);
                        }
                      }}
                      onBlur={async (value) => {
                        if (typeof setErrorAddressName !== "undefined") {
                          var addressNameCheck = await validateBasicString(
                            value
                          );
                          setErrorAddressName(addressNameCheck);
                        }
                      }}
                      error={errorAddressName}
                    />
                  </Col>
                  <Col>
                    <InputField
                      label="Address Line One"
                      placeholder="Street Name"
                      value={addressLineOne}
                      onChange={async (value) => {
                        if (typeof setAddressLineOne !== "undefined") {
                          setAddressLineOne(value);
                        }
                      }}
                      onBlur={async (value) => {
                        if (typeof setErrorAddressLineOne !== "undefined") {
                          var addressLineOneCheck = await validateBasicString(
                            value
                          );
                          setErrorAddressLineOne(addressLineOneCheck);
                        }
                      }}
                      error={errorAddressLineOne}
                    />
                  </Col>
                  <Col>
                    <InputField
                      label="Address Line Two"
                      placeholder="suburb"
                      value={addressLineTwo}
                      onChange={async (value) => {
                        if (typeof setAddressLineTwo !== "undefined") {
                          setAddressLineTwo(value);
                        }
                      }}
                      onBlur={async (value) => {
                        if (typeof setErrorAddressLineTwo !== "undefined") {
                          var addressLineTwoCheck = await validateBasicString(
                            value
                          );
                          setErrorAddressLineTwo(addressLineTwoCheck);
                        }
                      }}
                      error={errorAddressLineTwo}
                    />
                  </Col>
                  <Col>
                    <InputField
                      label="Country"
                      value={country}
                      onChange={async (value) => {
                        if (typeof setCountry !== "undefined") {
                          setCountry(value);
                        }
                      }}
                      onBlur={async (value) => {
                        if (typeof setErrorCountry !== "undefined") {
                          var countryCheck = await validateName(value);
                          setErrorCountry(countryCheck);
                        }
                      }}
                      error={errorCountry}
                    />
                  </Col>
                  <Col>
                    <InputField
                      label="City"
                      value={city}
                      onChange={async (value) => {
                        if (typeof setCity !== "undefined") {
                          setCity(value);
                        }
                      }}
                      onBlur={async (value) => {
                        if (typeof setErrorCity !== "undefined") {
                          var cityCheck = await validateName(value);
                          setErrorCity(cityCheck);
                        }
                      }}
                      error={errorCity}
                    />
                  </Col>
                  <Col>
                    <InputField
                      label="Province/State"
                      value={province}
                      onChange={async (value) => {
                        if (typeof setProvince !== "undefined") {
                          setProvince(value);
                        }
                      }}
                      onBlur={async (value) => {
                        if (typeof setErrorProvince !== "undefined") {
                          var provinceStateCheck = await validateName(value);
                          setErrorProvince(provinceStateCheck);
                        }
                      }}
                      error={errorProvince}
                    />
                  </Col>
                  <Col>
                    <InputField
                      label="Zip Code"
                      value={zipCode}
                      onChange={async (value) => {
                        if (typeof setZipCode !== "undefined") {
                          setZipCode(value);
                        }
                      }}
                      onBlur={async (value) => {
                        if (typeof setErrorZipCode !== "undefined") {
                          var zipCheck = await InputValidation.validateZipCode(
                            value
                          );
                          setErrorZipCode(zipCheck);
                        }
                      }}
                      error={errorZipCode}
                    />
                  </Col>
                  <Col>
                    <InputField
                      label="Contact Number"
                      value={contactNumber}
                      onChange={async (value) => {
                        if (typeof setContactNumber !== "undefined") {
                          setContactNumber(value);
                        }
                      }}
                      onBlur={async (value) => {
                        if (typeof setErrorContactNumber !== "undefined") {
                          var contactNumberCheck =
                            await InputValidation.validateMobileNumber(value);
                          setErrorContactNumber(contactNumberCheck);
                        }
                      }}
                      error={errorContactNumber}
                    />
                  </Col>
                </Row>
                <Row
                  style={{
                    margin: "10px auto 0px",
                    backgroundColor: "#FFFFFF",
                    padding: "0px 40px",
                  }}
                >
                  <Col>
                    <InputTextArea
                      entireComponentStyle={{ width: "100%" }}
                      wrapperStyle={{
                        width: "100%",
                        height: "120px",
                      }}
                      inputStyle={{
                        width: "98%",
                      }}
                      label="Delivery Instructions"
                      value={deliveryInstruction}
                      onChange={async (value) => {
                        if (typeof setDeliveryInstruction !== "undefined") {
                          setDeliveryInstruction(value);
                        }
                      }}
                      onBlur={async (value) => {
                        if (
                          typeof setErrorDeliveryInstruction !== "undefined"
                        ) {
                          var deliveryInstructionCheck =
                            await validateDeliveryInstructionString(value);
                          setErrorDeliveryInstruction(deliveryInstructionCheck);
                        }
                      }}
                      error={errorDeliveryInstruction}
                    />
                  </Col>
                </Row>

                <CustomButton
                  label="Add A New Address"
                  styles={{
                    backgroundColor: "#18723A",
                    color: "white",
                    margin: "10px auto",
                    marginTop: "40px",
                    marginBottom: "30px",
                    width: "170px",
                    textAlign: "center",
                    float: "right",
                  }}
                  onClick={async (event) => {
                    await checkFormFieldsValidity();
                    var flag = checkFormValidity();
                    if (flag) {
                      setShippingState(null);
                      setLoading(true);
                      //shippingAddressResult is used to see if the sign was successful
                      var shippingAddressResult = await addNewShippingAddress(
                        addressName,
                        addressLineOne,
                        addressLineTwo,
                        city,
                        province,
                        country,
                        zipCode,
                        contactNumber
                      );
                      setLoading(false);
                      setShippingState(shippingAddressResult);
                      //get address
                      //Push To payment
                      history.push("/");
                    }
                  }}
                />
                <CustomButton
                  label={"Update Address" + addressName}
                  styles={{
                    backgroundColor: "#18723A",
                    color: "white",
                    margin: "10px auto",
                    marginTop: "40px",
                    marginBottom: "30px",
                    marginRight: " 20px",
                    width: "170px",
                    textAlign: "center",
                    float: "right",
                  }}
                  onClick={async (event) => {
                    var addressID = userAddresses[0]._id;
                    console.log(addressID);
                    updateAddress(
                      addressID,
                      addressName,
                      addressLineOne,
                      addressLineTwo,
                      city,
                      province,
                      country,
                      zipCode,
                      contactNumber
                    );
                  }}
                />
              </Container>
            </Card>
          </Col>

          <Col xs={6} md={4}>
            <Card className="cardStyle">
              <Card.Header className={Styles.Name}> Summary</Card.Header>
              <ListGroup variant="flush">
                <ListGroup.Item className={Styles.SingleLineItem}>
                  <Row>
                    {/* <Col xl={6} className={Styles.SummaryItemLabel}> Not needed</Col> */}
                    <Col>
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
                                                <p>Total Price: </p>
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
                                                  shoppingCart.cart.cartTotal +
                                                    shoppingCart.cart
                                                      .cartDeliveryCharge
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
                                                  style={{
                                                    fontWeight: "500",
                                                  }}
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
                                                  style={{
                                                    fontWeight: "500",
                                                  }}
                                                >
                                                  log in
                                                </span>{" "}
                                                to{" "}
                                                <span
                                                  style={{
                                                    fontWeight: "500",
                                                  }}
                                                >
                                                  place{" "}
                                                </span>
                                                an{" "}
                                                <span
                                                  style={{
                                                    fontWeight: "500",
                                                  }}
                                                >
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
                                                //Push To payment
                                                history.push("/");
                                              }}
                                            />
                                          ) : (
                                            <>
                                              <div
                                                className={
                                                  Styles.VerifiyEmailBox
                                                }
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
                                                    style={{
                                                      fontWeight: "500",
                                                    }}
                                                  >
                                                    {" "}
                                                    verify your email address{" "}
                                                  </span>
                                                  to
                                                  <span
                                                    style={{
                                                      fontWeight: "500",
                                                    }}
                                                  >
                                                    {" "}
                                                    place{" "}
                                                  </span>
                                                  an
                                                  <span
                                                    style={{
                                                      fontWeight: "500",
                                                    }}
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
                                                    setRequestVerEmailState(
                                                      null
                                                    );
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
                    </Col>
                  </Row>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default ShippingPage;
