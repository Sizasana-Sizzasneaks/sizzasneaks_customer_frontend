import React from "react";
import * as Yup from "yup";
import axios from "axios";
import { useFirebase } from "react-redux-firebase";
import { makeStyles } from "@material-ui/core/styles";
import "mdbreact/dist/css/mdb.css";
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from "mdb-react-ui-kit";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
}));

//The following are schemas used to display error message
const firstNameSchema = Yup.object().shape({
  firstName: Yup.string("Please enter a string")
    .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field ")
    .max(50)
    .required("Required"),
});

const lastNameSchema = Yup.object().shape({
  lastName: Yup.string("Please enter a string")
    .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field ")
    .max(50)
    .required("Required"),
});

const emailSchema = Yup.object().shape({
  email: Yup.string("Please Enter a String")
    .email("Invalid email address")
    .required("Required"),
});

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const mobileNumberSchema = Yup.object().shape({
  mobileNumber: Yup.string("Please enter a string")
    .matches(phoneRegExp, "Phone number is not valid")
    .min(10)
    .required("Required"),
  //.phone()
});

const passwordSchema = Yup.object().shape({
  password: Yup.string("Please enter a string")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
    )
    .required("Required"),
});

function SignUpPage() {
  const firebase = useFirebase();

  //state manage of the form input fields
  var [firstName, setFirstName] = React.useState("");
  var [lastName, setLastName] = React.useState("");
  var [email, setEmail] = React.useState("");
  var [mobileNumber, setMobileNumber] = React.useState("");
  var [password, setPassword] = React.useState("");
  var [retypePsw, setRetypePsw] = React.useState("");

  //Validation
  var [errorEmail, setErrorEmail] = React.useState(null);
  var [errorPassword, setErrorPassword] = React.useState(null);
  var [errorRetypePsw, setErrorRetypePsw] = React.useState(null);
  var [errorFirstName, setErrorFirstName] = React.useState(null);
  var [errorLastName, setErrorLastName] = React.useState(null);
  var [signUpFail, setErrorSignUp] = React.useState(null);
  var [errorMobile, setErrorMobile] = React.useState(null);

  React.useEffect(() => {
    validateFirstName();
    validateLastName();
    validateMobileNumber();
    validateEmail();
    validatePassword();
    validateRetypePsw();
  }, [firstName, lastName, mobileNumber, email, password, retypePsw]);

  const retypePasswordSchema = Yup.object().shape({
    retypepassword: Yup.string()
      .test("mactch", "Password does not match", (retypePasswordCheck) => {
        return retypePasswordCheck === password;
      })
      .required("Confirm Password is required"),
  });

  // Change this sign up to an Accout conversion, where the current Anonyous account becomes a credential account.
  function signUp() {
    console.log("SignUp Method");

    // firebase
    //   .auth()
    //   .currentUser.getIdToken(true)
    //   .then((idToken) => {
    //     const config = {
    //       headers: { Authorization: "Bearer " + idToken },
    //     };

    //     console.log(idToken);

    //     axios
    //       .post("http://localhost:5000/user", { hey: "test" }, config)
    //       .then(() => {
    //         console.log("Then");
    //       })
    //       .catch((error) => {
    //         console.log("error");
    //         console.log(error);
    //       });
    //   });

    // firebase
    //   .auth()
    //   .createUserWithEmailAndPassword(email, password)
    //   .then((user) => {
    //     console.log("Im In");
    //     setErrorSignUp({ message: "Successful SignUp" });
    //   })
    //   .catch((error) => {
    //     console.log("Sign In Error");
    //     setErrorSignUp({
    //       message: "Failed SignUp, Please verify all fields are valid",
    //     });
    //   });
  }

  function validateFirstName() {
    firstNameSchema
      .validate({ firstName: firstName })
      .then(() => {
        setErrorFirstName({ valid: true, message: "" });
        console.log("checked name");
      })
      .catch((error) => {
        setErrorFirstName({ valid: false, message: error.errors[0] });
      });
  }

  function validateLastName() {
    lastNameSchema
      .validate({ lastName: lastName })
      .then(() => {
        setErrorLastName({ valid: true, message: "" });
        console.log("checked name");
      })
      .catch((error) => {
        setErrorLastName({ valid: false, message: error.errors[0] });
      });
  }

  function validateEmail() {
    emailSchema
      .validate({ email: email })
      .then(() => {
        setErrorEmail({ valid: true, message: "" });
        console.log("check email");
      })
      .catch((error) => {
        setErrorEmail({ valid: false, message: error.errors[0] });
      });
  }
  function validateMobileNumber() {
    mobileNumberSchema
      .validate({ mobileNumber: mobileNumber })
      .then(() => {
        setErrorMobile({ valid: true, message: "" });
        console.log("check mobile");
      })
      .catch((error) => {
        setErrorMobile({ valid: false, message: error.errors[0] });
      });
  }
  function validatePassword() {
    passwordSchema
      .validate({ password: password })
      .then(() => {
        setErrorPassword({ valid: true, message: "Strong is Password" });
        console.log("check password");
      })
      .catch((error) => {
        setErrorPassword({ valid: false, message: error.errors[0] });
      });
  }

  function validateRetypePsw() {
    retypePasswordSchema
      .validate({ retypepassword: retypePsw })
      .then(() => {
        setErrorRetypePsw({ valid: true, message: "" });
        console.log("check confirm psw");
      })
      .catch((error) => {
        setErrorRetypePsw({ valid: false, message: error.errors[0] });
      });
  }

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
                    onChange={(event) => {
                      setFirstName(event.target.value);
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
                    onChange={(event) => {
                      setLastName(event.target.value);
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
                    onChange={(event) => {
                      setEmail(event.target.value);
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
                    onChange={(event) => {
                      setMobileNumber(event.target.value);
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
                    onChange={(event) => {
                      setPassword(event.target.value);
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
                    onChange={(event) => {
                      setRetypePsw(event.target.value);
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
                  onClick={(event) => {
                    event.preventDefault();
                    console.log("clicked");
                    signUp();
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
