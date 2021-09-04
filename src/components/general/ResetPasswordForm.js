import React from "react";
import Styles from "./ResetPasswordForm.module.css";
import Notification from "./Notification.js";
import * as InputValidation from "../../services/inputValidation.js";
import Button from "./Button.js";
import LinearProgress from "@material-ui/core/LinearProgress";
import { MDBRow, MDBCol } from "mdb-react-ui-kit";
import { requestResetPassword } from "../../services/authentication.js";

function ResetPasswordForm(props) {
  var [loading, setLoading] = React.useState(false);
  var [formValid, setFormValid] = React.useState(false);
  var [resetPasswordState, setResetPasswordState] = React.useState(null);

  var [resetEmailError, setResetEmailError] = React.useState(null);
  var [resetEmail, setResetEmail] = React.useState(null);

  React.useEffect(() => {
    checkFormValidity();
  }, [resetEmailError]);

  async function checkFormFieldsValidity() {
    var resetEmailValidationResult = await InputValidation.validateEmail(
      resetEmail
    ); //input validation takes place for emailValidationResult
    await setResetEmailError(resetEmailValidationResult);

    return { ok: true };
  }

  function checkFormValidity() {
    if (resetEmailError) {
      if (resetEmailError.valid === true) {
        setFormValid(true);
        return true;
      } else {
        setFormValid(false);
        return false;
      }
    } else {
      setFormValid(false);
      return false;
    }
  }

  return (
    <form>
      <p className={Styles.ResetPasswordBanner}>Request Password Reset</p>
      <MDBRow>
        <MDBCol
          md={8}
          style={{
            margin: "0 auto",
            marginBottom: "10px",
            padding: "0px 12px",
            width: "100%",
          }}
        >
          <div style={{ marginBottom: "10px" }}>
            {loading && (
              <div
                style={{
                  paddingTop: "10px",
                  paddingBottom: "20px",
                }}
              >
                <LinearProgress />
              </div>
            )}
            {resetPasswordState && (
              <>
                {resetPasswordState.ok === true ? (
                  <Notification
                    state="success"
                    label={resetPasswordState.message}
                    styles={{ width: "100%", height: "auto", fontSize: "14px" }}
                  />
                ) : (
                  <Notification
                    state="error"
                    label={resetPasswordState.message}
                    styles={{ width: "100%", height: "auto", fontSize: "14px" }}
                  />
                )}
              </>
            )}
          </div>
        </MDBCol>{" "}
      </MDBRow>
      <MDBRow>
        <MDBCol md="12">
          <label
            className={Styles.InputLabel}
            htmlFor="defaultFormRegisterNameEx"
          >
            Email
          </label>
          <input
            type="text"
            id="defaultFormRegisterNameEx"
            placeholder="Enter username"
            className="form-control"
            value={resetEmail}
            onChange={async (event) => {
              await setResetEmail(event.target.value); //Taking in the new email and await emailValidationResult
              var resetEmailValidationResult =
                await InputValidation.validateEmail(event.target.value); //input validation takes place for emailValidationResult
              setResetEmailError(resetEmailValidationResult);
            }}
          />
          <p className="p-errors">
            {resetEmailError &&
              (!resetEmailError.valid ? resetEmailError.message : "")}
          </p>
          <br />
        </MDBCol>
      </MDBRow>

      <MDBRow>
        <Button
          label="Reset Password"
          disabled={!formValid}
          styles={{
            backgroundColor: "#FFC107",
            padding: "10px 20px",
            fontSize: "16px",
            margin: "0 auto",
            width: "max-content",
          }}
          className="rounded amber"
          onClick={async (event) => {
            await checkFormFieldsValidity();

            var flag = checkFormValidity();

            if (flag) {
              setResetPasswordState(null);
              setLoading(true); //function checks if email and password are correct and sets
              var requestResetPasswordResult = await requestResetPassword(
                resetEmail
              );
              setLoading(false); //
              setResetPasswordState(requestResetPasswordResult);

              if (requestResetPasswordResult.ok !== true) {
                setResetEmail(""); //if password or Username is false set both feilds to null
                setResetEmail(null);
              }
            }
          }}
        />
      </MDBRow>

      <MDBRow>
        <div
          className={Styles.GoToLogInForm}
          onClick={() => {
            if (typeof props.setShowForgotPasswordForm !== "undefined") {
              props.setShowForgotPasswordForm(false);
            }
          }}
        >
          <span class="material-icons">chevron_left</span>

          <p
            style={{
              display: "inline-flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {" "}
            Log In
          </p>
        </div>
      </MDBRow>
    </form>
  );
}

export default ResetPasswordForm;
