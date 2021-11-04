import React, { useState } from "react";
import { Container, Row, Col, DropdownButton, Dropdown } from "react-bootstrap";

import Styles from "./Navbar.module.css";

import { Link, useHistory, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";
import SearchInputField from "./SearchInputField.js";
import DropDownInput from "./DropDownInput.js";

import { signOutCurrentUser } from "../../services/authentication.js";
import { clearUserProfile } from "../../redux/actions/profile.js";
import { clearUserCart } from "../../redux/actions/cart.js";
import { toggleLogInPopUp } from "../../redux/actions/logInPopUp.js";
import { getProductBrands } from "../../api/products.js";

import LogIn from "./LogInComponent";
import { Style } from "@material-ui/icons";

function Navbar() {
  const history = useHistory();
  const dispatch = useDispatch();

  //State
  var [brandsList, setBrandsList] = React.useState([]);
  var [search, setSearch] = React.useState(null);

  React.useEffect(() => {
    getProductBrandsList();
  }, []);

  function pushToProfilePage() {
    history.push("/profile");
  }

  async function getProductBrandsList() {
    var getProductBrandsResult = await getProductBrands();

    if (getProductBrandsResult.ok) {
      setBrandsList(getProductBrandsResult.data);
    } else {
      setBrandsList([]);
    }
  }

  const authState = useSelector((state) => state.firebase.auth);
  const profileState = useSelector((state) => state.profile);
  const cartState = useSelector((state) => state.cart);
  const logInPopUpState = useSelector((state) => state.logInPopUpState);
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
          }}
        >
          <Row>
            <Col xs={4} style={{ padding: "0" }}>
              <Link to="/">
                {" "}
                <p className={Styles.LogoBanner}>SIZZASNEAKS</p>{" "}
              </Link>
            </Col>

            <Col
              xs={4}
              style={{ padding: "0" }}
              className={Styles.SearchBarCon}
            >
              <SearchInputField
                value={search}
                placeHolderText="Search"
                onChange={async (value) => {
                  await setSearch(value);
                  if (value === "") {
                    history.push("/");
                  } else {
                    history.push("/products/SEARCH/" + value);
                  }
                }}
              />
            </Col>
            {profileState.loading ? (
              <Col
                // xl={4}
                // lg={4}
                // md={8}
                style={{
                  padding: "0",
                  justifyContent: "center",
                  alignItems: "center",
                  display: "inline-flex",
                }}
              >
                <div style={{ margin: "auto", marginTop: "18px" }}>
                  <CircularProgress size={30} />
                </div>
              </Col>
            ) : (
              <>
                <Col className={Styles.DropDownCol}>
                  <div>
                    {" "}
                    <DropdownButton id="dropdown-basic-button" title={authState.isEmpty || authState.isAnonymous ? "Sign Up" : profileState.displayName}>
                      {authState.isEmpty || authState.isAnonymous ? (
                        <>
                          <Dropdown.Item
                            onClick={() => {
                              dispatch(toggleLogInPopUp(!logInPopUpState.show));
                            }}
                          >
                            Log In
                          </Dropdown.Item>
                          <Dropdown.Item
                            onClick={() => {
                              history.push("/sign-up");
                            }}
                          >
                            Sign Up
                          </Dropdown.Item>
                        </>
                      ) : (
                        <>
                          <Dropdown.Item
                            onClick={() => {
                              pushToProfilePage();
                            }}
                          >
                            {profileState ? profileState.displayName : "User"}
                          </Dropdown.Item>
                          <Dropdown.Item
                            onClick={async () => {
                              await signOutCurrentUser();
                              await dispatch(clearUserProfile());
                              dispatch(clearUserCart());
                              //Go to Home
                              history.push("/");
                            }}
                          >
                            Log Out
                          </Dropdown.Item>
                        </>
                      )}
                    </DropdownButton>
                    <Col
                    
                      className={Styles.ResponsiveCart}
                      onClick={() => {
                        history.push("/cart");
                      }}
                    >
                      <p>
                        {" "}
                        <span
                          style={{fontSize:"20px" }}
                          className="material-icons"
                        >
                          shopping_cart
                        </span>
                        {cartState.cart ? (
                          <p>{cartState.cart.cartCount}</p>
                        ) : (
                          <div>
                            {cartState.loading ? (
                              <CircularProgress size={20} />
                            ) : (
                              <p>Cart</p>
                            )}
                          </div>
                        )}
                      </p>
                    </Col>
                    {logInPopUpState.show && <LogIn />}
                  </div>
                </Col>
                <Col
                  xl={4}
                  lg={4}
                  md={8}
                  style={{
                    padding: "0",
                  }}
                  className={Styles.TRNavBarLinkSCol}
                >
                  <Row className={Styles.TopRightNavBannerLinks}>
                    {authState.isEmpty || authState.isAnonymous ? (
                      <>
                        <Col
                          className={Styles.TopRightNavBannerLink}
                          onClick={() => {
                            dispatch(toggleLogInPopUp(!logInPopUpState.show));
                          }}
                        >
                          {" "}
                          <p>Log In</p>
                        </Col>
                        <Col xs={1}>
                          <VerticalDivider />
                        </Col>
                        <Col
                          className={Styles.TopRightNavBannerLink}
                          onClick={() => {
                            history.push("/sign-up");
                          }}
                        >
                          <p>Sign Up</p>
                        </Col>
                        <Col xs={1}>
                          <VerticalDivider />
                        </Col>
                        <Col
                          className={Styles.TopRightNavBannerLink}
                          onClick={() => {
                            history.push("/cart");
                          }}
                        >
                          <p>
                            {" "}
                            <span
                              style={{ float: "left" }}
                              className="material-icons"
                            >
                              shopping_cart
                            </span>
                            {cartState.cart ? (
                              <p>{cartState.cart.cartCount}</p>
                            ) : (
                              <div>
                                {cartState.loading ? (
                                  <CircularProgress size={20} />
                                ) : (
                                  <p>Cart</p>
                                )}
                              </div>
                            )}
                          </p>
                        </Col>
                        {logInPopUpState.show && <LogIn />}
                      </>
                    ) : (
                      <>
                        <Col
                          className={Styles.TopRightNavBannerLink}
                          onClick={() => {
                            pushToProfilePage();
                          }}
                        >
                          {" "}
                          <p>
                            {profileState ? profileState.displayName : "User"}
                          </p>
                        </Col>
                        <Col xs={1}>
                          <VerticalDivider />
                        </Col>
                        <Col
                          className={Styles.TopRightNavBannerLink}
                          onClick={async () => {
                            await signOutCurrentUser();
                            await dispatch(clearUserProfile());
                            dispatch(clearUserCart());
                            //Go to Home
                            history.push("/");
                          }}
                        >
                          <p>Log Out</p>
                        </Col>
                        <Col xs={1}>
                          <VerticalDivider />
                        </Col>
                        <Col
                          className={Styles.TopRightNavBannerLink}
                          onClick={async () => {
                            history.push("/cart");
                          }}
                        >
                          <p>
                            {" "}
                            <span
                              style={{ float: "left" }}
                              className="material-icons"
                            >
                              shopping_cart
                            </span>
                            {cartState.cart ? (
                              <p>{cartState.cart.cartCount}</p>
                            ) : (
                              <div>
                                {cartState.loading ? (
                                  <CircularProgress size={30} />
                                ) : (
                                  <p>Cart</p>
                                )}
                              </div>
                            )}
                          </p>
                        </Col>
                      </>
                    )}
                  </Row>
                </Col>
              </>
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
              <DropDownInput
                list={brandsList}
                onChange={(value) => {
                  history.push("/products/BRAND/" + value);
                }}
                wrapperStyle={{ borderStyle: "none", width: "max-content" }}
                // inputStyle={{ backgroundColor: "#38CCCC" }}
              />
            </div>
            <div style={{ height: "100%", display: "inline-block" }}>
              <NavbarNavigationLink
                label="WOMEN"
                onClick={() => {
                  history.push("/products/CATEGORY/WOMEN");
                }}
              />
              <NavbarNavigationLink
                label="MEN"
                onClick={() => {
                  history.push("/products/CATEGORY/MEN");
                }}
              />
              <NavbarNavigationLink
                label="KIDS"
                onClick={() => {
                  history.push("/products/CATEGORY/KIDS");
                }}
              />
            </div>
            <div
              style={{
                height: "100%",
                marginLeft: "auto",
                display: "inline-block",
              }}
            >
              <NavbarNavigationLink
                label="NEW"
                onClick={() => {
                  history.push("/products/NEW/NEW");
                }}
              />
            </div>
          </div>
        </Container>
      </div>
    </nav>
  );
}
//Above are the links on the Navbar to catogoroze products
function NavbarNavigationLink(props) {
  return (
    <div
      className={Styles.NavbarNavigationLink}
      onClick={() => {
        if (typeof props.onClick !== "undefined") {
          props.onClick();
        }
      }}
    >
      <p style={{ fontWeight: "300" }}>{props.label}</p>
      {props.expandable && (
        <span class="material-icons" style={{ marginLeft: "10px" }}>
          expand_more
        </span>
      )}
    </div>
  );
}

function VerticalDivider(props) {
  return <div className={Styles.VerticalDivider}></div>;
}
export default Navbar;
