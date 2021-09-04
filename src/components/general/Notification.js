import React from "react";
import Styles from "./Notification.module.css";
import { CircularProgress } from "@material-ui/core";

function Notification(props) {
  var styles = props.state === "success" ? {} : {};
  return (
    <div
      className={Styles.ContactButton}
      style={
        props.state === "success"
          ? {
              borderStyle: "solid",
              borderWidth: "2px",
              backgroundColor: "#ECFFF7",
              borderColor: "#005651",
              color: "#005651",
              ...props.styles,
            }
          : {
              borderStyle: "solid",
              borderWidth: "2px",
              backgroundColor: "#FFEFEF",
              borderColor: "#C70125",
              color: "#C70125",
              ...props.styles,
            }
      }
    >
      <div
        style={{
          display: "inline-flex",
          justifyContent: "center",
          alignItems: "center",
          height: "max-content"
        }}
        onClick={() => {
          if (typeof props.onClick !== "undefined") {
            props.onClick();
          }
        }}
      >
        <p>{props.label}</p>
      </div>
      <div
        style={{
          display: "inline-flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {props.state === "loading" ? (
          <CircularProgress
            size="17px"
            style={{ marginLeft: "5px", color: "#005651" }}
          />
        ) : (
          <span class="material-icons" style={{ ...props.iconStyles }}>
            {props.state === "success" ? "done" : "error"}
          </span>
        )}
      </div>
    </div>
  );
}

export default Notification;
