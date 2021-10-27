import React from "react";
import { TextField, MenuItem } from "@material-ui/core";
import Styles from "./QuantityCart.module.css";

// function purpose is to create a dropdown for quantity
function QuantityCart(props) {
  // return a react component
  return (
    <TextField
      id="select"
      className={Styles.EntireSelector}
    
      select
      value={props.value}
      onChange={(event) => {
        if (typeof props.update !== "undefined") {
          props.update(event.target.value);
        }
      }}
    >
      {/* item is a variable that contains the numbers 
            using map to loop through possible MenuItems*/}
      {[1, 2, 3, 4, 5].map((item) => {
        //   onclick should update item quantity in the backend user cart object
        return <MenuItem value={item}>{item} </MenuItem>;
      })}
    </TextField>
  );
}

export default QuantityCart;
