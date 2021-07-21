import { getFirebase } from "react-redux-firebase";
function createGuestUser() {
  const firebase = getFirebase();

  firebase.auth().signInAnonymously().then(()=>{
      //Anonyomous Account Created
      // Use Backend and Create New User in Database
      console.log("Anonyomous User");
  })
}

export default createGuestUser;
