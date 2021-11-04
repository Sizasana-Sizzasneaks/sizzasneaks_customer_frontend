import React from "react";
import { Row, Col } from "react-bootstrap";
import Button from "../general/Button.js";
// import Styles from "../general/Navbar.module.css";
import QuantityCart from "./QuantityCart";
import Styles from "./CartItemLine.module.css";

import {
  deleteSingleCartItem,
  updateCartItemQuantity,
} from "../../api/cart.js";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { getUserCart } from "../../redux/actions/cart.js";
import { CircularProgress } from "@material-ui/core";

function CartItemLine(props) {
  const dispatch = useDispatch();
  const history = useHistory();

  //State to Handle Delete Process
  var [deleteState, setDeleteState] = React.useState(null);
  var [deleteLoading, setDeleteLoading] = React.useState(false);

  //State to Handle Quantity Update Process
  var [quantityLoading, setQuantityLoading] = React.useState(false);
  var [quantityUpdateState, setQuantityUpdateState] = React.useState(null);

  var formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "ZAR",
  });

  //deleteCartItem is used when the customer deletes a certain product from his cart
  async function deleteCartItem() {
    setDeleteLoading(true);
    setDeleteState(null);
    if (
      typeof props.cartItemProductId !== "undefined" &&
      typeof props.cartItemOption !== "undefined"
    ) {
      var deleteSingleCartItemResult = await deleteSingleCartItem(
        props.cartItemProductId,
        props.cartItemOption
      );

      if (deleteSingleCartItemResult.ok === true) {
        setDeleteState(deleteSingleCartItemResult);
        setDeleteLoading(false);
        setTimeout(() => {
          dispatch(getUserCart());
        }, [1000]);
      } else {
        setDeleteState({ ok: false, message: "Failed to Delete" });
        setDeleteLoading(false);
        setTimeout(() => {
          setDeleteState(null);
        }, [1000]);
      }
    } else {
      setDeleteState({ ok: false, message: "Failed to Delete" });
      setDeleteLoading(false);
      setTimeout(() => {
        setDeleteState(null);
      }, [1000]);
    }
  }
  // updateItemQuantity is used to update the product quantity when a customer add or deletes the amount of products
  async function updateItemQuantity(newQuantity) {
    setQuantityLoading(true);
    setQuantityUpdateState(null);
    if (
      typeof props.cartItemProductId !== "undefined" &&
      typeof props.cartItemOption !== "undefined"
    ) {
      var updateCartItemQuantityResult = await updateCartItemQuantity(
        props.cartItemProductId,
        props.cartItemOption,
        newQuantity
      );

      if (updateCartItemQuantityResult.ok === true) {
        setQuantityUpdateState(updateCartItemQuantityResult);
        setQuantityLoading(false);
        setTimeout(() => {
          dispatch(getUserCart());
        }, [1000]);
      } else {
        setQuantityUpdateState({ ok: false, message: "Failed to Update" });
        setQuantityLoading(false);
        setTimeout(() => {
          setQuantityUpdateState(null);
        }, [1000]);
      }
    } else {
      setQuantityUpdateState({ ok: false, message: "Failed to Update" });
      setQuantityLoading(false);
      setTimeout(() => {
        setQuantityUpdateState(null);
      }, [1000]);
    }
  }

  function goToProductPage() {
    if (typeof props.cartItemProductId !== "undefined") {
      history.push("/products/" + props.cartItemProductId);
    }
  }
  return (
    <Row className={Styles.CartItemLine}>
      <Col xs={3} >
        <img
          onClick={goToProductPage}
          className={Styles.ProductImg}
          src={props.cartItemImage}
          alt="ProductImage"
        ></img>
      </Col>
      <Col xs={5} style={{ display: "grid" }}>
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
            {quantityLoading ? (
              <div
                style={{
                  marginRight: "auto",
                  width: "max-content",
                  height: "max-content",
                }}
              >
                <CircularProgress size={25} />
              </div>
            ) : (
              <>
                {quantityUpdateState ? (
                  <div
                    style={{
                      marginRight: "auto",
                      width: "max-content",
                      height: "max-content",
                    }}
                  >
                    {quantityUpdateState.ok ? (
                      <p style={{ color: "green", marginBottom: "0px" }}>
                        Updated
                      </p>
                    ) : (
                      <p style={{ color: "red", marginBottom: "0px" }}>
                        Failed
                      </p>
                    )}
                  </div>
                ) : (
                  <QuantityCart
                    value={props.cartItemQuantity}
                    update={(value) => {
                      updateItemQuantity(value);
                    }}
                  />
                )}
              </>
            )}{" "}
          </Col>
        </Row>
      </Col>
      <Col xs={4}>
        <Row className={Styles.RemoveLine}>
          {deleteLoading ? (
            <div
              style={{
                marginLeft: "auto",
                width: "max-content",
                height: "max-content",
              }}
            >
              <CircularProgress size={25} />
            </div>
          ) : (
            <>
              {deleteState ? (
                <div
                  style={{
                    marginLeft: "auto",
                    width: "max-content",
                    height: "max-content",
                  }}
                >
                  {deleteState.ok ? (
                    <p style={{ color: "green", marginBottom: "0px" }}>
                      Deleted
                    </p>
                  ) : (
                    <p style={{ color: "red", marginBottom: "0px" }}>
                      Failed to Delete
                    </p>
                  )}
                </div>
              ) : (
                <Button
                  label="Delete"
                  onClick={() => {
                    deleteCartItem();
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
                />
              )}
            </>
          )}
        </Row>
        <Row className={Styles.PriceLine}>
          {props.available ? (
            <Col>
              <p className={Styles.PriceValue}>
                {formatter.format(props.cartItemSellingPrice)}
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
