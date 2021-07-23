import { getFirebase } from "react-redux-firebase";
import axios from "axios";

function createGuestUser() {
  const firebase = getFirebase();

  firebase.auth().signInAnonymously().then(()=>{
      //Anonyomous Account Created
      // Use Backend and Create New User in Database

      firebase
      .auth()
      .currentUser.getIdToken(true)
      .then((idToken) => {
        const config = {
          headers: { Authorization: "Bearer " + idToken },
        };

        console.log(idToken);

        axios
          .post("http://localhost:5000/user",{}, config)
          .then(() => {
            console.log("Then");
          })
          .catch((error) => {
            console.log("error");
            console.log(error);
          });
      });

      console.log("Anonyomous User");
  })
}

export default createGuestUser;
