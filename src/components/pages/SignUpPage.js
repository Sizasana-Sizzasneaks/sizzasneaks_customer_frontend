import React from "react";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { useFirebase } from "react-redux-firebase";
import { makeStyles } from "@material-ui/core/styles";
import "mdbreact/dist/css/mdb.css";
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from "mdb-react-ui-kit";
import LinearProgress from "@material-ui/core/LinearProgress";
import { getUserProfile } from "../../redux/actions/profile";
import * as InputValidation from "../../services/inputValidation.js";
import { signUp } from "../../services/authentication.js";
import Button from "../general/Button.js";

// This is the Sign up page
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
  const history = useHistory();
  const firebase = useFirebase();
  const dispatch = useDispatch();

  //state manage of the form input fields
  var [firstName, setFirstName] = React.useState("");
  var [lastName, setLastName] = React.useState("");
  var [email, setEmail] = React.useState("");
  var [mobileNumber, setMobileNumber] = React.useState("");
  var [password, setPassword] = React.useState("");
  var [retypePsw, setRetypePsw] = React.useState("");

  //input Validation
  var [errorFirstName, setErrorFirstName] = React.useState(null);
  var [errorLastName, setErrorLastName] = React.useState(null);
  var [errorEmail, setErrorEmail] = React.useState(null);
  var [errorMobile, setErrorMobile] = React.useState(null);
  var [errorPassword, setErrorPassword] = React.useState(null);
  var [errorRetypePsw, setErrorRetypePsw] = React.useState(null);
  var [signUpState, setSignUpState] = React.useState(null);
  var [loading, setLoading] = React.useState(false);
  var [formValid, setFormValid] = React.useState(false);

  const classes = useStyles();

  React.useEffect(() => {
    checkFormValid();
  }, [
    errorFirstName,
    errorLastName,
    errorEmail,
    errorMobile,
    errorPassword,
    errorRetypePsw,
  ]);
  //function below checks if all the feilds are filled or no and if the data provided is in correct format
  function checkFormValid() {
    if (
      errorFirstName && //if all the fields are provided only then proceed to next if statemen
      errorLastName &&
      errorEmail &&
      errorMobile &&
      errorPassword &&
      errorRetypePsw
    ) {
      if (
        errorFirstName.valid === true && //this checks if all the information provided is in right format
        errorLastName.valid === true &&
        errorEmail.valid === true &&
        errorMobile.valid === true &&
        errorPassword.valid === true &&
        errorRetypePsw.valid === true
      ) {
        setFormValid(true); //if everything is fine then setFormValid is set to true otherwise false
      } else {
        setFormValid(false);
      }
    } else {
      setFormValid(false); //setFormValid is set false all the info in not provided
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
              {loading && (
                <div style={{ paddingTop: "10px", paddingBottom: "20px" }}>
                  <LinearProgress />
                </div>
              )}
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
                      setErrorFirstName(firstNameValidationResult); //checks the FirstName for input validation shows error if not in correct format
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
                      setErrorLastName(lastNameValidationResult); //checks the LastName for input validation shows error if not in correct format
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
                      setErrorEmail(emailValidationResult); //checks the Email for input validation throgh validateEmail shows error if not in correct format
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
                        ); //checks the MobileNumber for input validation shows error if not in correct format
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
                    value={password}
                    onChange={async (event) => {
                      await setPassword(event.target.value);
                      var passwordValidationResult =
                        await InputValidation.validateSignUpPassword(
                          event.target.value
                        ); //checks the Passord for input validation shows error if all the requiured criteria is not met
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
                    value={retypePsw}
                    id="defaultFormRegisterPasswordEx"
                    className="form-control"
                    onChange={async (event) => {
                      await setRetypePsw(event.target.value);
                      var retypePasswordValidationResult =
                        await InputValidation.validateRetypePassword(
                          password,
                          event.target.value
                        ); //checks if both the passwords are same or not
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
                <Button
                  disabled={!formValid}
                  label="Sign Up"
                  className="rounded amber"
                  styles={{
                    backgroundColor: "#FFC107",
                    padding: "15px 25px",
                    fontSize: "16px",
                  }}
                  onClick={async (event) => {
                    // event.preventDefault();
                    setSignUpState(null);
                    setLoading(true);
                    //signUpResult is used to see if the sign was sucessfull
                    var signUpResult = await signUp({
                      firstName,
                      lastName,
                      email,
                      mobileNumber,
                      password,
                    });
                    setLoading(false);
                    setSignUpState(signUpResult);

                    if (signUpResult.ok === true) {
                      //Clear Fields
                      setFirstName("");
                      setLastName("");
                      setEmail("");
                      setMobileNumber("");
                      setPassword("");
                      setRetypePsw("");

                      setErrorFirstName(null);
                      setErrorLastName(null);
                      setErrorEmail(null);
                      setErrorMobile(null);
                      setErrorPassword(null);
                      setErrorRetypePsw(null);

                      dispatch(getUserProfile());

                      setTimeout(() => {
                        history.push("/");
                      }, 2000);
                    } else {
                      setEmail("");
                      setPassword("");
                      setRetypePsw("");

                      setErrorEmail(null);
                      setErrorPassword(null);
                      setErrorRetypePsw(null);
                    }
                  }}
                />
              </div>
            </form>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
}

export default SignUpPage;
