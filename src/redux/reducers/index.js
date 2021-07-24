import { combineReducers } from "redux";

import {firebaseReducer} from "react-redux-firebase";
import { profileState } from "./profile.js";

const reducers = combineReducers({
    firebase: firebaseReducer,
    profile: profileState
})

export default reducers;