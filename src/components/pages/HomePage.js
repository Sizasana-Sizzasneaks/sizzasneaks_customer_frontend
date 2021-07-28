import React from "react";
import { Row, Col } from "react-bootstrap";

// import LogInComponent from '../general/LogInComponent';

import ProductItem from "../general/ProductItem.js";
import ProductCarousel from "../general/ProductsCarousel.js";

//Replace With Image From the internet
import PromotionlBannerImgOne from "../../images/homepage-promotion-banner-one.png";
import PromotionlBannerImgTwo from "../../images/homepage-promotion-banner-image-two.png";
import PromotionalBannerImgThree from "../../images/homepage-promotion-banner-image-three.png";

function HomePage() {
  return (
    <div className="homepage">
      <Row>
        <img
          className="homepage-promotion-banner-image-one"
          src={PromotionlBannerImgOne}
          alt="Promotional Banner One"
        />
      </Row>
      <Row>
        <div className="home-section-header">
          <p>NEW ARRIVALS</p>
          <p style={{ marginLeft: "10px" }}>See All</p>
        </div>
      </Row>
      <Row className="homepage-banner-product-segment">
        <Col xl={6}>
          <img
            className="homepage-promotion-banner-image-two"
            src={PromotionlBannerImgTwo}
            alt="Promotional Banner One"
          />
        </Col>
        <Col xl={3} style={{ display: "flex", justifyContent: "center"}}>
          <ProductItem />
        </Col>
        <Col xl={3} style={{ display: "flex", justifyContent: "center"}} >
          <ProductItem />
        </Col>
      </Row>

      <Row className="homepage-banner-product-segment">
        <Col xl={3} style={{ display: "flex", justifyContent: "center"}} >
          <ProductItem />
        </Col>
        <Col xl={3} style={{ display: "flex", justifyContent: "center"}} >
          <ProductItem />
        </Col>
        <Col xl={6}>
          <img
            className="homepage-promotion-banner-image-two"
            src={PromotionalBannerImgThree}
            alt="Promotional Banner One"
          />
        </Col>
      </Row>
      

      <ProductCarousel label="TOP SELLERS" />
    </div>
  );
}

export default HomePage;
