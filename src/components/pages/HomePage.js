import React from "react";
import { Row, Col } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import Styles from "./HomePage.module.css";
import CircularProgress from "@material-ui/core/CircularProgress";

import { getProducts } from "../../api/products.js";

import ProductItem from "../general/ProductItem.js";
import ProductCarousel from "../general/ProductsCarousel.js";

//Replace With Image From the internet
import PromotionlBannerImgOne from "../../images/homepage-promotion-banner-one.png";
import PromotionlBannerImgTwo from "../../images/homepage-promotion-banner-image-two.png";
import PromotionalBannerImgThree from "../../images/homepage-promotion-banner-image-three.png";
//HomePage

function HomePage() {
  var history = useHistory();
  var [products, setProducts] = React.useState(null);
  var [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    getTheProducts();
  }, []);
  // getProductsResult Awaits the getProducts

  async function getTheProducts() {
    setLoading(true);
    setProducts(null);
    var getProductsResult = await getProducts({
      searchBy: "NEW", // getting the products by getProducts does not uses searchBy or value
      value: "",
    });
    //if getProductsResult is true setProducts will equal getProductsResult.data otherwise if false it will print getProductResult in terminal
    if (getProductsResult.ok === true) {
      setLoading(false);
      setProducts(getProductsResult.data);
    } else {
      setLoading(false);
      console.log(getProductsResult);
    }
  }
  //below are the visual code the banner in the home page
  return (
    <div className="homepage">
      <Row>
        <img
          className={Styles.HomepagePromotionBannerImageOne}
          src={PromotionlBannerImgOne}
          alt="Promotional Banner One"
        />
      </Row>
      <Row>
        <div className={Styles.HomeSectionHeader}>
          <p>NEW ARRIVALS</p>
          <p
            className={Styles.SeeAllText}
            onClick={() => {
              history.push("products/NEW/NEW");
            }}
          >
            See All
          </p>
        </div>
      </Row>
      <Row className={Styles.HomepageBannerProductSegment}>
        <Col xl={6}>
          <img
            className={Styles.HomepagePromotionBannerImageTwo}
            src={PromotionlBannerImgTwo}
            alt="Promotional Banner One"
          />
        </Col>
        {loading && (
          <Col
            xl={6}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CircularProgress size={80} style={{ margin: "0px 20px" }} />
          </Col>
        )}

        {products &&
          products.map((product, index) => {
            return index > -1 && index < 2 ? (
              <Col xl={3} style={{ display: "flex", justifyContent: "center" }}>
                {products && <ProductItem product={product} />}
              </Col>
            ) : (
              ""
            );
          })}
      </Row>

      <Row
        className={Styles.HomepageBannerProductSegment}
        style={{ marginTop: "50px", marginBottom: "50px" }}
      >
        {loading && (
          <Col
            xl={6}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CircularProgress size={80} style={{ margin: "0px 20px" }} />
          </Col>
        )}
        {products &&
          products.map((product, index) => {
            return index > 1 && index < 4 ? (
              <Col xl={3} style={{ display: "flex", justifyContent: "center" }}>
                {products && <ProductItem product={product} />}
              </Col>
            ) : (
              ""
            );
          })}
        <Col xl={6}>
          <img
            className={Styles.HomepagePromotionBannerImageTwo}
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
