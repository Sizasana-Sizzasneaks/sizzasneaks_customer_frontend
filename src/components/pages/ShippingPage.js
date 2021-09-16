import React from "react";
import {
  createNewShippingAddress,
  getShippingAddressById,
} from "../../api/shipping.js";

import Styles from "./ShippingPage.module.css";

function ShippingPage() {
  React.useEffect(() => {
    //addNewShippingAddress();
    retrieveShippingAddress("61433e978cffb44990a602b5");
  }, []);

  async function addNewShippingAddress() {
    var addressName = "Res Address";
    var addressLineOne = "144 Peter Rd";
    var addressLineTwo = "Ruimsig, Roodepoort";
    var city = "Johannesburg";
    var province = "Gauteng";
    var country = "South Africa";
    var zipCode = "1724";
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

  return (
    <div>
      <p>Shipping Page</p>
    </div>
  );
}

export default ShippingPage;
