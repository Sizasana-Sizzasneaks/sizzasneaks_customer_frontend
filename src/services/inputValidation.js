import * as Yup from "yup";

//First Name & Last Name validation Schema and Function Logic
const nameSchema = Yup.object().shape({
  name: Yup.string("Please enter a String")
    .required("Required")
    .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field ")
    .max(50),
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

export const validateAddressName = (name) => {
  return nameSchema
    .validate({ name: name })
    .then(() => {
      return { ok: true, message: null };
    })
    .catch((error) => {
      return { ok: false, message: error.errors[0] };
    });
};

//Email Validation Schema and Fuction Logic
const emailSchema = Yup.object().shape({
  email: Yup.string("Please enter a String")
    .email("Invalid email address")
    .required("Required")
    .nullable(),
});

export const validateEmail = (email) => {
  return emailSchema
    .validate({ email: email })
    .then(() => {
      return { valid: true, message: null };
    })
    .catch((error) => {
      return { valid: false, message: error.errors[0] };
    });
};

//Mobile Number Validation Schema and Fuction Logic
const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const mobileNumberSchema = Yup.object().shape({
  mobileNumber: Yup.string("Please enter a string")
    .matches(phoneRegExp, "Phone number is invalid")
    .min(10, "Must have 10 digits.")
    .max(10, "Must have 10 digits.")
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

// Contact Number on Shipping Page
export const validateContactNumber = (mobileNumber) => {
  return mobileNumberSchema
    .validate({ mobileNumber: mobileNumber })
    .then(() => {
      return { ok: true, message: null };
    })
    .catch((error) => {
      return { ok: false, message: error.errors[0] };
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
  password: Yup.string("Please enter a string").required("Required").nullable(),
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
      .test("match", "Password does not match", (retypePasswordCheck) => {
        return retypePasswordCheck === password;
      })
      .required("Password confirmation required"),
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

//Input Validation for Write Review Field

//Rating Score

export const validateRatingScore = (rating) => {
  const ratingScoreSchema = Yup.object().shape({
    rating: Yup.number("Rating must be an Intager number.")
      .test("match", "Rating Required", () => {
        return rating !== 0;
      })
      .min(1, "Score must be between 1 & 5")
      .max(5, "Score must be between 1 & 5")
      .required("Required"),
  });

  return ratingScoreSchema
    .validate({ rating: rating })
    .then(() => {
      return { valid: true, message: null };
    })
    .catch((error) => {
      return { valid: false, message: error.errors[0] };
    });
};

//Rating Body(Message)

const ratingBodySchema = Yup.object().shape({
  ratingBody: Yup.string("Please enter a string").required("Required"),
});

export const validateRatingBody = (ratingBody) => {
  return ratingBodySchema
    .validate({ ratingBody: ratingBody })
    .then(() => {
      return { valid: true, message: null };
    })
    .catch((error) => {
      return { valid: false, message: error.errors[0] };
    });
};

// Basic String
const basicStringSchema = Yup.object().shape({
  text: Yup.string("Please enter a string")
    .required("Required")
    .max(50)
    .nullable(),
});

export const validateBasicString = (text) => {
  return basicStringSchema
    .validate({ text: text })
    .then(() => {
      return { ok: true, message: null };
    })
    .catch((error) => {
      return { ok: false, message: error.errors[0] };
    });
};

// Basic String
const deliveryInstructionSchema = Yup.object().shape({
  text: Yup.string("Please enter a string").max(300).required("Required"),
});

export const validateDeliveryInstructionString = (text) => {
  return deliveryInstructionSchema
    .validate({ text: text })
    .then(() => {
      return { ok: true, message: null };
    })
    .catch((error) => {
      return { ok: false, message: error.errors[0] };
    });
};

// Zip code
const zipCodeSchema = Yup.object().shape({
  text: Yup.number("Please enter a ZipCode")
    .min(1000, "Invalid Zip Code")
    .max(9999, "Invalid Zip Code")
    .required()
    .typeError("Invalid Zip Code"),
});

export const validateZipCode = (text) => {
  return zipCodeSchema
    .validate({ text: text })
    .then(() => {
      return { ok: true, message: null };
    })
    .catch((error) => {
      return { ok: false, message: error.errors[0] };
    });
};

const addressSelectedSchema = Yup.object().shape({
  addressId: Yup.string("Please enter a string")
    .required("Shipping address required")
    .nullable(),
});

export const validateAddressSelected = (addressId) => {
  return addressSelectedSchema
    .validate({ addressId: addressId })
    .then(() => {
      return { ok: true, message: null };
    })
    .catch((error) => {
      return { ok: false, message: error.errors[0] };
    });
};

const locationNameSchema = Yup.object().shape({
  locationName: Yup.string("Please enter a String")
    .required("Required")
    .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field ")
    .max(50),
});

export const validateLocationName = (locationName) => {
  return locationNameSchema
    .validate({ locationName: locationName })
    .then(() => {
      return { ok: true, message: null };
    })
    .catch((error) => {
      return { ok: false, message: error.errors[0] };
    });
};

//Card Details Validation
const cardNumberReg =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const cardNumberSchema = Yup.object().shape({
  cardNumber: Yup.string()
    .required("Required")
    .matches(cardNumberReg, "Invalid Card Number")
    .typeError("Invalid Card Number"),
});

export const validateCardNumber = (cardNumber) => {
  return cardNumberSchema
    .validate({ cardNumber: cardNumber })
    .then(() => {
      return { ok: true, message: null };
    })
    .catch((error) => {
      return { ok: false, message: error.errors[0] };
    });
};

//Expiry Month
const expiryMonthSchema = Yup.object().shape({
  month: Yup.number()
    .required("Required")
    .min(1, "Invalid Month")
    .max(12, "Invalid Month")
    .typeError("Invalid Month"),
});

export const validateExpiryMonth = (month) => {
  return expiryMonthSchema
    .validate({ month: month })
    .then(() => {
      return { ok: true, message: null };
    })
    .catch((error) => {
      return { ok: false, message: error.errors[0] };
    });
};

//Expiry Year
const expiryYearSchema = Yup.object().shape({
  year: Yup.number()
    .required("Required")
    .min(2000, "Invalid Year")
    .max(2030, "Invalid Year")
    .typeError("Invalid Year"),
});

export const validateExpiryYear = (year) => {
  return expiryYearSchema
    .validate({ year: year })
    .then(() => {
      return { ok: true, message: null };
    })
    .catch((error) => {
      return { ok: false, message: error.errors[0] };
    });
};

const cvvSchema = Yup.object().shape({
  cvv: Yup.number()
    .required("Required")
    .min(1, "Invalid CVV")
    .max(9999, "Invalid CVV")
    .typeError("Invalid CVV"),
});

export const validateCvv = (cvv) => {
  return cvvSchema
    .validate({ cvv: cvv })
    .then(() => {
      return { ok: true, message: null };
    })
    .catch((error) => {
      return { ok: false, message: error.errors[0] };
    });
};
