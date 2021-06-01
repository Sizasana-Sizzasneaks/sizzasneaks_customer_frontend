import React from "react";
import { Container, Row, Col } from "react-bootstrap";

function Navbar() {
  return (
    <nav>
      <div className="navbar-banner">
        <Container
          fluid="xl"
          style={{  height: "100%", paddingLeft:"0", paddingRight: "0", paddingTop: "10px", backgroundColor:"red"  }}
        >
          <Row style={{}}>
            <Col style={{}}>
              <p className="logo-banner">SIZZASNEAKS</p>
            </Col>

            <Col style={{}}>
              <div className="search-bar-box">
                <input id="search-input" type="text" value="Search" />
              </div>
            </Col>

            <Col  >
              <Row className="top-right-nav-banner-links">
                <Col xs={2} className="top-right-nav-banner-link" >
                  <p>LogIn</p>
                </Col>
                <Col xs={1}  >
                  <div className="vertical-divider"></div>
                </Col>
                <Col xs={4} className="top-right-nav-banner-link" >
                  <p>Sign Up</p>
                </Col>
                <Col xs={1}  >
                  <div className="vertical-divider"></div>
                </Col>
                <Col xs={3} className="top-right-nav-banner-link" >
                  <div className="shopping-cart-banner">
                    <span style={{float:"left"}} className="material-icons">shopping_cart</span>
                    <p>Cart</p>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
      <div className="navbar-links-segment">
        <Container
          fluid="xl"
          style={{  height: "100%" }}
        >
          <p>SIZZASNEAKS</p>
        </Container>
      </div>
    </nav>
  );
}

export default Navbar;
