import * as Yup from "yup";

//First Name & Last Name validation Schema and Function Logic
const nameSchema = Yup.object().shape({
  name: Yup.string("Please enter a string").required("Required")
    .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field ")
    .max(50)
    
});

export const validateName = (name) => {
  return nameSchema
    .validate({ name: name })
    .then(() => {
      return { valid: true, message: null };
    })
    .catch((error) => {
      return { valid: false, message: error.errors[0] };
    });
};

//Email Validation Schema and Fuction Logic
const emailSchema = Yup.object().shape({
  email: Yup.string("Please Enter a String")
    .email("Invalid email address")
    .required("Required"),
});

export const validateEmail = (email) => {
  return emailSchema
    .validate({ email: email })
    .then(() => {
      console.log("validateEmail - work");
      return { valid: true, message: null };
    })
    .catch((error) => {
      console.log("validateEmail - Fail");
      return { valid: false, message: error.errors[0] };
    });
};

//Mobile Number Validation Schema and Fuction Logic
const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const mobileNumberSchema = Yup.object().shape({
  mobileNumber: Yup.string("Please enter a string")
    .matches(phoneRegExp, "Phone number is not valid")
    .min(10)
    .required("Required"),
});

export const validateMobileNumber = (mobileNumber) => {
  return mobileNumberSchema
    .validate({ mobileNumber: mobileNumber })
    .then(() => {
      return { valid: true, message: null };
    })
    .catch((error) => {
      return { valid: false, message: error.errors[0] };
    });
};

//Sign Up Password Validation Schema and Fuction Logic
const signUpPasswordSchema = Yup.object().shape({
  password: Yup.string("Please enter a string")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
    )
    .required("Required"),
});

export const validateSignUpPassword = (password) => {
  return signUpPasswordSchema
    .validate({ password: password })
    .then(() => {
      return { valid: true, message: null };
    })
    .catch((error) => {
      return { valid: false, message: error.errors[0] };
    });
};

//Log In Password Validation Schema and Fuction Logic
const loginPasswordSchema = Yup.object().shape({
  password: Yup.string("Please enter a string").required("Required"),
});

export const validateLogInPassword = (password) => {
  return loginPasswordSchema
    .validate({ password: password })
    .then(() => {
      return { valid: true, message: null };
    })
    .catch((error) => {
      return { valid: false, message: error.errors[0] };
    });
};

//Retype Password Validation Schema and Fuction Logic
export const validateRetypePassword = (password, retypePassword) => {

  const retypePasswordSchema = Yup.object().shape({
    retypePassword: Yup.string()
      .test("mactch", "Password does not match", (retypePasswordCheck) => {
        return retypePasswordCheck === password;
      })
      .required("Confirm Password is required"),
  });

  return retypePasswordSchema
    .validate({ retypePassword: retypePassword })
    .then(() => {
      return { valid: true, message: null };
    })
    .catch((error) => {
      return { valid: false, message: error.errors[0] };
    });
};
