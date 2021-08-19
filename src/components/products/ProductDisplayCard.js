import React from "react"
import { Row, Col } from "react-bootstrap";
import Styles from "./ProductDisplayCard.module.css";
import { addToCart } from "../../api/cart";

import OptionSelector from "./OptionSelector";
import Button from "../general/Button.js"
//function used to show ProductDisplayCard
function ProductDisplayCard(props) {
    var [selectedColor, setSelectedColor] = React.useState(0);
    var [selectedSize, setSelectedSize] = React.useState(null);
  
    var [sizeSelectedError, setSizeSelectedError] = React.useState(null);
    var [colorSelectedError, setColorSelectedError] = React.useState(null);
  //this function is used to show what color option and size options are avalable for the product
    function getSelectedOption() {
      return {
        color: props.product.options[selectedColor].color,
        variant: props.product.options[selectedColor].variants[selectedSize],
      };
    }
  //this function is used to add the product to cart
    async function addProductToCart() {
      setSizeSelectedError(null);
      setColorSelectedError(null);
      var selectedOption = getSelectedOption();
      if (typeof selectedOption.color !== "undefined") {
        if (typeof selectedOption.variant !== "undefined") {
          // Add to Cart Call
          console.log("Add to Cart");
          var variant = {};
          variant.color = selectedOption.color; //checks what color is seleted
          variant.size = selectedOption.variant.size; //checks what size is selected 
          var addToCartResult = await addToCart(props.product._id, variant); //if addToCartResult is ok then proceds to add the product ton the cart
          if(addToCartResult.ok === true){
            console.log("Product added to the cart");
            console.log(addToCartResult);
          }else{
            console.log("Product was not added to the cart - Something went wrong");
            console.log(addToCartResult);
          }


         // console.log(selectedOption);
        } else {
          setSizeSelectedError("Size Required");
        }
      } else {
        setColorSelectedError("Color Required");
      }
    }
  //below return fucntion shows how images will be shows of the product
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
                  setSizeSelectedError(null); //checks color selected
                  setColorSelectedError(null);
                  setSelectedColor(color);
                }}
                selectSize={(size) => {
                  setSizeSelectedError(null);//checks size selected
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
                styles={{ backgroundColor: "#F3D63C" }}// Add to cart button formation and style 
                onClick={() => {
                  addProductToCart();
                }}
              />
              <Button
                label="ADD TO WISHLIST"
                styles={{ backgroundColor: "#E3E3E3", float: "right" }} // Add to Wishlist button formation and style 
              />
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }

  export default ProductDisplayCard;