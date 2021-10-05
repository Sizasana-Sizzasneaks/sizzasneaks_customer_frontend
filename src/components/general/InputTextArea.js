import React from "react";
import Styles from "./InputField.module.css";

function InputTextArea(props) {
  var [focused, setFocus] = React.useState(false);
  return (
    <div
      className={Styles.EntireInputFieldComponent}
      style={props.entireComponentStyle}
    >
      <p
        className={
          focused
            ? [Styles.InputLabel, Styles.InputLabelFocused].join(" ")
            : props.error && !props.error.ok
            ? [Styles.InputLabel, Styles.InputLabelError].join(" ")
            : Styles.InputLabel
        }
      >
        {props.label}
      </p>
      <div
        className={
          focused
            ? [Styles.InputWrapper, Styles.InputWrapperFocused].join(" ")
            : props.error && !props.error.ok
            ? [Styles.InputWrapper, Styles.InputWrapperError].join(" ")
            : Styles.InputWrapper
        }
        style={props.wrapperStyle}
      >
        <textarea
          className={Styles.InputTextArea}
          style={props.inputStyle}
          onFocus={() => {
            setFocus(true);
          }}
          onBlur={() => {
            setFocus(false);
          }}
          value={props.value}
          onChange={(event) => {
            if (typeof props.onChange !== "undefined") {
              props.onChange(event.target.value);
            }
          }}
        />
      </div>
      {props.error && !props.error.ok && !focused && (
        <p className={[Styles.InputLabel, Styles.InputError].join(" ")}>
          {props.error.message}
        </p>
      )}
    </div>
  );
}

export default InputTextArea;
