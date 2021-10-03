import React from "react";
import Styles from "./BoxSelector.module.css";

function BoxSelector(props) {
  return (
    <div
      onClick={() => {
        if (typeof props.select !== "undefined") {
          props.select();
        }
      }}
      className={
        props.selected
          ? [Styles.BoxSelector, Styles.BoxSelectorSelected].join(" ")
          : Styles.BoxSelector
      }
    >
      <p>{props.label}</p>
    </div>
  );
}

export default BoxSelector;
