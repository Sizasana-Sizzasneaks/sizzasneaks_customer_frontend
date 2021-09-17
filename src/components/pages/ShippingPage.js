import React from "react";

// retrieve the api functions
import { createNewShippingAddress, deleteShippingAddress } from "../../api/shipping.js";

import Styles from "./ShippingPage.module.css";

function ShippingPage() {
  React.useEffect(() => {
    // addNewShippingAddress();
    deleteAddress();
  }, []);

  // function used when user clicks submit button when 
  // creating/adding a new shipping address
  async function addNewShippingAddress() {
    var addressName = "Res Address";
    var addressLineOne = "144 Peter Rd";
    var addressLineTwo = "Ruimsig, Roodepoort";
    var city = "Johannesburg";
    var province = "Gauteng";
    var country = "South Africa";
    var zipCode = "1724";
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
  async function deleteAddress(){
    // get the select address from the user and send the id to the backend
    var address_id="61447d1a0177213640efdf07";
    var deleteShippingAddressResult=await deleteShippingAddress(
      address_id
    );
    // unit testing by confirm if it was a success
    if(deleteShippingAddressResult.ok){
      console.log("Delete worked");
      console.log(deleteShippingAddressResult);
    }else{
      //unit testing by confirm if it was a success
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
