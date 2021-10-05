import React from "react";
import Styles from "./BillingPage.module.css";
import { Card, Row, Col, Container, Breadcrumb } from "react-bootstrap";
import InputField from "../general/InputField.js";
import InputCheckbox from "../general/InputCheckbox";
import CustomButton from "../general/Button.js";
import { Link } from "react-router-dom";

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

function BillingPage() {
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

  React.useEffect(() => {}, []);

  return (
    <div>
      {" "}
      <Breadcrumb style={{ margin: "20px" }}>
        <Breadcrumb.Item>
          <Link to="/">Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to="/">Orders</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item active>Place Order - Billing</Breadcrumb.Item>
      </Breadcrumb>
      <Container className={Styles.container}>
        <Row>
          <Col xs={12} md={8}>
            <Card className="cardStyle">
              <Card.Header className={Styles.Name}>
                {" "}
                Billing Details
              </Card.Header>
              <Row className={Styles.BillingDetailsCardContent}>
                <Row>
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
                    <InputCheckbox />
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
                    <p style={{ paddingLeft: "0px", marginBottom: "5px" }}>
                      Use shipping address
                    </p>
                  </div>
                </Row>
                <Row>
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
                          var firstNameCheck = await validateAddressName(value);
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
                      onChange={async (value) => {
                        if (typeof setLastName !== "undefined") {
                          setLastName(value);
                        }
                      }}
                      onBlur={async (value) => {
                        if (typeof setLastNameError !== "undefined") {
                          var lastNameCheck = await validateAddressName(value);
                          setErrorLastName(lastNameCheck);
                        }
                      }}
                      error={errorLastName}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    {" "}
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
                      placeholder="Suburb"
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
                </Row>
                <Row>
                  <Col>
                    {" "}
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
                          var cityCheck = await validateLocationName(value);
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
                      onChange={async (value) => {
                        if (typeof setCountry !== "undefined") {
                          setCountry(value);
                        }
                      }}
                      onBlur={async (value) => {
                        if (typeof setErrorCountry !== "undefined") {
                          var countryCheck = await validateLocationName(value);
                          setErrorCountry(countryCheck);
                        }
                      }}
                      error={errorCountry}
                    />
                  </Col>
                </Row>
                <Row>
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
                          var provinceStateCheck = await validateLocationName(
                            value
                          );
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
                          var zipCheck = await validateZipCode(value);
                          setErrorZipCode(zipCheck);
                        }
                      }}
                      error={errorZipCode}
                    />
                  </Col>
                </Row>
                <Row>
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
                  <Row>
                    {" "}
                    <Col>
                      {" "}
                      <InputField
                        label="Card Number"
                        value={cardNumber}
                        onChange={async (value) => {
                          var newValue = value
                            .replace(/[^0-9.]/g, "")
                            .replace(/(\..*)\./g, "$1");
                          setCardNumber(newValue);
                        }}
                        onBlur={async (value) => {
                          var zipCheck = await validateCardNumber(value);
                          setCardNumberError(zipCheck);
                        }}
                        error={cardNumberError}
                      />
                    </Col>
                  </Row>
                  <Row>
                    {" "}
                    <Col>
                      {" "}
                      <InputField
                        label="Card Holder Name"
                        value={cardHolderName}
                        onChange={async (value) => {
                          if (typeof setZipCode !== "undefined") {
                            setCardHolerName(value);
                          }
                        }}
                        onBlur={async (value) => {
                          var cardHolderNameCheck = await validateAddressName(
                            value
                          );
                          setCardHolerNameError(cardHolderNameCheck);
                        }}
                        error={cardHolderNameError}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col className={Styles.DateAndCVV}>
                      {" "}
                      <InputField
                        label="Expiry Month"
                        type="month"
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
                        }}
                        onBlur={async (value) => {
                          var expiryMonthCheck = await validateExpiryMonth(
                            value
                          );
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
          <Col xs={6} md={4}>
            <Card className="cardStyle">
              <Card.Header className={Styles.Name}> Order Summary</Card.Header>
            </Card>

            <div className={Styles.CompletePaymentBox}>
              <CustomButton label="Complete Payment" />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default BillingPage;
