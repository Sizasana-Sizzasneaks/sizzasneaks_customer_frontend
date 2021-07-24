import React from "react";
import * as Yup from "yup";
import { useFirebase } from "react-redux-firebase";

import { MDBRow, MDBCol, MDBBtn, MDBCard, MDBCardBody } from "mdb-react-ui-kit";
import { makeStyles } from "@material-ui/core/styles";

const emailSchema = Yup.object().shape({
  email: Yup.string("Please Enter a String")
    .email("Invalid email address")
    .required("Required"),
});

const passwordSchema = Yup.object().shape({
  password: Yup.string("Please enter a string")
      .required("Required"),
});

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
}));

const LogInComponent = ({ isShowLogin }) => {
  const firebase = useFirebase();

  var [email, setEmail] = React.useState("");
  var [password, setPassword] = React.useState("");

  //Validation
  var [errorEmail, setErrorEmail] = React.useState(null);
  var [errorPassword, setErrorPassword] = React.useState(null);
  var [formError, setFormError]=React.useState(null);

  React.useEffect(() => {
    validateEmail();
    validatePassword();
  }, [email, password]);

  function logIn(email, password) {
    console.log("login Method");
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        // Copy Shopping Cart of Anonyomouse user that was there before and add to Logged In accounts shopping cart.
        //Then delete the Anonymouse Account.
        console.log("Im In");
        setFormError({message:"SuccessFull Login"})
      })
      .catch((error) => {
        console.log("Log In Error");
        setFormError({message:"Login failed"})
      });
  }

  function validateEmail() {
    emailSchema
      .validate({ email: email })
      .then(() => {
        setErrorEmail({ valid: true, message: "" });
      })
      .catch((error) => {
        setErrorEmail({ valid: false, message: error.errors[0] });
      });
  }

  function validatePassword() {
    passwordSchema
      .validate({ password: password })
      .then(() => {
        setErrorPassword({ valid: true, message: "" });
      })
      .catch((error) => {
        setErrorPassword({ valid: false, message: error.errors[0] });
      });
  }

  const classes = useStyles();

  return (
    <div className={`${!isShowLogin ? "active" : ""} show`}>
      <div className="login-form">
        <div className="form-box solid">
          {/* <MDBContainer > */}
          <MDBCard>
            <MDBCardBody className={classes.root}>
              <form>
                <p className="h4 text-center py-4">LOGIN</p>
                <div>
                  <p> 
                    {formError &&
                        (!formError.valid ? formError.message : "")}
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
                      onChange={(event) => {
                        setEmail(event.target.value);
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
                      onChange={(event) => {
                        setPassword(event.target.value);
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
                  <MDBBtn
                    color="red-text"
                    className="rounded amber"
                    // type="submit"
                    onClick={(event) => {
                      event.preventDefault();
                      console.log("clicked");
                        logIn(email, password);
                    }}
                  >
                    LOGIN
                  </MDBBtn>
                  <p>
                    New Customer? <a href="/sign-up">Register Now</a>
                  </p>
                </div>
              </form>
            </MDBCardBody>
          </MDBCard>
          {/* </MDBContainer>  */}
        </div>
      </div>
    </div>
  );
};

export default LogInComponent;
