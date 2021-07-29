import React from "react";
import { Row, Col } from "react-bootstrap";

import { getProducts } from "../../api/products.js";
// import LogInComponent from '../general/LogInComponent';

import ProductItem from "../general/ProductItem.js";
import ProductCarousel from "../general/ProductsCarousel.js";

//Replace With Image From the internet
import PromotionlBannerImgOne from "../../images/homepage-promotion-banner-one.png";
import PromotionlBannerImgTwo from "../../images/homepage-promotion-banner-image-two.png";
import PromotionalBannerImgThree from "../../images/homepage-promotion-banner-image-three.png";

function HomePage() {
  var [products, setProducts] = React.useState(null);

  React.useEffect(() => {
    console.log("Use Effct");

    getTheProducts();
  }, []);

  async function getTheProducts() {
    var getProductsResult = await getProducts({
      searchBy: "NONE",
      value: "NONE",
    });

    if (getProductsResult.ok === true) {
      console.log("Worked");
      console.log(getProductsResult);
      setProducts(getProductsResult.data);
    } else {
      console.log("Failed");
      console.log(getProductsResult);
    }
  }

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
        <Col xl={3} style={{ display: "flex", justifyContent: "center" }}>
          {products && <ProductItem product={products[0]} />}
        </Col>
        <Col xl={3} style={{ display: "flex", justifyContent: "center" }}>
          {products && <ProductItem product={products[1]} />}
        </Col>
      </Row>

      <Row className="homepage-banner-product-segment">
        <Col xl={3} style={{ display: "flex", justifyContent: "center" }}>
          {products && <ProductItem product={products[3]} />}
        </Col>
        <Col xl={3} style={{ display: "flex", justifyContent: "center" }}>
          {products && <ProductItem product={products[4]} />}
        </Col>
        <Col xl={6}>
          <img
            className="homepage-promotion-banner-image-two"
            src={PromotionalBannerImgThree}
            alt="Promotional Banner One"
          />
        </Col>
      </Row>

      {/* <ProductCarousel label="TOP SELLERS" /> */}
    </div>
  );
}

export default HomePage;
