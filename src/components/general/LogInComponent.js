import React from "react";
import * as InputValidation from "../../services/inputValidation.js";
import { logIn } from "../../services/authentication.js";
import { Link } from "react-router-dom";

//Styles & Themes
import { MDBRow, MDBCol, MDBBtn, MDBCard, MDBCardBody } from "mdb-react-ui-kit";
import { makeStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";
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
function LogInComponent({ isShowLogin }) {
  //Form State
  var [email, setEmail] = React.useState("");
  var [password, setPassword] = React.useState("");

  //Form Validation State
  //input validation 
  var [errorEmail, setErrorEmail] = React.useState(null);
  var [errorPassword, setErrorPassword] = React.useState(null);
  var [logInState, setLogInState] = React.useState(null);
  var [formValid, setFormValid] = React.useState(false);
  var [loading, setLoading] = React.useState(false);

  const classes = useStyles();

  React.useEffect(() => {
    checkFormValid();
  }, [errorEmail && errorPassword]);

  function checkFormValid() {
    if (errorEmail && errorPassword) {
      if (errorEmail.valid === true && errorPassword.valid === true) {
        setFormValid(true);// if the Username and password is matches then set setFormValid to true 
      } else {
        setFormValid(false);// if the Username and password is matches then set setFormValid to false 
      }
    } else {
      setFormValid(false); //this if and else statement checks inputvalidation for Username and Password
    }
  }
//Code under here is visual components of log-in card 
  return (
    <div className={`${!isShowLogin ? "active" : ""} show`}>
      <div className="login-form">
        <div className="form-box solid">
          <MDBCard>
            <MDBCardBody className={classes.root}>
              <form>
                <p className="h4 text-center py-4">LOGIN</p>
                <div>
                  {loading && (
                    <div style={{ paddingTop: "10px", paddingBottom: "20px" }}>
                      <LinearProgress />
                    </div>
                  )}
                  {logInState && (
                    <>
                      {logInState.ok === true ? (
                        <p className="success-prompt">{logInState.message}</p>
                      ) : (
                        <p className="error-prompt">{logInState.message}</p>
                      )}
                    </>
                  )}
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
                    {/* <p className="font-small blue-text d-flex justify-content-end pb-3">
                      <a href="/src/components/pages/ProductPage.js">
                        Forgot Password?
                      </a>
                    </p> */}
                  </MDBCol>
                </MDBRow>

                <div className="text-center mt-4">
                  <MDBBtn
                    disabled={!formValid}
                    color="red-text"
                    className="rounded amber"
                    onClick={async (event) => {
                      event.preventDefault(); 
                      setLogInState(null);
                      setLoading(true); //function checks if email and password are correct and sets 
                      var logInResult = await logIn(email, password);
                      setLoading(false); //
                      setLogInState(logInResult);

                      if (logInResult.ok !== true) {
                        setErrorPassword(null);//if password or Username is false set both feilds to null
                        setPassword("");
                      }
                    }}
                  >
                    LOGIN
                  </MDBBtn>

                  <p>
                    New Customer?{" "}
                    <Link to="/sign-up">
                      <span> Register Now</span>
                    </Link>
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
