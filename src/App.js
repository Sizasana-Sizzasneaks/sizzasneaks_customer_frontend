import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//App Components
import Navbar from "./components/general/Navbar.js";
import Footer from "./components/general/Footer.js";

//Pages
import ProductsPage from "./components/pages/ProductsPage.js";
import ProductPage from "./components/pages/ProductPage.js";
import HomePage from "./components/pages/HomePage.js";
import SignUpPage from "./components/pages/SignUpPage.js";

function App() {
  return (
    <>
    <p>Customer Front-End</p>
      <Navbar />
      <Router>
        <div>
          <Switch>
            <Route exact path="/product">
              <ProductPage />
            </Route>
            <Route exact path="/products">
              <ProductsPage />
            </Route>
            <Route exact path="/sign-up">
              <SignUpPage />
            </Route>
            <Route exact path="/">
              <HomePage />
            </Route>
          </Switch>
        </div>
      </Router>
      <Footer />
    </>
  );
}

export default App;
