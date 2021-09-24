import React from "react";

import {
  createNewShippingAddress,
  getShippingAddressById,
  updateShippingAddressById,
  getShippingAddresses,
  deleteShippingAddress,
} from "../../api/shipping.js";

import { postOrder } from "../../api/orders.js";

import Styles from "./ShippingPage.module.css";

function ShippingPage() {
  React.useEffect(() => {
    // function used when user clicks submit button when
    //creating/adding a new shipping address

    // retrieveShippingAddress("61433e978cffb44990a602b5");
    //updateAddress();
    //getAddresses();
    // addNewShippingAddress();
    //deleteAddress();
    createOrder();
  }, []);

  async function createOrder() {
    var postOrdersResult = await postOrder("61447b1e0177213640efdef4");

    if (postOrdersResult.ok) {
      console.log("Worked");
      console.log(postOrdersResult);
    } else {
      console.log("Failed");
      console.log(postOrdersResult);
    }
  }

  async function updateAddress() {
    var addressId = "61447ce90187213640efdf05";
    var addressData = {
      addressName: "Distant Place Address",
      addressLineOne: "200 Timmy Rd",
      addressLineTwo: "Silvery, Slope",
      city: "Old York",
      province: "Imagine",
      country: "SliderLand",
      zipCode: "2244",
      contactNumber: "0743018881",
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

  async function addNewShippingAddress() {
    var addressName = "Res Address 3";
    var addressLineOne = "145 Peter Rd";
    var addressLineTwo = "Ruimsig, Roodepoort";
    var city = "Johannesburg";
    var province = "Gauteng";
    var country = "South Africa";
    var zipCode = "5674";
    var contactNumber = "0743018891";

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
    } else {
      console.log("Failed");
      console.log(getShippingAddressesResult);
    }
  }

  return (
    <div>
      <p>Shipping Page</p>
    </div>
  );
}

export default ShippingPage;
