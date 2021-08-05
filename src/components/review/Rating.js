import React from "react";

import Styles from "./Rating.module.css";

function Rating(props) {
  // var [rating, setRating] = React.useState(props.initial || 0);

  function rate(rateValue) {
    if (typeof props.mutable !== "undefined" || props.mutable === false) {
      //setRating(rateValue);
    }
    if (typeof props.trackRating !== "undefined") {
      props.trackRating(rateValue);
    }
  }

  return (
    <div style={{}}>
      {[1, 2, 3, 4, 5].map((i) => {
        if (typeof props.value !== "undefined") {
          if (i <= props.value) {
            return (
              <span
                onClick={() => {
                  rate(i);
                }}
                style={{ fontSize: "20px", color: "#F3D63C" }}
                className={Styles.Star + " material-icons "}
              >
                star
              </span>
            );
          } else {
            return (
              <span
                onClick={() => {
                  rate(i);
                }}
                style={{ fontSize: "20px", color: "Black" }}
                className={Styles.Star + " material-icons "}
              >
                star_outline
              </span>
            );
          }
        }
      })}
    </div>
  );
}

export default Rating;
