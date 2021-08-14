import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";

//App Components
import Navbar from "./components/general/Navbar.js";
import Footer from "./components/general/Footer.js";
import { Container } from "react-bootstrap";

//Pages
import ProductsPage from "./components/pages/ProductsPage.js";
import ProductPage from "./components/pages/ProductPage.js";
import HomePage from "./components/pages/HomePage.js";
import SignUpPage from "./components/pages/SignUpPage.js";
import LogInComponent from "./components/general/LogInComponent.js";
import ShoppingCartPage from "./components/pages/ShoppingCartPage.js";

import store from "./redux/index.js";
import { isLoaded, isEmpty } from "react-redux-firebase";
import { getUserProfile } from "./redux/actions/profile.js";

function App() {
  var [loading, setLoading] = React.useState(true);

  const subscription = store.subscribe(appStart);

  async function appStart() {
    if (isLoaded(store.getState().firebase.auth)) {
      if (isEmpty(store.getState().firebase.auth)) {
        subscription();
        console.log("Called ME");
        setLoading(false);
      } else {
      
        subscription();
        await store.dispatch(getUserProfile());
        console.log("Called ME");
        setLoading(false);
      }
    }
  }

  return (
    <>
      {loading ? (
        <div
          style={{
            height: "100vh",
            width: "100%",
            textAlign: "center",
            marginTop: "30vh",
            color: "#007bff",
          }}
        >
          <p
            className="logo-banner"
            style={{ marginBottom: "40px", fontSize: "60px" }}
          >
            SIZZASNEAKS
          </p>
          <CircularProgress size="5rem" />
        </div>
      ) : (
        <Router>
          <Navbar /> {/* Mata */}
          <Container fluid="xl" style={{ padding: "0" }}>
            <Switch>
              <Route exact path="/products/:id">
                <ProductPage /> {/* Lukumo */}
              </Route>
              <Route
                exact
                path="/products/:searchBy/:category"
                children={<ProductsPage />}
              >
                {/* Ameer */}
              </Route>
              <Route exact path="/cart">
                {" "}
                {/* Lara */}
                <ShoppingCartPage />
              </Route>
              <Route exact path="/sign-up">
                {" "}
                {/* Lara */}
                <SignUpPage />
              </Route>
              <Route exact path="/log-in">
                {" "}
                {/* Lara */}
                <LogInComponent />
              </Route>
              <Route exact path="/">
                <HomePage /> {/* Lusanda */}
              </Route>
            </Switch>
          </Container>
          <Footer /> {/* Mata */}
        </Router>
      )}
    </>
  );
}

export default App;
