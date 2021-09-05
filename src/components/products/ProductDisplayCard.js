import React from "react";
import { Row, Col } from "react-bootstrap";
import Styles from "./ProductDisplayCard.module.css";
import { addToCart } from "../../api/cart";

import OptionSelector from "./OptionSelector";

import Button from "../general/Button.js";

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

  async function addProductToCart() {
    setSizeSelectedError(null);
    setColorSelectedError(null);
    var selectedOption = getSelectedOption();
    if (typeof selectedOption.color !== "undefined") {
      if (typeof selectedOption.variant !== "undefined") {
        // Add to Cart Call
        var variant = {};
        variant.color = selectedOption.color;
        variant.size = selectedOption.variant.size;
        var addToCartResult = await addToCart(props.product._id, variant);
        if (addToCartResult.ok === true) {
          console.log("It Worked");
          props.addToCartState(addToCartResult);
          setTimeout(() => {
            props.addToCartState(null);
          }, 1500);
          console.log(addToCartResult);
        } else {
          props.addToCartState(addToCartResult);
          setTimeout(() => {
            props.addToCartState(null);
          }, 1500);
          console.log("It Did Not Work");
          console.log(addToCartResult);
        }
      } else {
        setSizeSelectedError("Size Required");
      }
    } else {
      setColorSelectedError("Color Required");
    }

    //below return fucntion shows how images will be shows of the product
    return (
      <Row className={Styles.currentProductCard}>
        <Col className={Styles.imageOptionsSegment} xs={2}>
          {props.product.imgUrls &&
            props.product.imgUrls.map((imageURL, index) => {
              return (
                index > 0 && (
                  <Row>
                    <Col>
                      <img src={imageURL.imgURL} />
                    </Col>
                  </Row>
                )
              );
            })}
        </Col>

        <Col xs={1} className={Styles.mainImageSegment}>
          <Row>
            <Col>
              <img src={props.product.imgURls[0].imgURL} />
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
                  setSizeSelectedError(null); //checks color selected
                  setColorSelectedError(null);
                  setSelectedColor(color);
                }}
                selectSize={(size) => {
                  setSizeSelectedError(null); //checks size selected
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
            <Col xs={7}>
              <Button
                label="ADD TO CART"
                styles={{ backgroundColor: "#F3D63C" }} // Add to cart button formation and style
                onClick={() => {
                  addProductToCart();
                }}
              />
              {/* <Button
                label="ADD TO WISHLIST"
                styles={{ backgroundColor: "#E3E3E3", float: "right" }} // Add to Wishlist button formation and style
              /> */}
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }

  return (
    <Row className={Styles.currentProductCard}>
      <Col className={Styles.imageOptionsSegment} xs={2}>
        {props.product.imgURls &&
          props.product.imgURls.map((imageURL, index) => {
            return (
              index > 0 && (
                <Row>
                  <Col>
                    <img src={imageURL.imgURL} />
                  </Col>
                </Row>
              )
            );
          })}
      </Col>

      <Col xs={1} className={Styles.mainImageSegment}>
        <Row>
          <Col>
            <img src={props.product.imgURls[0].imgURL} />
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
          <Col xs={3}></Col>
          <Col xs={4}>
            <Button
              label="ADD TO CART"
              styles={{ backgroundColor: "#F3D63C" }}
              onClick={() => {
                addProductToCart();
              }}
            />
            {/* <Button
              label="ADD TO WISHLIST"
              styles={{ backgroundColor: "#E3E3E3", float: "right" }}
            /> */}
          </Col>
        </Row>
      </Col>
    </Row>
  );
}

export default ProductDisplayCard;
