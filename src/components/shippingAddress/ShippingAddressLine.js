import { Style } from "@material-ui/icons";
import React from "react";
import { Row, Col } from "react-bootstrap";
import { propTypes } from "react-bootstrap/esm/Image";
import IconButton from "../general/IconButton.js";
import InputCheckBox from "../general/InputCheckbox.js";
import Styles from "./ShippingAddressLine.module.css";

function ShippingAddressLine(props) {
  return (
    <Row
      className={
        props.selected
          ? [Styles.ShippingAddressLineBox, Styles.CheckBoxSelected].join(" ")
          : Styles.ShippingAddressLineBox
      }
    >
      <Col xs={2} className={Styles.AddressNameBox}>
        {/* Address name component */}
        {props.addressName}
      </Col>
      <Col xs={7} className={Styles.AddressDetailsBox}>
        {/* Address detail component */}
        {props.name}
        <br />
        {props.addressLineOne + ", " + props.addressLineTwo + ", " + props.city}
        <br />
        {props.province + ", " + props.country + ", " + props.zipCode}
        <br />
        {props.contactNumber}
      </Col>
      <Col xs={1} className={Styles.AddressUpdateBox}>
        {/* Update address button component */}
        <IconButton
          styles={{
            backgroundColor: "white",
            borderStyle: "solid",
            borderWidth: "1.5px",
          }}
          onClick={() => {
            if (
              typeof props.showEditAddress !== "undefined" &&
              typeof props.id !== "undefined"
            ) {
              props.showEditAddress({ mode: "edit", id: props.id });
            }
          }}
        >
          <span class="material-icons">edit</span>
        </IconButton>
      </Col>
      <Col xs={1} className={Styles.AddressDeleteBox}>
        {/* Delete button component */}
        <IconButton
          styles={{
            backgroundColor: "white",
            borderStyle: "solid",
            borderWidth: "1.5px",
          }}
          onClick={() => {
            if (
              typeof props.deleteAddress !== "undefined" &&
              typeof props.id !== "undefined"
            ) {
              props.deleteAddress(props.id);
            }
          }}
        >
          <span class="material-icons">delete</span>
        </IconButton>
      </Col>
      <Col xs={1} className={Styles.AddressSelectBox}>
        {/* checkbox select option component */}
        <InputCheckBox
          checked={props.selected}
          onClick={(value) => {
            if (typeof props.selectAddress !== "undefined") {
              props.selectAddress(props.id);
            }
          }}
        />
      </Col>
    </Row>
  );
}

export default ShippingAddressLine;
