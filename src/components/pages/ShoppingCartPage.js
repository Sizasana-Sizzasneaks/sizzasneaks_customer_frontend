import React from "react";
import {
  updateCartItemQuantity,
  deleteSingleCartItem,
} from "../../api/cart.js";
import { useHistory, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getUserCart } from "../../redux/actions/cart.js";

import {
  Card,
  ListGroup,
  Row,
  Col,
  Container,
  ButtonToolbar,
  Breadcrumb,
  ButtonGroup,
  Button,
} from "react-bootstrap";
import CartItemLine from "../Cart/CartItemLine";
import { CircularProgress } from "@material-ui/core";
import Styles from "./ShoppingCartPage.module.css";

function ShoppingCartPage() {
  const history = useHistory();
  const dispatch = useDispatch();

  const shoppingCart = useSelector((state) => state.cart);
  var [error, setError] = React.useState(null);

  React.useEffect(() => {
    dispatch(getUserCart());
  }, []);

  //deleteCartItem is used when the customer deletes a certain product from his cart
  async function deleteCartItem(product_id, option) {
    var deleteSingleCartItemResult = await deleteSingleCartItem(
      product_id,
      option
    );

    if (deleteSingleCartItemResult.ok === true) {
      dispatch(getUserCart());
    } else {
      console.log(deleteSingleCartItemResult);
    }
  }

  // updateItemQuantity is used to update the product quantity when a customer add or deletes the amount of products
  async function updateItemQuantity(product_id, option, newQuantity) {
    var updateCartItemQuantityResult = await updateCartItemQuantity(
      product_id,
      option,
      newQuantity
    );

    if (updateCartItemQuantityResult.ok === true) {
      // refresh page call get cart again
      dispatch(getUserCart());
    } else {
      console.log(updateCartItemQuantityResult);
    }
  }

  return (
    <div>
      <Breadcrumb style={{ margin: "20px" }}>
        <Breadcrumb.Item>
          <Link to="/">Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item active>Shopping Cart</Breadcrumb.Item>
      </Breadcrumb>

      <Container className={Styles.container}>
        <Row>
          <Col xs={12} md={8}>
            <Card>
            <Card.Header className={Styles.Name}> Cart Items</Card.Header>
              {shoppingCart.loading ? (
                <div className={Styles.CartItemsLoading}>
                  <CircularProgress size={120} />
                </div>
              ) : (
                <div>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      {!shoppingCart.error ? (
                        <div>
                          {" "}
                          {shoppingCart.cart &&
                            shoppingCart.cart.cart.map((cartItem) => {
                              return (
                                <>
                                  <CartItemLine
                                    cartItemImage={cartItem.imgURls.imgURL}
                                    cartItemName={cartItem.productName}
                                    cartItemQuantity={cartItem.quantity}
                                    cartItemColor={cartItem.option.color}
                                    cartItemSize={cartItem.option.size}
                                    available={cartItem.available}
                                    cartItemSellingPrice={
                                      cartItem.sellingPrice * cartItem.quantity
                                    }
                                    pushToProductPage={() => {
                                      history.push(
                                        "/products/" + cartItem.product_id
                                      );
                                    }}
                                    // passing down the updateItemQuantity function
                                    update={(value) => {
                                      updateItemQuantity(
                                        cartItem.product_id,
                                        cartItem.option,
                                        value
                                      );
                                    }}
                                    delete={(value) => {
                                      deleteCartItem(
                                        cartItem.product_id,
                                        cartItem.option
                                      );
                                    }}
                                  />
                                   <hr />
                                </>
                              );
                            })}{" "}
                        </div>
                      ) : (
                        <div>
                          {" "}
                          <p>{shoppingCart.error}</p>{" "}
                        </div>
                      )}
                    </ListGroup.Item>
                  </ListGroup>
                </div>
              )}
            </Card>
          </Col>

          {/* Summary detail card component */}
          <Col xs={6} md={4}>
            <Card className="cardStyle">
              <Card.Header className={Styles.Name}> Cart Summary</Card.Header>
              {shoppingCart.loading ? (
                <div className={Styles.CartSummaryLoading}>
                  <CircularProgress size={90} />
                </div>
              ) : (
                <div>
                  {!shoppingCart.error ? (
                    <div>
                      {shoppingCart.cart && (
                        <div>
                          <ListGroup variant="flush">
                            <ListGroup.Item>
                              <Row>
                                <Col xs={6}>
                                  {" "}
                                  Price ({
                                    shoppingCart.cart.cartCount
                                  } Items){" "}
                                </Col>
                                <Col xs={6} md={2} />
                                <Col xs={6} md={4}>
                                  R {shoppingCart.cart.cartTotal}
                                </Col>
                              </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                              <Row>
                                <Col xs={6}> Delivery Charges </Col>
                                <Col xs={6} md={2} />
                                <Col xs={6} md={4}>
                                  R {shoppingCart.cart.cartDeliveryCharge}
                                </Col>
                              </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                              <Row>
                                <Col xs={6}>Total Price </Col>
                                <Col xs={6} md={2} />
                                <Col xs={6} md={4}>
                                  R{" "}
                                  {shoppingCart.cart.cartTotal +
                                    shoppingCart.cart.cartDeliveryCharge}
                                </Col>
                              </Row>
                            </ListGroup.Item>
                          </ListGroup>
                          <ButtonToolbar className={Styles.btn}>
                            <ButtonGroup>
                              <Button>Place Order</Button>
                            </ButtonGroup>
                            <ButtonGroup>
                              <Link to="/">
                                <Button>Continue Shopping</Button>
                              </Link>
                            </ButtonGroup>
                          </ButtonToolbar>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div>
                      {" "}
                      <p>{shoppingCart.error}</p>{" "}
                    </div>
                  )}
                </div>
              )}
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default ShoppingCartPage;

//the div rendered when cart is empty
function emptyCard() {
  return <div>Empty Cart</div>;
}
