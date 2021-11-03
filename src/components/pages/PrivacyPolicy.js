import React from "react";
import Styles from "./Legal.module.css";

function PrivacyPolicy(props) {
  return (
    <div className={Styles.Page}>
      <p className={Styles.Heading}>Privacy Policy</p>
      <p className={Styles.Info}>[Privacy Policy]</p>
    </div>
  );
}

export default PrivacyPolicy;
