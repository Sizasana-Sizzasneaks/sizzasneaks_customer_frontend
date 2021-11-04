import React from "react";
import { HashLink } from "react-router-hash-link";
import { Container, Row, Col } from "react-bootstrap";
import { useHistory } from "react-router-dom";

import facebookIcon from "../../icons/facebook-icon.svg";
import twitterIcon from "../../icons/twitter-icon.svg";
import googlePlusIcon from "../../icons/google-plus-icon.svg";
//footer
function Footer() {
  return (
    <footer style={{ height: "max-content" }}>
      <Container
        fluid="xl"
        style={{
          paddingLeft: "0", //no padding on both sides
          paddingRight: "0",
          paddingTop: "50px", // 50 pixels padding on top of the footer
        }}

        //Here we have Main headings of the footer (SIZZASNEAKS, MAIN PAGES, POLICY, CATEGORIES, SUBSCRIBE )
        //Under the main heading we have links to Facebook, twitter and google-plus
        // Under the Main headings we have links to functions related to the main headings
        // these are all the visual components of the footer
      >
        {/* <Row style={{ fontWeight: "bold", height: "30px" }}>
          <Col xl={3} lg={3} md={12} className="footer-heading-block"></Col>
          <Col xl={3} lg={3} md={12} className="footer-heading-block"></Col>
          <Col xl={3} lg={3} md={12} className="footer-heading-block"></Col>
          <Col xl={3} lg={3} md={12} className="footer-heading-block"></Col>
          {/* <Col xs={3} className="footer-heading-block">
            <p className="footer-heading-text">SUBSCRIBE</p>
          </Col> *
        </Row> */}
        <Row style={{ marginTop: "35px" }}>
          <Col className="footer-segment-block" xl={3} lg={3} md={6} xs={12}>
            <p className="footer-headingOne-text">SIZZASNEAKS</p>
            <FooterIconLink
              src={facebookIcon}
              alt="facebook-icon"
              link="https://www.facebook.com"
            />
            <FooterIconLink
              src={twitterIcon}
              alt="twitter-icon"
              link="https://www.twitter.com"
            />
            <FooterIconLink
              src={googlePlusIcon}
              alt="google-plus-icon"
              link="https://www.google.com"
            />
          </Col>
          <Col xl={3} lg={3} md={6} xs={12} className="footer-segment-block">
            <p className="footer-heading-text">SITE LINKS</p>
            <FooterSegmentItem label="Home" link="/#top" />
          </Col>
          <Col xl={3} lg={3} md={6} xs={12} className="footer-segment-block">
            <p className="footer-heading-text">POLICY</p>
            <FooterSegmentItem label="Terms of Use" link="/terms-of-use#top" />
            <FooterSegmentItem label="Privacy Policy" link="/privacy-policy#top" />
            <FooterSegmentItem label="Return Policy" link="/return-policy#top" />
          </Col>
          <Col xl={3} lg={3} md={6} xs={12} className="footer-segment-block">
            <p className="footer-heading-text">CATEGORIES</p>
            <FooterSegmentItem label="Men" link="/products/CATEGORY/MEN#top" />
            <FooterSegmentItem label="Women" link="/products/CATEGORY/WOMEN#top" />
            <FooterSegmentItem label="Kids" link="/products/CATEGORY/KIDS#top" />
            <FooterSegmentItem label="New Arrivals" link="/products/NEW/NEW#top" />
          </Col>
        </Row>

        <Row style={{ backgroundColor: "", height: "55px", marginTop: "30px" }}>
          <div style={{ display: "inline-flex", position: "relative" }}>
            <div className="copyright-container">
              <p>Copyright © 2021 SIZZASNEAKS. All Rights Reserved</p>
            </div>
          </div>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer; //exporting the Footer
//function of the footerItem so we can export it to all the pages.
function FooterSegmentItem(props) {
  const history = useHistory();
  return (
    <HashLink style={{ textDecoration: "none", color:"black" }} smooth to={props.link}>
      <p
        className="footer-segment-item-text"
        // onClick={() => {
        //   if (typeof props.link !== undefined) {
        //     history.push(props.link);
        //   }
        // }}
      >
        {props.label}{" "}
      </p>
    </HashLink>
  );
}

function FooterIconLink(props) {
  return (
    <img
      className="footer-icon-link"
      onClick={() => {
        if (typeof props.link !== undefined) {
          window.open(props.link, "_newtab");
        }
      }}
      src={props.src}
      style={{ height: "22px", marginRight: "20px" }}
      alt={props.alt}
    />
  );
}
