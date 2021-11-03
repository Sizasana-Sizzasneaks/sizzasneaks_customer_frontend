import React from "react";
import Styles from "./PageNotFound.module.css";
import { useHistory } from "react-router-dom";

function PageNotFound(props) {
  const history = useHistory();
  return (
    <div className={Styles.Page}>
      <div className={Styles.ErrorBox}>
        <div className={Styles.InnerErrorBox}>
          <span
            class="material-icons"
            style={{
              color: "red",
              display: "block",
              fontSize: "120px",
              marginBottom: "10px",
            }}
          >
            error
          </span>

          <p className={Styles.Heading}>Page does not exist</p>
          <p>Seems like you are lost.</p>
          <p
            className={Styles.ReturnLink}
            onClick={() => {
              history.push("/");
            }}
          >
            Return Home
          </p>
        </div>
      </div>
    </div>
  );
}

export default PageNotFound;
