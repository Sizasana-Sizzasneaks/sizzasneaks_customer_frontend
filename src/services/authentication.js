import { getFirebase } from "react-redux-firebase";
import * as USER_API from "../api/users.js";
import store from "../redux/index.js";

import { getCart, addToCart } from "../api/cart.js";
import { logInUser } from "../api/users.js";

// Firebase Function for Logging In a User.
export const logIn = async (email, password) => {
  try {
    var wasAnonymous = false;
    var anonymousUserCart = {};
    const state = store.getState();

    if (!state.firebase.auth.isEmpty && state.firebase.auth.isAnonymous) {
      wasAnonymous = true;

      var getAnonymousUserCartResult = await getCart();

      if (getAnonymousUserCartResult.ok === true) {
        anonymousUserCart = getAnonymousUserCartResult.data;
      } else {
        wasAnonymous = false;
      }
    }
    var output = {};
    var firebase = getFirebase();
    await firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        logInUser();
        output = { ok: true, message: "Log In successful" };
      })
      .catch((error) => {
        output = { ok: false, message: "Log In unsuccessful" };
      });

    while (!state.firebase.auth.isLoaded) {
      setTimeout(() => {
        
      }, 1000);
    }

    if (wasAnonymous) {
      await anonymousUserCart.cart.forEach(async (cartItem) => {
        var addToCartResult = await addToCart(
          cartItem.product_id,
          cartItem.option
        );

        if (!addToCartResult.ok) {
          
        }
      });
    }

    return output;
  } catch {
    return { ok: false, message: "Error when logging in user" };
  }
};

// Firebase Function for Signing Up a New User.
// This involves converting the anonymous account on device to a permanent account.
// Then the user must be signed out and logged in again to register the account changes.
export const signUp = async ({
  firstName,
  lastName,
  email,
  mobileNumber,
  password,
}) => {
  const state = store.getState();

  if (state.firebase.auth.isEmpty || !state.firebase.auth.isAnonymous) {
    var vanillaSignUpResult = await vanillaSignUp(email, password);

    console.log(vanillaSignUpResult);
    if (vanillaSignUpResult.ok === true) {
      //Vanilla Sign Up Failed
      var createNewUserResult = await USER_API.createNewUser({
        firstName,
        lastName,
        email,
        mobileNumber,
        isAnonymous: false,
      });

      if (createNewUserResult.ok === false) {
        return createNewUserResult;
      }
    } else {
      //Vanilla SignUp Failed
      return vanillaSignUpResult;
    }
  } else {
    var upgradeAnonymousAccountResult = await upgradeAnonymousAccount(
      email,
      password
    );

    if (upgradeAnonymousAccountResult.ok === true) {
      var signOutResult = await signOutCurrentUser();
      if (signOutResult.ok === true) {
        var logInResult = await logIn(email, password);

        if (logInResult.ok === true) {
          var updateDetailsCallResult = await USER_API.updateUserDetails({
            firstName,
            lastName,
            email,
            mobileNumber,
            isAnonymous: false,
          });

          if (updateDetailsCallResult.ok === false) {
            return updateDetailsCallResult;
          }
        } else {
          //Failed Login User
          return logInResult;
        }
      } else {
        // Failed To Sign Out
        return signOutResult;
      }
    } else {
      //Failed Upgrade Account Returned
      return upgradeAnonymousAccountResult;
    }
  }

  var sendEmailVerificationEmailResult = await sendEmailVerificationEmail();

  if (sendEmailVerificationEmailResult.ok === true) {
    return {
      ok: true,
      message:
        "Sign up successful, " + sendEmailVerificationEmailResult.message,
    };
  } else {
    return { ok: true, message: "Sign up successful" };
  }
};

async function upgradeAnonymousAccount(email, password) {
  var firebase = await getFirebase();

  var credential = firebase.auth.EmailAuthProvider.credential(email, password);
  var user = await firebase.auth().currentUser;

  var output;
  await user
    .linkWithCredential(credential)
    .then(() => {
      output = { ok: true, message: "Account upgrade successful" };
    })
    .catch((error) => {
      output = authErrorHandling(error);
    });

  return output;
}

async function vanillaSignUp(email, password) {
  var firebase = getFirebase();

  var output;
  await firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((UserCredential) => {
      output = { ok: true, message: "Sign up successful" };
    })
    .catch((error) => {
      output = authErrorHandling(error);
    });

  return output;
}

export const sendEmailVerificationEmail = async () => {
  var firebase = getFirebase();
  var output = {};
  await firebase
    .auth()
    .currentUser.sendEmailVerification()
    .then(() => {
      output = {
        ok: true,
        message:
          "A verification email has been sent to " +
          firebase.auth().currentUser.email +
          ".",
      };
    })
    .catch(() => {
      output = {
        ok: false,
        message: "Failed to send Verification Email",
      };
    });

  return output;
};

//Firebase Function for Logging Out the Current User
export const signOutCurrentUser = () => {
  var firebase = getFirebase();

  return firebase
    .auth()
    .signOut()
    .then(() => {
      return { ok: true, message: "Sign out successful" };
    })
    .catch((error) => {
      return { ok: false, message: "Sign out failed" };
    });
};

//Firebase Function for getting the ID Token of the Current User
export const getCurrentUserIdToken = async () => {
  var firebase = getFirebase();
  var output;
  await firebase
    .auth()
    .currentUser.getIdToken(true)
    .then((idToken) => {
      output = { ok: true, data: idToken };
    })
    .catch((error) => {
      output = { ok: false, message: "Failed to authenticate user" };
    });
  return output;
};

export const createGuestUser = async () => {
  try {
    const firebase = getFirebase();
    await firebase
      .auth()
      .signInAnonymously()
      .then(async () => {
        //Anonymous Account Created
        // Use Backend and Create New User in Database

        await USER_API.createNewUser({ isAnonymous: true });
      });

    const state = store.getState();

    //Making Sure that the Anonymous User is created and fully authenticated before returning.
    while (!state.firebase.auth.isLoaded || !state.firebase.auth.isAnonymous) {
      setTimeout(() => {
        console.log("Anonymous auth state not ready");
      }, 1000);
    }

    return { ok: true, message: "Anonymous user fully signed in" };
  } catch {
    return { ok: false, message: "Failed to authenticate anonymous ser" };
  }
};

export const requestResetPassword = async (email) => {
  var actionCodeSettings = {
    url: window.location.href,
    handleCodeInApp: false,
  };
  var output = {};
  const firebase = getFirebase();
  await firebase
    .auth()
    .sendPasswordResetEmail(email, actionCodeSettings)
    .then(() => {
      output = { ok: true, message: "Password reset email sent to " + email };
    })
    .catch((error) => {
      if (error.code === "auth/user-not-found") {
        output = { ok: true, message: "Password reset email sent to " + email };
      } else {
        output = { ok: false, message: "Failed to send reset email" };
      }
    });

  return output;
};

//Helper Functions

function authErrorHandling(error) {
  var output;
  if (error.code === "auth/email-already-in-use") {
    output = { ok: false, message: "Email address already in use" };
  } else if (error.code === "auth/invalid-email") {
    output = { ok: false, message: "Invalid email address" };
  } else if (error.code === "auth/weak-password") {
    output = { ok: false, message: "Password too weak" };
  } else {
    output = { ok: false, message: "Sign up unsuccessful" };
  }
  return output;
}
