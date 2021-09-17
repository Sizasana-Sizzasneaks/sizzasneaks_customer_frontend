import React from "react";
import { createNewShippingAddress, deleteShippingAddress } from "../../api/shipping.js";

import Styles from "./ShippingPage.module.css";

function ShippingPage() {
  React.useEffect(() => {
    // addNewShippingAddress();
    deleteAddress();
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
  async function deleteAddress(){

    var address_id="61447d1a0177213640efdf07";
    var deleteShippingAddressResult=await deleteShippingAddress(
      address_id
    );
    if(deleteShippingAddressResult.ok){
      console.log("Delete worked");
      console.log(deleteShippingAddressResult);
    }else{
      console.log("Delete failed");
      console.log(deleteShippingAddressResult);
    }
  }
  return (
    <div>
      <p>Shipping Page</p>
    </div>
  );
}

export default ShippingPage;
