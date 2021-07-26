import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

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

function App() {

  return (
    <>
      {/* <p>Customer Front-End</p> */}
      <Router>
        <Navbar /> {/* Mata */}
        <Container fluid="xl" style={{ padding: "0" }}>
          <Switch>
            <Route exact path="/product">
              <ProductPage /> {/* Lukumo */}
            </Route>
            <Route exact path="/products">
              <ProductsPage /> {/* Ameer */}
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
    </>
  );
}

export default App;
