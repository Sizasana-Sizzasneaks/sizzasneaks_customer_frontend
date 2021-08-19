// function creates a card cart item and receives data from the page
import { Style } from "@material-ui/icons";
import React from "react";
import { Row, Col, Button } from "react-bootstrap";
// import Styles from "../general/Navbar.module.css";
import QuantityCart from "./QuantityCart";
import Styles from "./ShoppingCartPage.module.css";

function CartItemLine(props) {
  return (
    <Row
      onClick={() => {
        //Checks if this property is defined
        if (typeof props.pushToShoppingCartPage !== "undefined") {
          //Calls the function supplied to this property.
          props.pushToShoppingCartPage();
        }
      }}
    >
      {/* cart items image display */}
      <Col xl={2}>
        <img width="100px" src={props.cartItemImage} alt="ProductImage"></img>
      </Col>
      <Col>
        {/* Product details & variants*/}
        <Row>
          {/* Product name */}
          <Col xl={6}>
            {" "}
            <p className={Styles.Name}>{props.cartItemName}</p>{" "}
          </Col>
          {/* delete cart item button */}
          <Col className={Styles.RightText}>
            <Button
              variant="outline-dark"
              size="sm"
              onClick={() => {
                if (typeof props.delete !== "undefined") {
                  props.delete();
                }
              }}
            >
              {" "}
              Remove
            </Button>
          </Col>
          <Row>
            {/* product variants */}
            <Col xl={2}>
              {" "}
              <p className={Styles.SubName}>Color: {props.cartItemColor}</p>
            </Col>
            <Col xl={2} className={Styles.LeftText}>
              {" "}
              <p className={Styles.SubName}>Size: {props.cartItemSize}</p>
            </Col>
          </Row>
          {/* product quantity & price */}
          <Col xl={6}>
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
          <Col className={Styles.RightTextPrice}>
            <p className={Styles.SubName}>R {props.cartItemSellingPrice}</p>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}

export default CartItemLine;
