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
  var [signUpFail, setErrorSignUp] = React.useState(null);

  // Change this sign up to an Accout conversion, where the current Anonyous account becomes a credential account.
  // function signUp() {
  //   console.log("SignUp Method");

  //   var credential = firebase.auth.EmailAuthProvider.credential(
  //     email,
  //     password
  //   );

  //   var user = firebase.auth().currentUser;

  //   user
  //     .linkWithCredential(credential)
  //     .then(() => {
  //       console.log("Anonymous account successfully upgraded");
  //       firebase
  //         .auth()
  //         .signOut()
  //         .then(() => {
  //           user
  //             .getIdToken(true)
  //             .then((idToken) => {
  //               console.log(idToken);

  //               const config = {
  //                 headers: { Authorization: "Bearer " + idToken },
  //               };

  //               axios.patch(
  //                 "http://localhost:5000/user",
  //                 {
  //                   firstName,
  //                   lastName,
  //                   mobileNumber,
  //                   email,
  //                 },
  //                 config
  //               );
  //             })
  //             .then(() => {
  //               console.log("Patch Request Made");

  //               // Sign-out successfull
  //               console.log("Sign Out");
  //               firebase.auth().signInWithEmailAndPassword(email, password);
  //             })
  //             .then(() => {
  //               console.log("Sign Up Done");
  //               dispatch(getUserProfile());
  //             });
  //         });
  //     })
  //     .catch((error) => {
  //       console.log("Error upgrading anonymous account", error);
  //     });
  // }

  const classes = useStyles();
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
              <p>
                {signUpFail && (!signUpFail.valid ? signUpFail.message : "")}
              </p>
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
                  <p>
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
                  <p>
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
                  <p>
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
                  <p>
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
                  <p>
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
                  <p>
                    {errorRetypePsw &&
                      (!errorRetypePsw.valid ? errorRetypePsw.message : "")}
                  </p>
                </MDBCol>
              </MDBRow>

              <div className="text-center mt-4">
                <MDBBtn
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
