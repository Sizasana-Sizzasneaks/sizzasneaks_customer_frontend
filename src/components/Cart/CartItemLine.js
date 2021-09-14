// function creates a card cart item and receives data from the page
import { Style } from "@material-ui/icons";
import React from "react";
import { Row, Col } from "react-bootstrap";
import Button from "../general/Button.js";
// import Styles from "../general/Navbar.module.css";
import QuantityCart from "./QuantityCart";
import Styles from "./CartItemLine.module.css";

function CartItemLine(props) {
  function goToProductPage() {
    //Checks if this property is defined
    if (typeof props.pushToProductPage !== "undefined") {
      //Calls the function supplied to this property.
      props.pushToProductPage();
    }
  }
  return (
    <Row className={Styles.CartItemLine}>
      <Col xl={3}>
        <img
          onClick={goToProductPage}
          className={Styles.ProductImg}
          src={props.cartItemImage}
          alt="ProductImage"
        ></img>
      </Col>
      <Col xl={6}>
        <Row className={Styles.DetailLine}>
          <Col>
            {" "}
            <p className={Styles.Name} onClick={goToProductPage}>
              {props.cartItemName}
            </p>{" "}
          </Col>
        </Row>
        <Row className={Styles.DetailLineOption}>
          {" "}
          <Col>
            {" "}
            <p className={Styles.SubName}>
              Color:{" "}
              <span className={Styles.OptionValue}>{props.cartItemColor}</span>
            </p>
            <p className={Styles.SubName}>
              Size:{" "}
              <span className={Styles.OptionValue}>{props.cartItemSize}</span>
            </p>
          </Col>
        </Row>
        <Row className={Styles.DetailLineQuantity}>
          <Col>
            {" "}
            <QuantityCart
              value={props.cartItemQuantity}
              update={(value) => {
                if (typeof props.update !== "undefined") {
                  props.update(value);
                }
              }}
            />{" "}
          </Col>
        </Row>
      </Col>
      <Col xl={3}>
        <Row className={Styles.RemoveLine}>
          {" "}
          <Button
            label="Delete"
            onClick={() => {
              if (typeof props.delete !== "undefined") {
                props.delete();
              }
            }}
            styles={{
              backgroundColor: "White",
              height: "max-content",
              width: "max-content",
              borderStyle: "solid",
              borderWidth: "1.5px",
              padding: "5px 12px",
              borderRadius: "2px",
              marginLeft: "auto",
            }}
          >
            {" "}
            Remove
          </Button>
        </Row>
        <Row className={Styles.PriceLine}>
          {props.available ? (
            <Col>
              <p className={Styles.PriceValue}>
                R {props.cartItemSellingPrice}
              </p>
            </Col>
          ) : (
            <Col>
              <div className={Styles.UnavailableBanner}>
                <p
                  title="This quantity of this product is unavailable."
                  className={Styles.UnavailableText}
                >
                  NOT AVAILABLE
                </p>
              </div>
            </Col>
          )}
        </Row>
      </Col>
    </Row>
  );
}

export default CartItemLine;
