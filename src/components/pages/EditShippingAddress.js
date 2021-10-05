import React from "react";
import { useHistory, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { CircularProgress } from "@material-ui/core";
import CustomButton from "../general/Button.js";
import BoxSelector from "../general/BoxSelector.js";
import InputField from "../general/InputField.js";
import InputTextArea from "../general/InputField.js";
import { Card, Row, Col, Container } from "react-bootstrap";

import {
  validateBasicString,
  validateAddressName,
  validateDeliveryInstructionString,
  validateLocationName,
  validateContactNumber,
  validateZipCode,
} from "../../services/inputValidation.js";
import * as InputValidation from "../../services/inputValidation.js";

import {
  createNewShippingAddress,
  getShippingAddressById,
  updateShippingAddressById,
} from "../../api/shipping.js";

import Styles from "./ShippingPage.module.css";

function EditShippingAddress(props) {
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
  var [addressState, setAddressState] = React.useState(null);
  var [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    // function used when user clicks submit button when
    // creating/adding a new shipping address

    if (!props.newMode) {
      retrieveShippingAddress(props.editAddress);
    }
  }, []);

  async function checkFormFieldsValidity() {
    //Check FirstName
    var firstNameValidationResult = await InputValidation.validateAddressName(
      firstName
    );
    await setErrorFirstName(firstNameValidationResult);

    //Check Last Name
    var lastNameValidationResult = await InputValidation.validateAddressName(
      lastName
    );
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
    var countryValidationResult = await InputValidation.validateLocationName(
      country
    );
    await setErrorCountry(countryValidationResult);

    //Check City
    var cityValidationResult = await InputValidation.validateLocationName(city);
    await setErrorCity(cityValidationResult);

    //Check province
    var provinceValidationResult = await InputValidation.validateLocationName(
      province
    );
    await setErrorProvince(provinceValidationResult);

    //Check zipCode
    var zipCodeValidationResult = await InputValidation.validateZipCode(
      zipCode
    );
    await setErrorZipCode(zipCodeValidationResult);

    //Check contact Number
    var contactNumberValidationResult =
      await InputValidation.validateContactNumber(contactNumber);
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
        errorFirstName.ok === true && //this checks if all the information provided is in right format
        errorLastName.ok === true &&
        errorAddressName.ok === true &&
        errorAddressLineOne.ok === true &&
        errorAddressLineTwo.ok === true &&
        errorCountry.ok === true &&
        errorCity.ok === true &&
        errorProvince.ok === true &&
        errorZipCode.ok === true &&
        errorContactNumber.ok === true &&
        errorDeliveryInstruction.ok === true
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
  async function updateAddress() {
    setLoading(true);
    setAddressState(null);
    var addressId = props.editAddress;
    var addressData = {
      addressName: addressName,
      firstName: firstName,
      lastName: lastName,
      addressLineOne: addressLineOne,
      addressLineTwo: addressLineTwo,
      city: city,
      province: province,
      country: country,
      zipCode: zipCode,
      contactNumber: contactNumber,
      deliveryInstructions: deliveryInstruction,
    };

    var updateShippingAddressByIdResult = await updateShippingAddressById(
      addressId,
      addressData
    );
    setLoading(false);
    if (updateShippingAddressByIdResult.ok) {
      setAddressState(updateShippingAddressByIdResult);

      setTimeout(() => {
        if (typeof props.switchMode !== "undefined") {
          props.switchMode({ mode: "hide" });
        }
      }, 1000);
    } else {
      setAddressState(updateShippingAddressByIdResult);
    }
  }
  //"Res Address 3""145 Peter Rd""Ruimsig, Roodepoort""Johannesburg""Gauteng""South Africa""5674""0743018891"
  async function addNewShippingAddress() {
    setLoading(true);
    setAddressState(null);
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
      contactNumber,
      deliveryInstruction
    );

    //confirm if it was a success
    setLoading(false);
    if (createNewAddressResult.ok) {
      setAddressState(createNewAddressResult);

      setTimeout(() => {
        if (typeof props.switchMode !== "undefined") {
          props.switchMode({ mode: "hide" });
        }
      }, 1000);
    } else {
      // Create New Address failed
      setAddressState(createNewAddressResult);
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
        var shippingAddress = getShippingAddressByIdResult.data;
        setFirstName(shippingAddress.firstName);
        setLastName(shippingAddress.lastName);
        setAddressName(shippingAddress.addressName);
        setAddressLineOne(shippingAddress.addressLineOne);
        setAddressLineTwo(shippingAddress.addressLineTwo);
        setCountry(shippingAddress.country);
        setCity(shippingAddress.city);
        setProvince(shippingAddress.province);
        setZipCode(shippingAddress.zipCode);
        setContactNumber(shippingAddress.contactNumber);
        setDeliveryInstruction(shippingAddress.deliveryInstructions);
      } else {
        if (typeof props.switchMode !== "undefined") {
          props.switchMode({ mode: "hide" });
        }
      }
    }
  }

  return (
    <Card>
      {props.newMode ? (
        <Card.Header className={Styles.Name}> Create New Address</Card.Header>
      ) : (
        <Card.Header className={Styles.Name}> Edit Address</Card.Header>
      )}

      {/* Address data column  */}
      <Container>
        <Row
          style={{
            margin: "10px auto 10px",
            padding: "0px 40px",
          }}
        >
          {" "}
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
                  var addressNameCheck = await validateBasicString(value);
                  setErrorAddressName(addressNameCheck);
                }
              }}
              error={errorAddressName}
            />
          </Col>
        </Row>
        <Row
          xs="2"
          style={{
            margin: "10px auto 10px",
            padding: "0px 40px",
          }}
        >
          <Col >
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
                  var addressLineOneCheck = await validateBasicString(value);
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
                  var addressLineTwoCheck = await validateBasicString(value);
                  setErrorAddressLineTwo(addressLineTwoCheck);
                }
              }}
              error={errorAddressLineTwo}
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
                  var cityCheck = await validateLocationName(value);
                  setErrorCity(cityCheck);
                }
              }}
              error={errorCity}
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
                  var countryCheck = await validateLocationName(value);
                  setErrorCountry(countryCheck);
                }
              }}
              error={errorCountry}
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
                  var provinceStateCheck = await validateLocationName(value);
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
                  var contactNumberCheck = await validateContactNumber(value);
                  setErrorContactNumber(contactNumberCheck);
                }
              }}
              error={errorContactNumber}
            />
          </Col>
        </Row>
        <Row
          style={{
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
                if (typeof setErrorDeliveryInstruction !== "undefined") {
                  var deliveryInstructionCheck =
                    await validateDeliveryInstructionString(value);
                  setErrorDeliveryInstruction(deliveryInstructionCheck);
                }
              }}
              error={errorDeliveryInstruction}
            />
          </Col>
        </Row>
        <Row>
          {loading ? (
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
              {addressState ? (
                <>
                  {addressState.ok ? (
                    <p className={Styles.StateMessageSuccess}>
                      {addressState.message}
                    </p>
                  ) : (
                    <p className={Styles.StateMessageError}>
                      {addressState.message}
                    </p>
                  )}
                </>
              ) : (
                <></>
              )}
            </>
          )}
          <CustomButton
            label="Discard"
            styles={{
              backgroundColor: "#18723A",
              color: "white",
              margin: "10px auto",
              marginTop: "40px",
              marginBottom: "30px",
              width: "max-content",
              textAlign: "center",
              float: "right",
              height: "max-content",
            }}
            onClick={async (event) => {
              if (typeof props.switchMode !== "undefined") {
                props.switchMode({ mode: "hide" });
              }
            }}
          />
          {props.newMode ? (
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
                  addNewShippingAddress();
                }
              }}
            />
          ) : (
            <CustomButton
              label={"Update Address " + addressName}
              styles={{
                backgroundColor: "#18723A",
                color: "white",
                margin: "10px auto",
                marginTop: "40px",
                marginBottom: "30px",
                marginRight: " 20px",
                width: "max-content",
                textAlign: "center",
                float: "right",
                height: "max-content",
              }}
              onClick={async (event) => {
                //Input Validation
                await checkFormFieldsValidity();
                var flag = checkFormValidity();
                if (flag) {
                  updateAddress();
                }
              }}
            />
          )}
        </Row>
      </Container>
    </Card>
  );
}

export default EditShippingAddress;
