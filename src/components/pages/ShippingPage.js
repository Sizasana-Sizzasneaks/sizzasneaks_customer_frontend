import React from "react";
import {
  createNewShippingAddress,
  getShippingAddressById,
  updateShippingAddressById,
  getShippingAddresses,
} from "../../api/shipping.js";

import Styles from "./ShippingPage.module.css";

function ShippingPage() {
  React.useEffect(() => {
    // addNewShippingAddress();
    // retrieveShippingAddress("61433e978cffb44990a602b5");
    //updateAddress();
    getAddresses();
  }, []);

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

    if (createNewAddressResult.ok) {
      console.log("Worked");
      console.log(createNewAddressResult);
    } else {
      console.log("Failed");
      console.log(createNewAddressResult);
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
