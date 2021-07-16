import { combineReducers } from "redux";

import {firebaseReducer} from "react-redux-firebase";

const reducers = combineReducers({
    firebase: firebaseReducer
})

export default reducers;