import { getFirebase } from "react-redux-firebase";
import * as USER_API from "../api/users.js";
import store from "../redux/index.js";
import { getUserProfile } from "../redux/actions/profile.js";


// Firebase Fuction for Logging In a User.
export const logIn = (email, password) => {
  var firebase = getFirebase();

  return firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((user) => {
      /* Build Two
         Copy Shopping Cart of Anonyomous user that was there
         before and add to Logged In account's shopping cart.
         Then delete the Anonymouse Account. */
      return { ok: true, message: null };
    })
    .catch((error) => {
      console.log("Log In Error");
      console.log("error");
      return { ok: false, message: "Log In Error" };
    });
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
  console.log("SignUp Method");
  var firebase = getFirebase();

  var credential = firebase.auth.EmailAuthProvider.credential(email, password);
  var user = firebase.auth().currentUser;

  await user.linkWithCredential(credential);

  var getTokenResult = await getCurrentUserIdToken();

  if (getTokenResult.ok === true) {
    var updateDetailsCallResult = await USER_API.updateUserDetails({
      firstName,
      lastName,
      email,
      mobileNumber,
    });

    if (updateDetailsCallResult.ok === true) {
      var signOutResult = await signOutCurrentUser();
      if (signOutResult.ok === true) {
        var logInResult = await logIn(email, password);

        if (logInResult.ok === true) {
          store.dispatch(getUserProfile());
          return { ok: true, data: "Succesfull Sign Up" };
        } else {
          //Failed Login User
          return logInResult;
        }
      } else {
        // Failed To Sign Out
        return signOutResult;
      }
    } else {
      // Update Backend Failed
      return updateDetailsCallResult;
    }
  } else {
    //Failed to Get Token
    return getTokenResult;
  }
};

//Firebase Fuction for Logging Out the Current User
export const signOutCurrentUser = () => {
  var firebase = getFirebase();

  return firebase
    .auth()
    .signOut()
    .then(() => {
      return { ok: true };
    })
    .catch((error) => {
      return { ok: false, error: error };
    });
};

//Firebase Fuction for getting the ID Token of the Current User

export const getCurrentUserIdToken = () => {
  var firebase = getFirebase();

  return firebase
    .auth()
    .currentUser.getIdToken(true)
    .then((idToken) => {
      return { ok: true, data: idToken };
      
    })
    .catch((error) => {
      return { ok: false, error: error };
    });
};
