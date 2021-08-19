import { getFirebase } from "react-redux-firebase";
import * as USER_API from "../api/users.js";
import store from "../redux/index.js";
import { getUserProfile } from "../redux/actions/profile.js";

// Firebase Fuction for Logging In a User.
export const logIn = async (email, password) => {
  var firebase = getFirebase();

  var output;
  await firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((user) => {
      /* Build Two
         Copy Shopping Cart of Anonyomous user that was there
         before and add to Logged In account's shopping cart.
         Then delete the Anonymouse Account. */

      store.dispatch(getUserProfile());
      output = { ok: true, message: "Log In Succesfull" };
    })
    .catch((error) => {
      console.log(error.code);
      console.log(error.message);
      if (
        error.code === "auth/user-not-found" ||
        error.code === "auth/wrong-password" ||
        error.code === "auth/too-many-requests"
      ) {
        output = {
          ok: false,
          message: "Invalid Log In Credentials, Try Again",
        };
      } else {
        output = { ok: false, message: "Log In Unsuccesfull" };
      }
    });

  return output;
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

  return { ok: true, message: "Sign Up Succesfull" };
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
      console.log(idToken);
      output = { ok: true, data: idToken };
    })
    .catch((error) => {
      output = { ok: false, message: "Failed to get Id Token" };
    });
  return output;
};

export const createGuestUser = async () => {
  const firebase = getFirebase();

  firebase
    .auth()
    .signInAnonymously()
    .then(() => {
      //Anonyomous Account Created
      // Use Backend and Create New User in Database

      USER_API.createNewUser({ isAnonymous: true });

      console.log("Anonyomous User");
    });
};

//Helper Functions

function authErrorHandling(error) {
  var output;
  if (error.code === "auth/email-already-in-use") {
    output = { ok: false, message: "Email Address already in Use" };
  } else if (error.code === "auth/invalid-email") {
    output = { ok: false, message: "Invalid Email Address" };
  } else if (error.code === "auth/weak-password") {
    output = { ok: false, message: "Password too weak" };
  } else {
    output = { ok: false, message: "Sign Up Unsuccesfull" };
  }
  return output;
}
