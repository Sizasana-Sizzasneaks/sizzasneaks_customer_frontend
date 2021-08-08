import React from "react"
import { Row, Col } from "react-bootstrap";
import Styles from "./ProductDisplayCard.module.css";

import OptionSelector from "./OptionSelector";
import Button from "../general/Button.js"

function ProductDisplayCard(props) {
    var [selectedColor, setSelectedColor] = React.useState(0);
    var [selectedSize, setSelectedSize] = React.useState(null);
  
    var [sizeSelectedError, setSizeSelectedError] = React.useState(null);
    var [colorSelectedError, setColorSelectedError] = React.useState(null);
  
    function getSelectedOption() {
      return {
        color: props.product.options[selectedColor].color,
        variant: props.product.options[selectedColor].variants[selectedSize],
      };
    }
  
    function addToCart() {
      setSizeSelectedError(null);
      setColorSelectedError(null);
      var selectedOption = getSelectedOption();
      if (typeof selectedOption.color !== "undefined") {
        if (typeof selectedOption.variant !== "undefined") {
          // Add to Cart Call
          console.log("Add to Cart");
          console.log(selectedOption);
        } else {
          setSizeSelectedError("Size Required");
        }
      } else {
        setColorSelectedError("Color Required");
      }
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
          <Row>
            <Col>
              {" "}
              <OptionSelector
                options={props.product.options}
                selectedColor={selectedColor}
                selectedSize={selectedSize}
                selectColor={(color) => {
                  setSizeSelectedError(null);
                  setColorSelectedError(null);
                  setSelectedColor(color);
                }}
                selectSize={(size) => {
                  setSizeSelectedError(null);
                  setColorSelectedError(null);
                  setSelectedSize(size);
                }}
                sizeSelectedError={sizeSelectedError}
                colorSelectedError={colorSelectedError}
              />
            </Col>
          </Row>
  
          <Row className={Styles.priceAndButtons}>
            <Col className={Styles.productPrice} xs={5}>
              <p>R {props.product.sellingPrice}</p>
            </Col>
            <Col  xs={7}>
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

  export default ProductDisplayCard;