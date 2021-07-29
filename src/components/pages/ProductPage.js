import React, { useState } from "react";
import { useParams } from "react-router-dom";
/* import '@fortawesome/fontawesome-free/css/all.min.css'; 
import 'bootstrap-css-only/css/bootstrap.min.css'; 
import 'mdbreact/dist/css/mdb.css'; */

import Styles from "./ProductPage.module.css";
import { Row, Col } from "react-bootstrap";

import ProductCarousel from "../general/ProductsCarousel.js";

import { getProduct } from "../../api/products.js";

import image from "../../images/product-item-image.png";
import { Style } from "@material-ui/icons";
import CircularProgress from "@material-ui/core/CircularProgress";

function ProductPage() {
  var [product, setProduct] = React.useState(null);
  var [error, setError] = React.useState(null);
  var [loading, setLoading] = React.useState(true);
  var { id } = useParams();

  React.useEffect(() => {
    console.log("Use Effct");

    getTheProduct(id);
  }, []);

  async function getTheProduct(productId) {
    var getProductsResult = await getProduct(productId);

    if (getProductsResult.ok === true) {
      console.log("Worked");
      console.log(getProductsResult);
      setLoading(false);
      setProduct(getProductsResult.data[0]);
      console.log(getProductsResult.data[0]);
    } else {
      console.log("Failed");
      setLoading(false);
      console.log(getProductsResult);
      setError(getProductsResult);
    }
  }

  return (
    <>
      {loading && (
        <div
          style={{
            height: "300px",
            width: "100%",
            textAlign: "center",
            marginTop: "30vh",
            color: "red",
          }}
        >
          {" "}
          <CircularProgress size="5rem" />
        </div>
      )}
      {product && (
        <>
          
          <ProductDisplayCard product={product} />{" "}
        </>
      )}
      {error && (
        <div
          style={{
            height: "300px",
            width: "100%",
            textAlign: "center",
            marginTop: "30vh",
            color: "red",
          }}
        >
          {" "}
          <p style={{ fontSize: "20px" }}>{error.message}</p>
          <span class="material-icons" style={{ fontSize: "100px" }}>
            error
          </span>{" "}
        </div>
      )}
    </>
  );
}

function ProductDisplayCard(props) {
  return (
    <div className={Styles.currentProductCard}>
      <Row>
        <Col className={Styles.currentProductImagesSegment} xs={6}>
          <Row>
            <Col className={Styles.imageOptionsSegment} xl={4} xs={4}>
              <img src={props.product.imgURls[1]} />
              <img src={props.product.imgURls[2]} />
              <img src={props.product.imgURls[3]} />
            </Col>
            <Col className={Styles.mainImageSegment} xl={8} xs={8}>
              <img src={props.product.imgURls[0]} />
            </Col>
          </Row>
        </Col>
        <Col className={Styles.currentProductDetailsSegment}>
          <Row>
            <Col className={Styles.brand}>
              <p>{props.product.brand}</p>
            </Col>
          </Row>
          <Row>
            <Col className={Styles.productName}>
              <p>{props.product.productName}</p>
            </Col>
          </Row>
          <Row>
            <Col className={Styles.productDescription}>
              <p>{props.product.productDescription}</p>
            </Col>
          </Row>
          <Row>
            <Col className={Styles.productRating}>
              <span class="material-icons">star</span>
              <span class="material-icons">star</span>
              <span class="material-icons">star</span>
              <span class="material-icons">star_outline</span>
              <span class="material-icons">star_outline</span>
            </Col>
          </Row>
          <Row>
            <Col className={Styles.colorSelector}>
              {" "}
              <OptionSelector
                label="Color"
                options={["Blue", "Red", "Green"]}
              />
            </Col>
          </Row>
          <Row>
            <Col className={Styles.sizeSelector}>
              <OptionSelector label="Size" options={[4, 3, 8]} />
            </Col>
          </Row>
          <Row className={Styles.priceAndButtons}>
            <Col className={Styles.productPrice}>
              <p>R {props.product.sellingPrice}</p>
            </Col>
            <Col className={Styles.cardButtons}>
              <Button label="ADD TO CART" color="#F3D63C" />
              <Button label="ADD TO WISHLIST" color="#E3E3E3" />
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}

function Button(props) {
  return (
    <div
      className={Styles.productPageButton}
      style={{ backgroundColor: props.color }}
    >
      {props.label}
    </div>
  );
}

function OptionSelector(props) {
  return (
    <div>
      <div className={Styles.optionSelectorBanner}>
        <p>{props.label}</p>
        <span class="material-icons">arrow_drop_down</span>
      </div>

      <div className={Styles.optionSelectorOptions}>
        <div className={Styles.optionItem}>
          <p>{props.options[0]}</p>
        </div>
        <div className={Styles.optionItem}>
          <p>{props.options[1]}</p>
        </div>
        <div className={Styles.optionItem}>
          <p>{props.options[2]}</p>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
