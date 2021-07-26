import React,{useState} from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

import LogIn from "./LogInComponent";

function Navbar() {
  const handleClick =()=>{
    handleLoginClick()
}

// declare a variable to use State Hook: isShowLogin
const [isShowLogin, setIsShowLogin]=useState(false)
  
//function setIsShowLogin to update our state 
const handleLoginClick=()=>{
setIsShowLogin((isShowLogin)=>!isShowLogin)
}

  return (
    <nav>
      <div className="navbar-banner">
        <Container
          fluid="xl"
          style={{
            height: "100%",
            paddingLeft: "0",
            paddingRight: "0",
            paddingTop: "10px",
            // backgroundColor: "red"
          }}
        >
          <Row>
            <Col xs={4} style={{ padding: "0" }}>
            <Link to="/"> <p className="logo-banner">SIZZASNEAKS</p> </Link>
            </Col>

            <Col xs={5} style={{ padding: "0" }}>
              <div className="search-bar-box">
                <input
                  id="search-input"
                  type="text"
                  placeholder="Search Products"
                />
              </div>
            </Col>

            <Col xs={3} style={{ padding: "0" }}>
              <Row className="top-right-nav-banner-links">
                <Col
                  xs={2}
                  className="top-right-nav-banner-linky"
                  style={{ marginLeft: "auto" }}
                >   
                  <p onClick={handleClick}> Log In</p>  
                  <div className="top-right-nav-banner-linkyy"><LogIn isShowLogin={isShowLogin} /></div>                
                </Col>               
                
                <Col xs={1}>
                  <div className="vertical-divider"></div>
                </Col>
                <Col xs={3} className="top-right-nav-banner-link">
                <Link to="/sign-up"> <p>Sign Up</p> </Link>
                </Col>
                <Col xs={1}>
                  <div className="vertical-divider"></div>
                </Col>
                <Col xs={3} className="top-right-nav-banner-link">
                  
                    <div className="shopping-cart-banner">
                      <span
                        style={{ float: "left" }}
                        className="material-icons"
                      >
                        shopping_cart
                      </span>
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
          style={{ height: "100%", paddingLeft: "0", paddingRight: "0" }}
        >
          <div style={{ display: "flex", height: "100%" }}>
            <div style={{ height: "100%", display: "inline-block" }}>
              <NavabarNavigationLink label="BRANDS" expandable={true} />
              <NavabarNavigationLink label="WOMEN" />
              <NavabarNavigationLink label="MEN" />
              <NavabarNavigationLink label="KIDS" />
            </div>
            <div
              style={{
                height: "100%",
                marginLeft: "auto",
                display: "inline-block",
              }}
            >
              <NavabarNavigationLink label="NEW ARRIVALS" />
              <NavabarNavigationLink label="WISHLIST" />
            </div>
          </div>
        </Container>
      </div>
    </nav>
  );
}

function NavabarNavigationLink(props) {
  return (
    <Link to="/products">
    <div
      className="navbarNavigationLink"
      // onClick={function () {
      //   alert("Coming Soon");
      // }}
    >
      <p style={{}}>{props.label}</p>
      {props.expandable && (
        <span class="material-icons" style={{ marginLeft: "10px" }}>
          expand_more
        </span>
      )}
    </div>
    </Link>
  );
}

export default Navbar;
