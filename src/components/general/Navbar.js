import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";

import Styles from "./Navbar.module.css";

import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";
import SearchInputField from "./SearchInputField.js";
import DropDownInput from "./DropDownInput.js";

import { signOutCurrentUser } from "../../services/authentication.js";
import { clearUserProfile } from "../../redux/actions/profile.js";
import { getProductBrands } from "../../api/products.js";

import LogIn from "./LogInComponent";

function Navbar() {
  const history = useHistory();
  const dispatch = useDispatch();

  //State
  var [brandsList, setBrandsList] = React.useState([]);
  var [search, setSearch] = React.useState(null);

  React.useEffect(() => {
    getProductBrandsList();
  }, []);

  const handleClick = () => {
    handleLoginClick();
  };

  async function getProductBrandsList() {
    var getProductBrandsResult = await getProductBrands();

    if (getProductBrandsResult.ok) {
      setBrandsList(getProductBrandsResult.data);
    } else {
      setBrandsList([]);
    }
  }

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
          }}
        >
          <Row>
            <Col xl={4} style={{ padding: "0" }}>
              <Link to="/">
                {" "}
                <p className={Styles.LogoBanner}>SIZZASNEAKS</p>{" "}
              </Link>
            </Col>

            <Col xl={4} style={{ padding: "0" }}>
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
            {profileState.loading ? (
              <Col
                xl={4}
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
              <Col
                xl={4}
                style={{
                  padding: "0",
                }}
              >
                <Row className={Styles.TopRightNavBannerLinks}>
                  {authState.isEmpty || authState.isAnonymous ? (
                    <>
                      <Col
                        className={Styles.TopRightNavBannerLink}
                        onClick={() => {
                          handleClick();
                        }}
                      >
                        {" "}
                        <p>Log In</p>
                      </Col>
                      <Col xl={1}>
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
                      <Col xl={1}>
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
                          Cart
                        </p>
                      </Col>
                      {isShowLogin && (
                        <LogIn setShowLogInForm={setIsShowLogin} />
                      )}
                    </>
                  ) : (
                    <>
                      <Col className={Styles.TopRightNavBannerLink}>
                        {" "}
                        <p>
                          {profileState ? profileState.displayName : "User"}
                        </p>
                      </Col>
                      <Col xl={1}>
                        <VerticalDivider />
                      </Col>
                      <Col
                        className={Styles.TopRightNavBannerLink}
                        onClick={async () => {
                          await signOutCurrentUser();
                          await dispatch(clearUserProfile());
                          //Go to Home
                          history.push("/");
                        }}
                      >
                        <p>Log Out</p>
                      </Col>
                      <Col xl={1}>
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
                          Cart
                        </p>
                      </Col>
                    </>
                  )}
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
              <DropDownInput
                list={brandsList}
                onChange={(value) => {
                  history.push("/products/BRAND/" + value);
                }}
                wrapperStyle={{ borderStyle: "none", width: "max-content" }}
                inputStyle={{ backgroundColor: "#38CCCC" }}
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
