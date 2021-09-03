import React from "react";
import Styles from "./SearchInputField.module.css";

function SearchInputField(props) {
  return (
    <div className={Styles.SearchBarBox}>
      <input
        value={props.value}
        className={Styles.SearchInput}
        type="text"
        placeholder={props.placeHolderText}
        onChange={(event) => {
          if (typeof props.onChange !== "undefined") {
            props.onChange(event.target.value);
          }
        }}
      />
    </div>
  );
}

export default SearchInputField;
