import React, { useState } from "react";
import { useParams } from "react-router-dom";
/* import '@fortawesome/fontawesome-free/css/all.min.css'; 
import 'bootstrap-css-only/css/bootstrap.min.css'; 
import 'mdbreact/dist/css/mdb.css'; */

import Styles from "./ProductPage.module.css";
import { Row, Col } from "react-bootstrap";

import ProductCarousel from "../general/ProductsCarousel.js";
import ReviewBox from "../review/ReviewBox.js";

import { getProduct } from "../../api/products.js";

import image from "../../images/product-item-image.png";
import { Style } from "@material-ui/icons";
import CircularProgress from "@material-ui/core/CircularProgress";

import Rating from "../review/Rating.js";
import Button from "../general/Button.js";

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
      <ReviewBox productId={id} />
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
  var [selectedOption, setSelectedOption] = React.useState(null);

  function addToCart() {
    console.log(selectedOption);
  }

  return (
    <Row className={Styles.currentProductCard}>
      <Col className={Styles.imageOptionsSegment} xs={2}>
        <Row>
          <Col>
            <img src={props.product.imgURls[1]} />
          </Col>
        </Row>
        <Row>
          <Col>
            <img src={props.product.imgURls[2]} />
          </Col>
        </Row>
      </Col>

      <Col xs={1} className={Styles.mainImageSegment}>
        <Row>
          <Col>
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

        {/* <Rating value={2} /> */}

        <Row>
          <Col>
            {" "}
            <OptionSelector
              label="Color"
              options={props.product.options}
              sendOptions={(option) => {
                setSelectedOption(option);
              }}
            />
          </Col>
        </Row>

        <Row className={Styles.priceAndButtons}>
          <Col className={Styles.productPrice} xs={5}>
            <p>R {props.product.sellingPrice}</p>
          </Col>
          <Col className={Styles.cardButtons} xs={7}>
            <Button
              label="ADD TO CART"
              styles={{ backgroundColor: "#F3D63C" }}
              onClick={() => {
                addToCart();
              }}
            />
            <Button
              label="ADD TO WISHLIST"
              styles={{ backgroundColor: "#E3E3E3", float: "right" }}
            />
          </Col>
        </Row>
      </Col>
    </Row>
  );
}

function OptionSelector(props) {
  var [options, setOptions] = React.useState(props.options || []);

  var [selectedColor, setSelectedColor] = React.useState(0);
  var [selectedSize, setSelectedSize] = React.useState(null);

  function sendSelectedOption(variant) {
    if (typeof props.sendOptions !== "undefined") {
      props.sendOptions({
        color: options[selectedColor].color,
        variant: options[selectedColor].variants[variant],
      });
    }
  }

  return (
    <div>
      <div className={Styles.optionSelectorBanner}>
        <p>{props.label}</p>
        <span class="material-icons">arrow_drop_down</span>
      </div>

      <div className={Styles.optionSelectorOptions}>
        {options.map((option, index) => {
          return (
            <div
              onClick={() => {
                setSelectedColor(index);
                setSelectedSize(null);
                setSelectedSize(null);
              }}
              className={
                index === selectedColor
                  ? Styles.optionSelected
                  : Styles.optionItem
              }
            >
              <p>{option.color}</p>
            </div>
          );
        })}
      </div>

      <div className={Styles.optionSelectorBanner}>
        <p>Size</p>
        <span class="material-icons">arrow_drop_down</span>
      </div>

      <div className={Styles.optionSelectorOptions}>
        {options[selectedColor].variants.map((variant, index) => {
          return variant.quantity >= 1 ? (
            <div
              onClick={async () => {
                await setSelectedSize(index);
                sendSelectedOption(index);
              }}
              className={
                index === selectedSize
                  ? Styles.optionSelected
                  : Styles.optionItem
              }
            >
              <p>{"UK " + variant.size}</p>
            </div>
          ) : (
            <div className={Styles.UnavailableOption}>
              <p>{"UK " + variant.size}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ProductPage;
