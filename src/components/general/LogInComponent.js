import React from "react";
import { useFirebase } from "react-redux-firebase";
import * as InputValidation from "../../services/inputValidation.js";

//Styles & Themes
import { MDBRow, MDBCol, MDBBtn, MDBCard, MDBCardBody } from "mdb-react-ui-kit";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
}));

function LogInComponent({ isShowLogin }) {
  const firebase = useFirebase();

  //Form State
  var [email, setEmail] = React.useState("");
  var [password, setPassword] = React.useState("");

  //Form Validation State
  var [errorEmail, setErrorEmail] = React.useState(null);
  var [errorPassword, setErrorPassword] = React.useState(null);
  var [formError, setFormError] = React.useState(null);

  //Log In User Function
  function logIn(email, password) {
    console.log("login Method");
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        /* Build Two
         Copy Shopping Cart of Anonyomous user that was there
         before and add to Logged In account's shopping cart.
         Then delete the Anonymouse Account. */
        setFormError({ message: "SuccessFull Login" });
      })
      .catch((error) => {
        console.log("Log In Error");
        setFormError({ message: "Login failed" });
      });
  }

  const classes = useStyles();

  return (
    <div className={`${!isShowLogin ? "active" : ""} show`}>
      <div className="login-form">
        <div className="form-box solid">
          <MDBCard>
            <MDBCardBody className={classes.root}>
              <form>
                <p className="h4 text-center py-4">LOGIN</p>
                <div>
                  <p>
                    {formError && (!formError.valid ? formError.message : "")}
                  </p>
                </div>
                <MDBRow>
                  <MDBCol md="12">
                    <label htmlFor="defaultFormRegisterNameEx">Email</label>
                    <input
                      type="text"
                      id="defaultFormRegisterNameEx"
                      placeholder="Enter username"
                      className="form-control"
                      value={email}
                      onChange={async (event) => {
                        await setEmail(event.target.value);
                        var emailValidationResult =
                          await InputValidation.validateEmail(
                            event.target.value
                          );
                        setErrorEmail(emailValidationResult);
                      }}
                    />
                    <p>
                      {errorEmail &&
                        (!errorEmail.valid ? errorEmail.message : "")}
                    </p>
                    <br />
                  </MDBCol>
                </MDBRow>
                <MDBRow>
                  <MDBCol md="12">
                    <label htmlFor="defaultFormRegisterPasswordEx">
                      Password
                    </label>

                    <input
                      type="password"
                      id="defaultFormRegisterPasswordEx"
                      placeholder="Enter Password"
                      className="form-control"
                      value={password}
                      onChange={async (event) => {
                        await setPassword(event.target.value);
                        var passwordValidationResult =
                          await InputValidation.validateLogInPassword(
                            event.target.value
                          );
                        console.log(passwordValidationResult);
                        setErrorPassword(passwordValidationResult);
                      }}
                    />
                    <p>
                      {errorPassword &&
                        (!errorPassword.valid ? errorPassword.message : "")}
                    </p>
                    <p className="font-small blue-text d-flex justify-content-end pb-3">
                      <a href="/src/components/pages/ProductPage.js">
                        Forgot Password?
                      </a>
                    </p>
                  </MDBCol>
                </MDBRow>

                <div className="text-center mt-4">
                  <MDBBtn color="red-text" className="rounded amber">
                    LOGIN
                  </MDBBtn>
                  <p>
                    New Customer? <a href="/sign-up">Register Now</a>
                  </p>
                </div>
              </form>
            </MDBCardBody>
          </MDBCard>
        </div>
      </div>
    </div>
  );
}

export default LogInComponent;
