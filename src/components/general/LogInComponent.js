import React from "react";
import * as InputValidation from "../../services/inputValidation.js";
import { logIn } from "../../services/authentication.js";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getUserProfile } from "../../redux/actions/profile.js";
import { getUserCart } from "../../redux/actions/cart.js";

//Components
import ResetPasswordForm from "./ResetPasswordForm.js";
import Button from "./Button.js";
import { MDBRow, MDBCol, MDBCard, MDBCardBody } from "mdb-react-ui-kit";
import LinearProgress from "@material-ui/core/LinearProgress";
import Notification from "./Notification.js";

//Styles & Themes
import { makeStyles } from "@material-ui/core/styles";
import Styles from "./LogInComponent.module.css";

// This used to make style of the log in component
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
}));
//Taking in UserName and Password from the user
function LogInComponent(props) {
  const history = useHistory();
  const dispatch = useDispatch();
  //Form State
  var [email, setEmail] = React.useState("");
  var [password, setPassword] = React.useState("");

  //Show Forgot Password Form
  var [showForgotPasswordForm, setShowForgotPasswordForm] =
    React.useState(false);

  //Form Validation State
  //input validation
  var [errorEmail, setErrorEmail] = React.useState(null);
  var [errorPassword, setErrorPassword] = React.useState(null);
  var [logInState, setLogInState] = React.useState(null);
  var [formValid, setFormValid] = React.useState(false);
  var [loading, setLoading] = React.useState(false);

  const classes = useStyles();

  React.useEffect(() => {
    checkFormValidity();
  }, [errorEmail && errorPassword]);

  async function checkFormFieldsValidity() {
    //Check Email
    var emailValidationResult = await InputValidation.validateEmail(email); //input validation takes place for emailValidationResult
    await setErrorEmail(emailValidationResult);

    //Check Password
    var passwordValidationResult = await InputValidation.validateLogInPassword(
      password
    );
    await setErrorPassword(passwordValidationResult);

    return { ok: true };
  }

  function checkFormValidity() {
    if (errorEmail && errorPassword) {
      if (errorEmail.valid === true && errorPassword.valid === true) {
        setFormValid(true); // if the Username and password is matches then set setFormValid to true
        return true;
      } else {
        setFormValid(false); // if the Username and password is matches then set setFormValid to false
        return false;
      }
    } else {
      setFormValid(false); //this if and else statement checks input validation for Username and Password
      return false;
    }
  }
  //Code under here is visual components of log-in card
  return (
    <div style={{ marginTop: "10px", zIndex: 1 }}>
      <div className="login-form">
        <div className="form-box solid">
          <MDBCard>
            <MDBCardBody className={classes.root}>
              <div
                className={Styles.PopUpClose}
                onClick={() => {
                  if (typeof props.setShowLogInForm !== "undefined") {
                    props.setShowLogInForm(false);
                    setEmail(null);
                    setPassword(null);
                    setErrorEmail(null);
                    setErrorPassword(null);
                  }
                }}
              >
                <span class="material-icons">close</span>
              </div>

              {!showForgotPasswordForm ? (
                <form>
                  <p className={Styles.LoginBanner}>LOG IN</p>
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
                        {logInState && (
                          <>
                            {logInState.ok === true ? (
                              <Notification
                                state="success"
                                label={logInState.message}
                                styles={{ width: "100%" }}
                              />
                            ) : (
                              <Notification
                                state="error"
                                label={logInState.message}
                                styles={{ width: "100%" }}
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
                        value={email}
                        onChange={async (event) => {
                          await setEmail(event.target.value); //Taking in the new email and await emailValidationResult
                          var emailValidationResult =
                            await InputValidation.validateEmail(
                              event.target.value
                            ); //input validation takes place for emailValidationResult
                          setErrorEmail(emailValidationResult);
                        }}
                      />
                      <p className="p-errors">
                        {errorEmail &&
                          (!errorEmail.valid ? errorEmail.message : "")}
                      </p>
                      <br />
                    </MDBCol>
                  </MDBRow>
                  <MDBRow>
                    <MDBCol md="12">
                      <label
                        htmlFor="defaultFormRegisterPasswordEx"
                        className={Styles.InputLabel}
                      >
                        Password
                      </label>

                      <input
                        type="password"
                        id="defaultFormRegisterPasswordEx"
                        placeholder="Enter Password"
                        className="form-control"
                        value={password}
                        onChange={async (event) => {
                          await setPassword(event.target.value); //checks the password
                          var passwordValidationResult =
                            await InputValidation.validateLogInPassword(
                              event.target.value
                            );
                          setErrorPassword(passwordValidationResult); //password must match the password stores in the DB
                        }}
                      />
                      <p className="p-errors">
                        {errorPassword &&
                          (!errorPassword.valid ? errorPassword.message : "")}
                      </p>
                    </MDBCol>
                  </MDBRow>

                  <div className="text-center mt-4">
                    <Button
                      label="LOGIN"
                      disabled={!formValid}
                      styles={{
                        backgroundColor: "#FFC107",
                        padding: "10px 20px",
                        fontSize: "16px",
                      }}
                      className="rounded amber"
                      onClick={async (event) => {
                        await checkFormFieldsValidity();

                        var flag = checkFormValidity();

                        if (flag) {
                          setLogInState(null);
                          setLoading(true); //function checks if email and password are correct and sets
                          var logInResult = await logIn(email, password);
                          setLoading(false); //
                          setLogInState(logInResult);

                          if (logInResult.ok !== true) {
                            setErrorPassword(null); //if password or Username is false set both feilds to null
                            setPassword("");
                          } else {
                            dispatch(getUserProfile());
                            dispatch(getUserCart());
                            setTimeout(() => {
                              props.setShowLogInForm(false);

                              // history.push("/");
                            }, 2000);
                          }
                        }
                      }}
                    />

                    <p style={{ marginTop: "20px", marginBottom: "5px" }}>
                      New Customer?,{" "}
                      <p
                        className={Styles.RegisterNow}
                        style={{ color: "blue", display: "inline-flex" }}
                        onClick={() => {
                          if (typeof props.setShowLogInForm !== "undefined") {
                            props.setShowLogInForm(false);
                            history.push("/sign-up");
                          }
                        }}
                      >
                        {" "}
                        Register Now
                      </p>
                    </p>

                    <p
                      className={Styles.RegisterNow}
                      style={{ color: "blue", display: "inline-flex" }}
                      onClick={() => {
                        setShowForgotPasswordForm(true);
                      }}
                    >
                      {" "}
                      Forgot Password ?
                    </p>
                  </div>
                </form>
              ) : (
                <ResetPasswordForm
                  setShowForgotPasswordForm={setShowForgotPasswordForm}
                />
              )}
            </MDBCardBody>
          </MDBCard>
        </div>
      </div>
    </div>
  );
}

export default LogInComponent;
