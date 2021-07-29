import React from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useFirebase } from "react-redux-firebase";
import { makeStyles } from "@material-ui/core/styles";
import "mdbreact/dist/css/mdb.css";
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from "mdb-react-ui-kit";

import { getUserProfile } from "../../redux/actions/profile";

import * as InputValidation from "../../services/inputValidation.js";
import { signUp } from "../../services/authentication.js";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
}));

function SignUpPage() {
  const firebase = useFirebase();
  const dispatch = useDispatch();

  //state manage of the form input fields
  var [firstName, setFirstName] = React.useState("");
  var [lastName, setLastName] = React.useState("");
  var [email, setEmail] = React.useState("");
  var [mobileNumber, setMobileNumber] = React.useState("");
  var [password, setPassword] = React.useState("");
  var [retypePsw, setRetypePsw] = React.useState("");

  //Validation
  var [errorFirstName, setErrorFirstName] = React.useState(null);
  var [errorLastName, setErrorLastName] = React.useState(null);
  var [errorEmail, setErrorEmail] = React.useState(null);
  var [errorMobile, setErrorMobile] = React.useState(null);
  var [errorPassword, setErrorPassword] = React.useState(null);
  var [errorRetypePsw, setErrorRetypePsw] = React.useState(null);
  var [signUpState, setSignUpState] = React.useState(null);
  var [formValid, setFormValid] = React.useState(false);

  const classes = useStyles();

  React.useEffect(() => {
    checkFormValid()
  }, [
    errorFirstName,
    errorLastName,
    errorEmail,
    errorMobile,
    errorPassword,
    errorRetypePsw,
  ]);

  function checkFormValid() {
    if (
      errorFirstName &&
      errorLastName &&
      errorEmail &&
      errorMobile &&
      errorPassword &&
      errorRetypePsw
    ) {
      if (
        errorFirstName.valid === true &&
        errorLastName.valid === true &&
        errorEmail.valid === true &&
        errorMobile.valid === true &&
        errorPassword.valid === true &&
        errorRetypePsw.valid === true
      ) {
        setFormValid(true);
      } else {
        setFormValid(false);
      }
    } else {
      setFormValid(false);
    }
  }
  return (
    <div>
      <p style={{ margin: "40px 0px 0px 0px", padding: "0px 50px 0px" }}>
        Sign Up
      </p>
      <MDBContainer
        style={{
          margin: "10px auto 50px",
          backgroundColor: "#FFFFFF",
          padding: "20px",
        }}
      >
        <MDBRow>
          <MDBCol md="8" className={classes.card} style={{ margin: "0 auto" }}>
            <form>
                {signUpState && (
                  <>
                    {signUpState.ok === true ? (
                      <p className="success-prompt">{signUpState.message}</p>
                    ) : (
                      <p className="error-prompt">{signUpState.message}</p>
                    )}
                  </>
                )}
              <p className="h4 text-left mb-4">Personal Details</p>
              <MDBRow>
                <MDBCol md="6">
                  <label htmlFor="defaultFormRegisterNameEx">First name</label>
                  <input
                    type="text"
                    id="defaultFormRegisterNameEx"
                    className="form-control"
                    value={firstName}
                    onChange={async (event) => {
                      await setFirstName(event.target.value);
                      var firstNameValidationResult =
                        await InputValidation.validateName(event.target.value);
                      setErrorFirstName(firstNameValidationResult);
                    }}
                  />
                  <p className="p-errors">
                    {errorFirstName &&
                      (!errorFirstName.valid ? errorFirstName.message : "")}
                  </p>
                </MDBCol>

                <MDBCol md="6">
                  <label htmlFor="defaultFormRegisterNameEx">Last Name</label>
                  <input
                    type="text"
                    id="defaultFormRegisterNameEx"
                    className="form-control"
                    value={lastName}
                    onChange={async (event) => {
                      await setLastName(event.target.value);
                      var lastNameValidationResult =
                        await InputValidation.validateName(event.target.value);
                      setErrorLastName(lastNameValidationResult);
                    }}
                  />
                  <p className="p-errors">
                    {errorLastName &&
                      (!errorLastName.valid ? errorLastName.message : "")}
                  </p>
                </MDBCol>
              </MDBRow>
              <MDBRow>
                <MDBCol md="6">
                  <label htmlFor="defaultFormRegisterEmailEx">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="defaultFormRegisterEmailEx"
                    className="form-control"
                    value={email}
                    onChange={async (event) => {
                      await setEmail(event.target.value);
                      var emailValidationResult =
                        await InputValidation.validateEmail(event.target.value);
                      setErrorEmail(emailValidationResult);
                    }}
                  />
                  <p className="p-errors">
                    {errorEmail &&
                      (!errorEmail.valid ? errorEmail.message : "")}
                  </p>
                </MDBCol>

                <MDBCol md="6">
                  <label htmlFor="defaultFormRegisterMobileEx">
                    Mobile Number
                  </label>
                  <input
                    type="email"
                    id="defaultFormMobileEx"
                    className="form-control"
                    value={mobileNumber}
                    onChange={async (event) => {
                      await setMobileNumber(event.target.value);
                      var mobileNumberValidationResult =
                        await InputValidation.validateMobileNumber(
                          event.target.value
                        );
                      setErrorMobile(mobileNumberValidationResult);
                    }}
                  />
                  <p className="p-errors">
                    {errorMobile &&
                      (!errorMobile.valid ? errorMobile.message : "")}
                  </p>
                </MDBCol>
              </MDBRow>
              <MDBRow>
                <MDBCol md="6">
                  <label htmlFor="defaultFormRegisterPasswordEx">
                    Password
                  </label>
                  <input
                    type="password"
                    id="defaultFormRegisterPasswordEx"
                    className="form-control"
                    onChange={async (event) => {
                      await setPassword(event.target.value);
                      var passwordValidationResult =
                        await InputValidation.validateSignUpPassword(
                          event.target.value
                        );
                      setErrorPassword(passwordValidationResult);
                    }}
                  />
                  <p className="p-errors">
                    {errorPassword &&
                      (!errorPassword.valid ? errorPassword.message : "")}
                  </p>
                </MDBCol>

                <MDBCol md="6">
                  <label htmlFor="defaultFormRegisterPasswordEx">
                    Retype Password
                  </label>
                  <input
                    type="password"
                    id="defaultFormRegisterPasswordEx"
                    className="form-control"
                    onChange={async (event) => {
                      await setRetypePsw(event.target.value);
                      var retypePasswordValidationResult =
                        await InputValidation.validateRetypePassword(
                          password,
                          event.target.value
                        );
                      setErrorRetypePsw(retypePasswordValidationResult);
                    }}
                  />
                  <p className="p-errors">
                    {errorRetypePsw &&
                      (!errorRetypePsw.valid ? errorRetypePsw.message : "")}
                  </p>
                </MDBCol>
              </MDBRow>

              <div className="text-center mt-4">
                <MDBBtn
                disabled={!formValid}
                  color="red-text"
                  className="rounded amber"
                  onClick={async (event) => {
                    event.preventDefault();

                    var signUpResult = await signUp({
                      firstName,
                      lastName,
                      email,
                      mobileNumber,
                      password,
                    });

                    setSignUpState(signUpResult);
                    console.log(signUpResult);
                  }}
                >
                  Register
                </MDBBtn>
              </div>
            </form>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
}

export default SignUpPage;
