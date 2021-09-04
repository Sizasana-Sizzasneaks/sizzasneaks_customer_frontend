import { getFirebase } from "react-redux-firebase";
import * as API from "../api/index.js";
import * as USER_API from "../api/users.js";
import store from "../redux/index.js";
import { getUserProfile } from "../redux/actions/profile.js";
import { getCart, addToCart } from "../api/cart.js";
import { logInUser } from "../api/users.js";

// Firebase Fuction for Logging In a User.
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
        console.log("Credential Log In Done");
        store.dispatch(getUserProfile());
        logInUser();
        output = { ok: true, message: "Log in successful" };
      })
      .catch((error) => {
        output = { ok: false, message: "Log In Unsuccessful" };
      });

    while (!state.firebase.auth.isLoaded) {
      setTimeout(() => {
        console.log("Logged In Auth State Not Ready");
      }, 1000);
    }

    if (wasAnonymous) {
      await anonymousUserCart.cart.forEach(async (cartItem) => {
        var addToCartResult = await addToCart(
          cartItem.product_id,
          cartItem.option
        );

        if (!addToCartResult.ok) {
          console.log(
            "Failed to transfer Anonymous User Cart Item to Known User Cart"
          );
        }
      });
    }

    return output;
  } catch {
    return { ok: false, message: "Error When Logging In User" };
  }
};

// Firebase Fuction for Signing Up a New User.
// This involves convering the anonymous account on device to a permanent account.
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

  return { ok: true, message: "Sign Up Successful" };
};

async function upgradeAnonymousAccount(email, password) {
  var firebase = await getFirebase();

  var credential = firebase.auth.EmailAuthProvider.credential(email, password);
  var user = await firebase.auth().currentUser;

  var output;
  await user
    .linkWithCredential(credential)
    .then(() => {
      output = { ok: true, message: "Account Upgrade Succesfull" };
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
      output = { ok: true, message: "Sign Up Succesfull" };
    })
    .catch((error) => {
      output = authErrorHandling(error);
    });

  return output;
}

//Firebase Fuction for Logging Out the Current User
export const signOutCurrentUser = () => {
  var firebase = getFirebase();

  return firebase
    .auth()
    .signOut()
    .then(() => {
      return { ok: true, message: "Sign Out Succesfull" };
    })
    .catch((error) => {
      return { ok: false, message: "Sign Out Failed" };
    });
};

//Firebase Fuction for getting the ID Token of the Current User
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
      output = { ok: false, message: "Failed to get Id Token" };
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
        //Anonyomous Account Created
        // Use Backend and Create New User in Database

        await USER_API.createNewUser({ isAnonymous: true });
      });

    const state = store.getState();

    //Making Sure that the Anonymous User is created and fully authenticated before returning.
    while (!state.firebase.auth.isLoaded || !state.firebase.auth.isAnonymous) {
      setTimeout(() => {
        console.log("Anonymous Auth State Not Ready");
      }, 1000);
    }

    return { ok: true, message: "Anonymous User Fully Signed In" };
  } catch {
    return { ok: false, message: "Failed To Authenticate Anonymous User" };
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
      output = { ok: true, message: "Password Reset Email sent to " + email };
    })
    .catch((error) => {
      if (error.code === "auth/user-not-found") {
        output = { ok: true, message: "Password Reset Email sent to " + email };
      } else {
        output = { ok: false, message: "Failed to Send Reset Email" };
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
