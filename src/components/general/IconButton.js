import React from "react";
import Styles from "./Button.module.css";

function IconButton(props) {
  var backgroundColor; //backgroud color of the button
  var color; // main color of the button
  //if the button is disabled color will red
  //else the button will be dark red
  if (typeof props.disabled === "undefined" || props.disabled !== true) {
    backgroundColor = "#FF6158FF";
    color = "#000000FF";
  } else {
    backgroundColor = "#FF61584D";
    color = "#0000004D";
  }
  // when the button is pressed these actions will take place
  return (
    <div
      onClick={() => {
        if (typeof props.onClick !== "undefined") {
          props.onClick();
        }
      }}
      className={Styles.IconButton}
      style={{
        // boxShadow: "0px 0px 3px 0.5px #888888",
        backgroundColor: backgroundColor,
        display: "inline-block",
        borderRadius: "3px",
       
        fontSize: "15px",
        color: color,
        padding: "5px",
        height:"35px",
        ...props.styles,
      }}
    >
      {props.children}
    </div>
  );
}

export default IconButton;
