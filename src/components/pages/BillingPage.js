import React from "react";
import Styles from "./BillingPage.module.css";
import {
  Card,
  Row,
  Col,
  Container,
  Breadcrumb,
  ListGroup,
} from "react-bootstrap";
import InputField from "../general/InputField.js";
import InputCheckbox from "../general/InputCheckbox";
import CustomButton from "../general/Button.js";
import { Link, useLocation, useHistory } from "react-router-dom";
import { CircularProgress } from "@material-ui/core";

import { getOrder, orderPayment } from "../../api/orders.js";

import {
  validateBasicString,
  validateAddressName,
  validateLocationName,
  validateZipCode,
  validateExpiryMonth,
  validateExpiryYear,
  validateCvv,
  validateCardNumber,
} from "../../services/inputValidation.js";

function BillingPage(props) {
  var formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "ZAR",
  });
  const location = useLocation();
  const history = useHistory();

  //Start
  const initialRun = React.useRef(true);

  var [order, setOrder] = React.useState(null);
  var [loadingOrder, setLoadingOrder] = React.useState(true);

  var [paymentCompleteSuccess, setPaymentCompleteSuccess] =
    React.useState(null);
  var [paymentCompleteError, setPaymentCompleteError] = React.useState(null);

  //Billing Address Info
  var [firstName, setFirstName] = React.useState("");
  var [lastName, setLastName] = React.useState("");
  var [addressLineOne, setAddressLineOne] = React.useState("");
  var [addressLineTwo, setAddressLineTwo] = React.useState("");
  var [country, setCountry] = React.useState("");
  var [city, setCity] = React.useState("");
  var [province, setProvince] = React.useState("");
  var [zipCode, setZipCode] = React.useState(null);

  var [cardNumber, setCardNumber] = React.useState("");
  var [cardHolderName, setCardHolerName] = React.useState("");
  var [cardExpiryMonth, setCardExpiryMonth] = React.useState(null);
  var [cardExpiryYear, setCardExpiryYear] = React.useState(null);
  var [cardCvv, setCardCvv] = React.useState(null);

  //Same Shipping address
  var [useShippingAddress, setUseShippingAddress] = React.useState(false);

  //Input Validation
  var [errorFirstName, setErrorFirstName] = React.useState(null);
  var [errorLastName, setErrorLastName] = React.useState(null);
  var [errorAddressLineOne, setErrorAddressLineOne] = React.useState(null);
  var [errorAddressLineTwo, setErrorAddressLineTwo] = React.useState(null);
  var [errorCountry, setErrorCountry] = React.useState(null);
  var [errorCity, setErrorCity] = React.useState(null);
  var [errorProvince, setErrorProvince] = React.useState(null);
  var [errorZipCode, setErrorZipCode] = React.useState(null);

  var [cardNumberError, setCardNumberError] = React.useState(null);
  var [cardHolderNameError, setCardHolerNameError] = React.useState(null);
  var [cardExpiryMonthError, setCardExpiryMonthError] = React.useState(null);
  var [cardExpiryYearError, setCardExpiryYearError] = React.useState(null);
  var [cardCvvError, setCardCvvError] = React.useState(null);

  //Form Valid
  var [formValid, setFormValid] = React.useState(false);

  React.useEffect(() => {
    if (initialRun.current) {
      if (
        typeof location.state !== "undefined" &&
        typeof location.state.orderId !== "undefined"
      ) {
        retrieveOrder(location.state.orderId);
      } else {
        setTimeout(() => {
          history.goBack();
        }, 1000);
      }
      initialRun.current = false;
    }
    //Must run every time After the initial run

    checkFullForm();
  }, [
    errorFirstName,
    errorLastName,
    errorAddressLineOne,
    errorAddressLineTwo,
    errorCountry,
    errorCity,
    errorProvince,
    errorZipCode,
    cardNumberError,
    cardHolderNameError,
    cardExpiryMonthError,
    cardExpiryYearError,
    cardCvvError,
  ]);

  async function checkInputFields() {
    try {
      //Check FirstName
      var firstNameValidationResult = await validateAddressName(firstName);
      await setErrorFirstName(firstNameValidationResult);

      //Check Last Name
      var lastNameValidationResult = await validateAddressName(lastName);
      await setErrorLastName(lastNameValidationResult);

      //Check addressLineOne
      var addressLineOneValidationResult = await validateBasicString(
        addressLineOne
      );
      await setErrorAddressLineOne(addressLineOneValidationResult);

      //Check AddressLineTwo
      var addressLineTwoValidationResult = await validateBasicString(
        addressLineTwo
      );
      await setErrorAddressLineTwo(addressLineTwoValidationResult);

      //Check country
      var countryValidationResult = await validateLocationName(country);
      await setErrorCountry(countryValidationResult);

      //Check City
      var cityValidationResult = await validateLocationName(city);
      await setErrorCity(cityValidationResult);

      //Check province
      var provinceValidationResult = await validateLocationName(province);
      await setErrorProvince(provinceValidationResult);

      //Check zipCode
      var zipCodeValidationResult = await validateZipCode(zipCode);
      await setErrorZipCode(zipCodeValidationResult);

      //Check Card Number
      var cardNumberCheck = await validateCardNumber(cardNumber);
      await setCardNumberError(cardNumberCheck);

      //Check CardHolder Name
      var cardHolderNameCheck = await validateAddressName(cardHolderName);
      await setCardHolerNameError(cardHolderNameCheck);

      //Check Expiry Month
      var expiryMonthCheck = await validateExpiryMonth(cardExpiryMonth);
      await setCardExpiryMonthError(expiryMonthCheck);

      //Check Expiry Year
      var yearCheck = await validateExpiryYear(cardExpiryYear);
      await setCardExpiryYearError(yearCheck);

      //Check CVV
      var expiryCvv = await validateCvv(cardCvv);
      await setCardCvvError(expiryCvv);

      return { ok: true };
    } catch {
      return { ok: false };
    }
  }

  function checkFullForm() {
    if (
      errorFirstName && //if all the fields are provided only then proceed to next if statemen
      errorLastName &&
      errorAddressLineOne &&
      errorAddressLineTwo &&
      errorCountry &&
      errorCity &&
      errorProvince &&
      errorZipCode &&
      cardNumberError &&
      cardHolderNameError &&
      cardExpiryMonthError &&
      cardExpiryYearError &&
      cardCvvError
    ) {
      if (
        errorFirstName.ok && //this checks if all the information provided is in right format
        errorLastName.ok &&
        errorAddressLineOne.ok &&
        errorAddressLineTwo.ok &&
        errorCountry.ok &&
        errorCity.ok &&
        errorProvince.ok &&
        errorZipCode.ok &&
        cardNumberError.ok &&
        cardHolderNameError.ok &&
        cardExpiryMonthError.ok &&
        cardExpiryYearError.ok &&
        cardCvvError.ok
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

  async function payOrder() {
    setLoadingOrder(true);
    setOrder(null);
    setPaymentCompleteError(null);
    setPaymentCompleteSuccess(null);

    var orderPaymentResult = await orderPayment(location.state.orderId, {
      billingAddress: {
        firstName,
        lastName,
        addressLineOne,
        addressLineTwo,
        country,
        city,
        province,
        zipCode,
      },

      cardDetails: {
        cardNumber,
        cardHolderName,
        cardExpiryMonth,
        cardExpiryYear,
        cardCvv,
      },
    });

    setLoadingOrder(false);
    if (orderPaymentResult.ok) {
      setPaymentCompleteSuccess(orderPaymentResult);
    } else {
      setPaymentCompleteError(orderPaymentResult);
    }
  }

  async function retrieveOrder(orderId) {
    setLoadingOrder(true);
    setOrder(null);
    setPaymentCompleteError(null);
    setPaymentCompleteSuccess(null);

    var getOrderResult = await getOrder(orderId);

    if (getOrderResult.ok) {
      setLoadingOrder(false);
      if (getOrderResult.data.paymentComplete) {
        //Display Payment Completed Message
        setPaymentCompleteSuccess({
          ok: true,
          message: "This order has already been paid for.",
        });
      } else {
        setOrder(getOrderResult.data);
      }
    } else {
      history.goBack();
    }
  }

  function generateTaxAmount(order) {
    var totalTax = 0;
    order.orderItems.forEach((element) => {
      totalTax =
        totalTax + element.sellingPriceAmount * 0.15 * element.quantity;
    });
    return totalTax;
  }

  function generateTotalCost(order) {
    var totalCost = 0;
    order.orderItems.forEach((element) => {
      totalCost = totalCost + element.sellingPriceAmount * element.quantity;
    });
    totalCost = totalCost + order.shippingCost;

    return totalCost;
  }

  async function flipUseShippingAddress(value) {
    setUseShippingAddress(value);
    if (value) {
      setFirstName(order.shippingAddress.firstName);
      setLastName(order.shippingAddress.lastName);
      setAddressLineOne(order.shippingAddress.addressLineOne);
      setAddressLineTwo(order.shippingAddress.addressLineTwo);
      setCity(order.shippingAddress.city);
      setCountry(order.shippingAddress.country);
      setProvince(order.shippingAddress.province);
      setZipCode(order.shippingAddress.zipCode);

      var firstNameValidationResult = await validateAddressName(
        order.shippingAddress.firstName
      );
      await setErrorFirstName(firstNameValidationResult);

      //Check Last Name
      var lastNameValidationResult = await validateAddressName(
        order.shippingAddress.lastName
      );
      await setErrorLastName(lastNameValidationResult);

      //Check addressLineOne
      var addressLineOneValidationResult = await validateBasicString(
        order.shippingAddress.addressLineOne
      );
      await setErrorAddressLineOne(addressLineOneValidationResult);

      //Check AddressLineTwo
      var addressLineTwoValidationResult = await validateBasicString(
        order.shippingAddress.addressLineTwo
      );
      await setErrorAddressLineTwo(addressLineTwoValidationResult);

      //Check country
      var countryValidationResult = await validateLocationName(
        order.shippingAddress.country
      );
      await setErrorCountry(countryValidationResult);

      //Check City
      var cityValidationResult = await validateLocationName(
        order.shippingAddress.city
      );
      await setErrorCity(cityValidationResult);

      //Check province
      var provinceValidationResult = await validateLocationName(
        order.shippingAddress.province
      );
      await setErrorProvince(provinceValidationResult);

      //Check zipCode
      var zipCodeValidationResult = await validateZipCode(
        order.shippingAddress.zipCode
      );
      await setErrorZipCode(zipCodeValidationResult);
    } else {
      setFirstName("");
      setLastName("");
      setAddressLineOne("");
      setAddressLineTwo("");
      setCity("");
      setCountry("");
      setProvince("");
      setZipCode(0);

      await setErrorFirstName(null);
      await setErrorLastName(null);
      await setErrorAddressLineOne(null);
      await setErrorAddressLineTwo(null);
      await setErrorCountry(null);
      await setErrorCity(null);
      await setErrorProvince(null);
      await setErrorZipCode(null);
    }
  }

  return (
    <div>
      {" "}
      <Breadcrumb style={{ margin: "20px" }}>
        <Breadcrumb.Item>
          <Link to="/">Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to="/profile">Orders</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item active>Place Order - Billing</Breadcrumb.Item>
      </Breadcrumb>
      {loadingOrder ? (
        <div className={Styles.LoadingBox}>
          <CircularProgress size={150} />
        </div>
      ) : (
        <>
          {paymentCompleteSuccess && (
            <div className={Styles.SuccessBox}>
              <div className={Styles.InnerSuccessBox}>
                <span class="material-icons">check_circle</span>
              </div>
              <div className={Styles.InnerSuccessBox}>
                <p>{paymentCompleteSuccess.message}</p>
              </div>
              <div className={Styles.InnerSuccessBox}>
                <Link to="/profile">View Orders</Link>
              </div>
            </div>
          )}
          {paymentCompleteError && (
            <div className={Styles.ErrorBox}>
              <div className={Styles.InnerErrorBox}>
                <span class="material-icons">error</span>
              </div>
              <div className={Styles.InnerErrorBox}>
                <p>{paymentCompleteError.message}</p>
              </div>
            </div>
          )}

          {order && (
            <Container className={Styles.FullFormBox}>
              <Row>
                <Col xl={8} lg={8} md={12} xs={12} className={Styles.CardCol}>
                  <Card className="cardStyle">
                    <Card.Header className={Styles.Name}>
                      Billing Details
                    </Card.Header>
                    <Row className={Styles.BillingDetailsCardContent}>
                      <Row className={Styles.InputRow}>
                        <p
                          style={{
                            paddingLeft: "0px",
                            marginBottom: "5px",
                            marginTop: "5px",
                            fontWeight: "500",
                          }}
                        >
                          Enter your billing address
                        </p>
                        <hr style={{ marginBottom: "6px" }} />
                      </Row>
                      <Row className={Styles.CheckBoxRow}>
                        <div
                          style={{
                            display: "inline-block",
                            width: "max-content",
                            padding: "0px",
                          }}
                        >
                          <InputCheckbox
                            checked={useShippingAddress}
                            onClick={(value) => {
                              flipUseShippingAddress(value);
                            }}
                          />
                        </div>
                        <div
                          style={{
                            display: "inline-block",
                            width: "max-content",
                            justifyContent: "left",
                            alignItems: "center",
                          }}
                        >
                          {" "}
                          <p
                            style={{ paddingLeft: "0px", marginBottom: "5px" }}
                          >
                            Use shipping address
                          </p>
                        </div>
                      </Row>
                      <Row className={Styles.InputRow}>
                        <Col>
                          <InputField
                            label="First Name"
                            value={firstName}
                            entireComponentStyle={{ width: "100%" }}
                            wrapperStyle={{ width: "95%" }}
                            inputStyle={{ width: "98%" }}
                            onChange={async (value) => {
                              if (typeof setFirstName !== "undefined") {
                                setFirstName(value);
                              }
                              if (typeof setErrorFirstName !== "undefined") {
                                var firstNameCheck = await validateAddressName(
                                  value
                                );
                                setErrorFirstName(firstNameCheck);
                              }
                            }}
                            onBlur={async (value) => {
                              if (typeof setErrorFirstName !== "undefined") {
                                var firstNameCheck = await validateAddressName(
                                  value
                                );
                                setErrorFirstName(firstNameCheck);
                              }
                            }}
                            error={errorFirstName}
                          />
                        </Col>
                        <Col>
                          {" "}
                          <InputField
                            label="Last Name"
                            value={lastName}
                            entireComponentStyle={{ width: "100%" }}
                            wrapperStyle={{ width: "100%" }}
                            inputStyle={{ width: "98%" }}
                            onChange={async (value) => {
                              if (typeof setLastName !== "undefined") {
                                setLastName(value);
                              }
                              if (typeof setErrorLastName !== "undefined") {
                                var lastNameCheck = await validateAddressName(
                                  value
                                );
                                setErrorLastName(lastNameCheck);
                              }
                            }}
                            onBlur={async (value) => {
                              if (typeof setErrorLastName !== "undefined") {
                                var lastNameCheck = await validateAddressName(
                                  value
                                );
                                setErrorLastName(lastNameCheck);
                              }
                            }}
                            error={errorLastName}
                          />
                        </Col>
                      </Row>
                      <Row className={Styles.InputRow}>
                        <Col>
                          {" "}
                          <InputField
                            label="Address Line One"
                            placeholder="Street Name"
                            value={addressLineOne}
                            entireComponentStyle={{ width: "100%" }}
                            wrapperStyle={{ width: "95%" }}
                            inputStyle={{ width: "98%" }}
                            onChange={async (value) => {
                              if (typeof setAddressLineOne !== "undefined") {
                                setAddressLineOne(value);
                              }
                              if (
                                typeof setErrorAddressLineOne !== "undefined"
                              ) {
                                var addressLineOneCheck =
                                  await validateBasicString(value);
                                setErrorAddressLineOne(addressLineOneCheck);
                              }
                            }}
                            onBlur={async (value) => {
                              if (
                                typeof setErrorAddressLineOne !== "undefined"
                              ) {
                                var addressLineOneCheck =
                                  await validateBasicString(value);
                                setErrorAddressLineOne(addressLineOneCheck);
                              }
                            }}
                            error={errorAddressLineOne}
                          />
                        </Col>
                        <Col>
                          <InputField
                            label="Address Line Two"
                            placeholder="Suburb"
                            value={addressLineTwo}
                            entireComponentStyle={{ width: "100%" }}
                            wrapperStyle={{ width: "100%" }}
                            inputStyle={{ width: "98%" }}
                            onChange={async (value) => {
                              if (typeof setAddressLineTwo !== "undefined") {
                                setAddressLineTwo(value);
                              }
                              if (
                                typeof setErrorAddressLineTwo !== "undefined"
                              ) {
                                var addressLineTwoCheck =
                                  await validateBasicString(value);
                                setErrorAddressLineTwo(addressLineTwoCheck);
                              }
                            }}
                            onBlur={async (value) => {
                              if (
                                typeof setErrorAddressLineTwo !== "undefined"
                              ) {
                                var addressLineTwoCheck =
                                  await validateBasicString(value);
                                setErrorAddressLineTwo(addressLineTwoCheck);
                              }
                            }}
                            error={errorAddressLineTwo}
                          />
                        </Col>
                      </Row>
                      <Row className={Styles.InputRow}>
                        <Col>
                          {" "}
                          <InputField
                            label="City"
                            value={city}
                            entireComponentStyle={{ width: "100%" }}
                            wrapperStyle={{ width: "95%" }}
                            inputStyle={{ width: "98%" }}
                            onChange={async (value) => {
                              if (typeof setCity !== "undefined") {
                                setCity(value);
                              }
                              if (typeof setErrorCity !== "undefined") {
                                var cityCheck = await validateLocationName(
                                  value
                                );
                                setErrorCity(cityCheck);
                              }
                            }}
                            onBlur={async (value) => {
                              if (typeof setErrorCity !== "undefined") {
                                var cityCheck = await validateLocationName(
                                  value
                                );
                                setErrorCity(cityCheck);
                              }
                            }}
                            error={errorCity}
                          />
                        </Col>
                        <Col>
                          {" "}
                          <InputField
                            label="Country"
                            value={country}
                            entireComponentStyle={{ width: "100%" }}
                            wrapperStyle={{ width: "100%" }}
                            inputStyle={{ width: "98%" }}
                            onChange={async (value) => {
                              if (typeof setCountry !== "undefined") {
                                setCountry(value);
                              }
                              if (typeof setErrorCountry !== "undefined") {
                                var countryCheck = await validateLocationName(
                                  value
                                );
                                setErrorCountry(countryCheck);
                              }
                            }}
                            onBlur={async (value) => {
                              if (typeof setErrorCountry !== "undefined") {
                                var countryCheck = await validateLocationName(
                                  value
                                );
                                setErrorCountry(countryCheck);
                              }
                            }}
                            error={errorCountry}
                          />
                        </Col>
                      </Row>
                      <Row className={Styles.InputRow}>
                        <Col>
                          <InputField
                            label="Province/State"
                            value={province}
                            entireComponentStyle={{ width: "100%" }}
                            wrapperStyle={{ width: "95%" }}
                            inputStyle={{ width: "98%" }}
                            onChange={async (value) => {
                              if (typeof setProvince !== "undefined") {
                                setProvince(value);
                              }
                              if (typeof setErrorProvince !== "undefined") {
                                var provinceStateCheck =
                                  await validateLocationName(value);
                                setErrorProvince(provinceStateCheck);
                              }
                            }}
                            onBlur={async (value) => {
                              if (typeof setErrorProvince !== "undefined") {
                                var provinceStateCheck =
                                  await validateLocationName(value);
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
                            entireComponentStyle={{ width: "100%" }}
                            wrapperStyle={{ width: "100%" }}
                            inputStyle={{ width: "98%" }}
                            onChange={async (value) => {
                              if (typeof setZipCode !== "undefined") {
                                setZipCode(value);
                              }
                              if (typeof setErrorZipCode !== "undefined") {
                                var zipCheck = await validateZipCode(value);
                                setErrorZipCode(zipCheck);
                              }
                            }}
                            onBlur={async (value) => {
                              if (typeof setErrorZipCode !== "undefined") {
                                var zipCheck = await validateZipCode(value);
                                setErrorZipCode(zipCheck);
                              }
                            }}
                            error={errorZipCode}
                          />
                        </Col>
                      </Row>
                      <Row className={Styles.InputRow}>
                        <p
                          style={{
                            paddingLeft: "0px",
                            marginBottom: "5px",
                            marginTop: "20px",
                            fontWeight: "500",
                          }}
                        >
                          Enter card details
                        </p>
                        <hr style={{ marginBottom: "6px" }} />
                      </Row>
                      <Row>
                        <Row className={Styles.InputRow}>
                          {" "}
                          <Col>
                            {" "}
                            <InputField
                              label="Card Number"
                              value={cardNumber}
                              entireComponentStyle={{ width: "100%" }}
                              wrapperStyle={{ width: "250px" }}
                              inputStyle={{ width: "98%" }}
                              onChange={async (value) => {
                                var newValue = value
                                  .replace(/[^0-9.]/g, "")
                                  .replace(/(\..*)\./g, "$1");
                                setCardNumber(newValue);

                                var cardNumberCheck = await validateCardNumber(
                                  value
                                );
                                setCardNumberError(cardNumberCheck);
                              }}
                              onBlur={async (value) => {
                                var cardNumberCheck = await validateCardNumber(
                                  value
                                );
                                setCardNumberError(cardNumberCheck);
                              }}
                              error={cardNumberError}
                            />
                          </Col>
                        </Row>
                        <Row className={Styles.InputRow}>
                          {" "}
                          <Col>
                            {" "}
                            <InputField
                              label="Card Holder Name"
                              value={cardHolderName}
                              entireComponentStyle={{ width: "100%" }}
                              wrapperStyle={{ width: "250px" }}
                              inputStyle={{ width: "98%" }}
                              onChange={async (value) => {
                                if (typeof setZipCode !== "undefined") {
                                  setCardHolerName(value);
                                }
                                var cardHolderNameCheck =
                                  await validateAddressName(value);
                                setCardHolerNameError(cardHolderNameCheck);
                              }}
                              onBlur={async (value) => {
                                var cardHolderNameCheck =
                                  await validateAddressName(value);
                                setCardHolerNameError(cardHolderNameCheck);
                              }}
                              error={cardHolderNameError}
                            />
                          </Col>
                        </Row>
                        <Row className={Styles.InputRow}>
                          <Col className={Styles.DateAndCVV}>
                            {" "}
                            <InputField
                              label="Expiry Month"
                              // type="month"
                              value={cardExpiryMonth}
                              entireComponentStyle={{
                                marginRight: "20px",
                                width: "90px",
                              }}
                              wrapperStyle={{ width: "50px" }}
                              placeholder="MM"
                              onChange={async (value) => {
                                var newValue = value
                                  .replace(/[^0-9.]/g, "")
                                  .replace(/(\..*)\./g, "$1");

                                setCardExpiryMonth(newValue);

                                var expiryMonthCheck =
                                  await validateExpiryMonth(value);
                                setCardExpiryMonthError(expiryMonthCheck);
                              }}
                              onBlur={async (value) => {
                                var expiryMonthCheck =
                                  await validateExpiryMonth(value);
                                setCardExpiryMonthError(expiryMonthCheck);
                              }}
                              error={cardExpiryMonthError}
                            />
                            <InputField
                              label="Year"
                              placeholder="YYYY"
                              type="year"
                              value={cardExpiryYear}
                              entireComponentStyle={{
                                marginRight: "10px",
                                width: "70px",
                              }}
                              wrapperStyle={{ width: "50px" }}
                              onChange={async (value) => {
                                var newValue = value
                                  .replace(/[^0-9.]/g, "")
                                  .replace(/(\..*)\./g, "$1");
                                setCardExpiryYear(newValue);
                                var yearCheck = await validateExpiryYear(value);
                                setCardExpiryYearError(yearCheck);
                              }}
                              onBlur={async (value) => {
                                var yearCheck = await validateExpiryYear(value);
                                setCardExpiryYearError(yearCheck);
                              }}
                              error={cardExpiryYearError}
                            />
                            <InputField
                              label="CVV"
                              placeholder="CVV"
                              value={cardCvv}
                              entireComponentStyle={{
                                width: "90px",
                              }}
                              wrapperStyle={{ width: "50px" }}
                              onChange={async (value) => {
                                var newValue = value
                                  .replace(/[^0-9.]/g, "")
                                  .replace(/(\..*)\./g, "$1");
                                setCardCvv(newValue);
                                var expiryCvv = await validateCvv(value);
                                setCardCvvError(expiryCvv);
                              }}
                              onBlur={async (value) => {
                                var expiryCvv = await validateCvv(value);
                                setCardCvvError(expiryCvv);
                              }}
                              error={cardCvvError}
                            />
                          </Col>
                        </Row>
                      </Row>
                    </Row>
                  </Card>
                </Col>
                <Col xl={4} lg={4} md={12} xs={12} className={Styles.CardCol}>
                  <Card className="cardStyle">
                    <Card.Header className={Styles.Name}>
                      {" "}
                      Order Summary
                    </Card.Header>
                    <ListGroup variant="flush">
                      <ListGroup.Item className={Styles.SingleLineItem}>
                        <Row>
                          <Col xl={6} className={Styles.SummaryItemLabel}>
                            {" "}
                            <p>Price ({order.orderItems.length} Items): </p>
                          </Col>
                          {/* <Col xl={1} /> */}
                          <Col xl={6} className={Styles.SummaryCostValue}>
                            {formatter.format(
                              generateTotalCost(order) -
                                generateTaxAmount(order) -
                                order.shippingCost
                            )}
                          </Col>
                        </Row>
                      </ListGroup.Item>
                      <ListGroup.Item className={Styles.SingleLineItem}>
                        <Row>
                          <Col xl={6} className={Styles.SummaryItemLabel}>
                            {" "}
                            <p>Tax Amount: </p>{" "}
                          </Col>

                          <Col xl={6} className={Styles.SummaryCostValue}>
                            {formatter.format(generateTaxAmount(order))}
                          </Col>
                        </Row>
                      </ListGroup.Item>
                      <ListGroup.Item className={Styles.SingleLineItem}>
                        <Row>
                          <Col xl={6} className={Styles.SummaryItemLabel}>
                            {" "}
                            <p>Delivery Charge: </p>{" "}
                          </Col>

                          <Col xl={6} className={Styles.SummaryCostValue}>
                            {formatter.format(order.shippingCost)}
                          </Col>
                        </Row>
                      </ListGroup.Item>
                      <ListGroup.Item className={Styles.SingleLineItem}>
                        <Row>
                          <Col xl={4} className={Styles.SummaryItemLabel}>
                            <p>Total Amount: </p>
                          </Col>

                          <Col
                            xl={8}
                            className={Styles.SummaryCostValue}
                            style={{
                              fontSize: "23px",
                              fontWeight: "500",
                            }}
                          >
                            {formatter.format(generateTotalCost(order))}
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    </ListGroup>
                  </Card>

                  <div className={Styles.CompletePaymentBox}>
                    <CustomButton
                      label="Complete Payment"
                      disabled={!formValid}
                      styles={{
                        backgroundColor: "#209e4f",
                        paddingLeft: "30px",
                        paddingRight: "30px",
                      }}
                      textStyle={{ color: "white" }}
                      onClick={async () => {
                        if (formValid) {
                          payOrder();
                        } else {
                          checkInputFields();
                        }
                      }}
                    />
                  </div>
                </Col>
              </Row>
            </Container>
          )}
        </>
      )}
    </div>
  );
}

export default BillingPage;
