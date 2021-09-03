import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";

import Styles from "./Navbar.module.css";

import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";
import SearchInputField from "./SearchInputField.js";

import { signOutCurrentUser } from "../../services/authentication.js";
import { clearUserProfile } from "../../redux/actions/profile.js";

import LogIn from "./LogInComponent";

function Navbar() {
  const history = useHistory();
  var [search, setSearch] = React.useState(null);

  const handleClick = () => {
    handleLoginClick();
  };

  const dispatch = useDispatch();

  // declare a variable to use State Hook: isShowLogin
  const [isShowLogin, setIsShowLogin] = useState(false);

  //function setIsShowLogin to update our state
  const handleLoginClick = () => {
    setIsShowLogin((isShowLogin) => !isShowLogin);
  };

  const authState = useSelector((state) => state.firebase.auth);
  const profileState = useSelector((state) => state.profile);
  return (
    <nav>
      <div className={Styles.NavbarBanner}>
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
              <Link to="/">
                {" "}
                <p className={Styles.LogoBanner}>SIZZASNEAKS</p>{" "}
              </Link>
            </Col>

            <Col xs={4} style={{ padding: "0" }}>
              <SearchInputField
                value={search}
                placeHolderText="Search"
                onChange={(value) => {
                  setSearch(value);
                  if (value === "") {
                    history.push("/");
                  } else {
                    history.push("/products/SEARCH/" + value);
                  }
                }}
              />
            </Col>

            {profileState.loading && (
              <Col
                xs={4}
                style={{ padding: "0", display: "flex", alignItems: "center" }}
              >
                <div style={{ margin: "auto", marginTop: "18px" }}>
                  <CircularProgress size={30} />
                </div>
              </Col>
            )}
            {!profileState.loading && (
              <Col xs={4} style={{ padding: "0" }}>
                <Row className={Styles.TopRightNavBannerLinks}>
                  {authState.isEmpty || authState.isAnonymous ? (
                    <>
                      <Col
                        xs={2}
                        className={Styles.TopRightNavBannerLinky}
                        style={{ marginLeft: "auto" }}
                      >
                        <p onClick={handleClick}> Log In</p>
                        <div className={Styles.TopRightNavBannerLinkyy}>
                          <LogIn isShowLogin={isShowLogin} />
                        </div>
                      </Col>
                      <Col xs={1}>
                        <div className={Styles.VerticalDivider}></div>
                      </Col>
                      <Col xs={3} className={Styles.TopRightNavBannerLink}>
                        <Link to="/sign-up" style={{ color: "Black" }}>
                          {" "}
                          <p>Sign Up</p>{" "}
                        </Link>
                      </Col>{" "}
                      <Col xs={1}>
                        <div className={Styles.VerticalDivider}></div>
                      </Col>
                    </>
                  ) : (
                    <>
                      {" "}
                      <Col xs={3} className={Styles.TopRightNavBannerLink}>
                        {" "}
                        <p>
                          {profileState ? profileState.displayName : "User"}
                        </p>{" "}
                      </Col>{" "}
                      <Col xs={1}>
                        <div className={Styles.VerticalDivider}></div>
                      </Col>
                      <Col xs={3} className={Styles.TopRightNavBannerLink}>
                        {" "}
                        <p
                          onClick={async () => {
                            await signOutCurrentUser(); //When the user clicks sign outb button its signs user out and clears the profile
                            await dispatch(clearUserProfile());
                          }}
                        >
                          Log Out
                        </p>{" "}
                      </Col>
                      <Col xs={1}>
                        <div className={Styles.VerticalDivider}></div>
                      </Col>
                    </>
                  )}

                  <Col xs={3} className={Styles.TopRightNavBannerLink}>
                    <Link to="/cart" style={{ color: "Black" }}>
                      <div className={Styles.ShoppingCartBanner}>
                        <span
                          style={{ float: "left" }}
                          className="material-icons"
                        >
                          shopping_cart
                        </span>
                        <p>Cart</p>
                      </div>
                    </Link>
                  </Col>
                </Row>
              </Col>
            )}
          </Row>
        </Container>
      </div>
      <div className={Styles.NavbarLinksSegment}>
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
//Above are the links on the Navbar to catogoroze products
function NavabarNavigationLink(props) {
  return (
    <Link to={"/products/CATEGORY/" + props.label} style={{ color: "Black" }}>
      <div
        className={Styles.NavbarNavigationLink}
        // onClick={function () {
        //   alert("Coming Soon");
        // }}
      >
        <p style={{ fontWeight: "300" }}>{props.label}</p>
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
