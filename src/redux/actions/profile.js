import axios from "axios";
import firebase from "../../config/firebaseConfig.js";

export const getUserProfile = () => {
  var user = firebase.auth().currentUser;
  return (dispatch) => {
    var data;

    user.getIdToken(true).then((idToken) => {
      const config = {
        headers: { Authorization: "Bearer " + idToken },
      };

      axios.get("http://localhost:5000/user", config).then((res) => {
        if (res.status === 200) {
          data = res.body;
        }
        dispatch({ type: "GET_USER_PROFILE", payload: data });
      });
    });
  };
};
