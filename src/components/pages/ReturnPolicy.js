import React from "react";
import Styles from "./Legal.module.css";

function ReturnPolicy(props) {
  return (
    <div className={Styles.Page}>
      <p className={Styles.Heading}>Return Policy</p>
      <p className={Styles.Info}>[Return Policy]</p>
    </div>
  );
}

export default ReturnPolicy;
