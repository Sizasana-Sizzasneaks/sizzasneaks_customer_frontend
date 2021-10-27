import React from "react";
import Styles from "./InputCheckbox.module.css";

function InputCheckbox(props) {
  return (
    <div
      className={
        props.checked
          ? [Styles.CheckBox, Styles.CheckedCheckBox].join(" ")
          : Styles.CheckBox
      }
      style={props.style}
      onClick={() => {
        if (
          typeof props.onClick !== "undefined" &&
          typeof props.checked !== "undefined"
        ) {
          props.onClick(!props.checked);
        }
      }}
    >
      <span class="material-icons">check</span>
    </div>
  );
}

export default InputCheckbox;
