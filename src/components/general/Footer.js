import React from "react";
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
        <Row style={{ fontWeight: "bold", height: "30px" }}>
          <Col xs={3} className="footer-heading-block">
            <p className="footer-headingOne-text">SIZZASNEAKS</p>
          </Col>
          <Col xs={2} className="footer-heading-block">
            <p className="footer-heading-text">SITE LINKS</p>
          </Col>
          <Col xs={2} className="footer-heading-block">
            <p className="footer-heading-text">POLICY</p>
          </Col>
          <Col xs={2} className="footer-heading-block">
            <p className="footer-heading-text">CATEGORIES</p>
          </Col>
          {/* <Col xs={3} className="footer-heading-block">
            <p className="footer-heading-text">SUBSCRIBE</p>
          </Col> */}
        </Row>
        <Row style={{ marginTop: "35px" }}>
          <Col className="footer-segment-block" xs={3}>
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
          <Col xs={2} className="footer-segment-block">
            <FooterSegmentItem label="Home" link="/" />
          </Col>
          <Col xs={2} className="footer-segment-block">
            <FooterSegmentItem label="Terms of Use" link="/terms-of-use" />
            <FooterSegmentItem label="Privacy Policy" link="/privacy-policy" />
            <FooterSegmentItem label="Return Policy" link="/return-policy" />
          </Col>
          <Col xs={2} className="footer-segment-block">
            <FooterSegmentItem label="Men" link="/products/CATEGORY/MEN" />
            <FooterSegmentItem label="Women" link="/products/CATEGORY/WOMEN" />
            <FooterSegmentItem label="Kids" link="/products/CATEGORY/KIDS" />
            <FooterSegmentItem label="New Arrivals" link="/products/NEW/NEW" />
          </Col>
          {/* <Col xs={3} className="footer-segment-block">
            <FooterSegmentItem
              label=" Subscribe to our newsletter, so that you can be the first to know
              about new offers and promotions."
            />
            <div className="footer-newsletter-subscribe-box">
              <input
                id="footer-newsletter-subscribe-input"
                type="text"
                placeholder="Enter Email Address"
              />
              <div className="footer-subscribe-button">
                <p>SUBSCRIBE</p>
              </div>
            </div>
          </Col> */}
        </Row>

        <Row style={{ backgroundColor: "", height: "55px", marginTop: "30px" }}>
          <div style={{ display: "inline-flex", position: "relative" }}>
            <div className="copyright-container">
              <p>Copyright © 2021 SIZZASNEAKS. All Rights Reserved</p>
            </div>
            <div className="payment-container">
              {/* <p >2021 All Rights Reserved</p> */}
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
    <p
      className="footer-segment-item-text"
      onClick={() => {
        if (typeof props.link !== undefined) {
          history.push(props.link);
        }
      }}
    >
      {props.label}{" "}
    </p>
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
