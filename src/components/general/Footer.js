import React from "react";
import { Container, Row, Col } from "react-bootstrap";

import facebookIcon from "../../icons/facebook-icon.svg";
import twitterIcon from "../../icons/twitter-icon.svg";
import googlePlusIcon from "../../icons/google-plus-icon.svg";
//footer
function Footer() {
  return (
    <footer>
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
            <p className="footer-heading-text">MAIN PAGES</p>
          </Col>
          <Col xs={2} className="footer-heading-block">
            <p className="footer-heading-text">POLICY</p>
          </Col>
          <Col xs={2} className="footer-heading-block">
            <p className="footer-heading-text">CATEGORIES</p>
          </Col>
          <Col xs={3} className="footer-heading-block">
            <p className="footer-heading-text">SUBSCRIBE</p>
          </Col>
        </Row>
        <Row style={{ marginTop: "35px" }}>
          <Col className="footer-segment-block" xs={3}>
            <FooterIconLink src={facebookIcon} alt="facebook-icon" /> 
            <FooterIconLink src={twitterIcon} alt="twitter-icon" />
            <FooterIconLink src={googlePlusIcon} alt="google-plus-icon" />
          </Col>
          <Col xs={2} className="footer-segment-block">
            <FooterSegmentItem label="Take Order" />
            <FooterSegmentItem label="About Us" />
            <FooterSegmentItem label="Contact Us" />
            <FooterSegmentItem label="Promos" />
          </Col>
          <Col xs={2} className="footer-segment-block">
            <FooterSegmentItem label="Terms of Usage" />
            <FooterSegmentItem label="Privacy Policy" />
            <FooterSegmentItem label="Return Policy" />
          </Col>
          <Col xs={2} className="footer-segment-block">
            <FooterSegmentItem label="Men" />
            <FooterSegmentItem label="Women" />
            <FooterSegmentItem label="Kids" />
            <FooterSegmentItem label="New Arrivals" />
          </Col>
          <Col xs={3} className="footer-segment-block">
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
          </Col>
        </Row>

        <Row style={{ backgroundColor: "", height: "55px" }}>
          <div style={{display:"inline-flex", position:"relative"}}>
            <div className="copyright-container">
              <p >© 2021 All Rights Reserved</p>
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
  return <p className="footer-segment-item-text">{props.label} </p>;
}

function FooterIconLink(props) {
  return (
    <img
      src={props.src}
      style={{ height: "22px", marginRight: "20px" }}
      alt={props.alt} 
    />
  );
}
