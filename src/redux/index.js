import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import Reducers from "./reducers/index.js";
import { composeWithDevTools } from "redux-devtools-extension";

const store = createStore(
    Reducers,
    +window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    composeWithDevTools(applyMiddleware(thunk))
  );
  
  export default store;
  