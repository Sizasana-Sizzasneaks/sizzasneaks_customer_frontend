import React from "react";
import Styles from "./Button.module.css";
//making a button component 
function Button(props) {
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
      className={Styles.Button}
      style={{
        // boxShadow: "0px 0px 3px 0.5px #888888",
    
        padding: "10px 15px",
        backgroundColor: backgroundColor,
        display: "inline-block",
        borderRadius: "4px",
        fontWeight: "500",
        fontSize: "15px",
        color: color,
        ...props.styles,
        
      }}
    >
      {props.label}
    </div>
  );
}

export default Button;
