import React from "react";
import {
  getCart,
  updateCartItemQuantity,
  deleteSingleCartItem,
} from "../../api/cart.js";

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
import { Link } from "react-router-dom";
import CartItemLine from "../Cart/CartItemLine";
import { useHistory } from "react-router-dom";
import LinearProgress from "@material-ui/core/LinearProgress";
import Styles from "../Cart/ShoppingCartPage.module.css";

function ShoppingCartPage(props) {
  const history = useHistory();
  var [cart, setCart] = React.useState(null);
  var [loading, setLoading] = React.useState(true);
  var [error, setError] = React.useState(null);

  React.useEffect(() => {
    getShoppingCart();
    //updateItemQuantity();
    // deleteCartItem("6101340adc7a0305bc700017", { color: "Green", size: 2 });
  }, []);
  //getShoppingCart is used to get the shopping cart that belong to the current user
  async function getShoppingCart() {
    setError(null);
    setCart(null);
    setLoading(true);
    var getCartResult = await getCart();

    if (getCartResult.ok === true) {
      setLoading(false);
      setCart(getCartResult.data);
      console.log(getCartResult.data);
    } else {
      setLoading(false);
      setError(getCartResult);
    }
  }
  //deleteCartItem is used when the cutomer deletes a certain product from his cart
  async function deleteCartItem(product_id, option) {
    var deleteSingleCartItemResult = await deleteSingleCartItem(
      product_id,
      option
    );

    if (deleteSingleCartItemResult.ok === true) {
      console.log(deleteSingleCartItemResult);
      getShoppingCart();
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
      console.log(updateCartItemQuantityResult);
      // refresh page call get cart again
      getShoppingCart();
    } else {
      console.log(updateCartItemQuantityResult);
    }
  }

  return (
    <div>
      {/* loading component*/}

      {/* BreadCrumbs Nav */}
      <Breadcrumb style={{ margin: "20px" }}>
        <Breadcrumb.Item>
          <Link to="/">Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item active>Shopping Cart</Breadcrumb.Item>
      </Breadcrumb>
      {error && <p>{error.message}</p>}
      {loading && (
        <div style={{ marginTop: "40px", marginBottom: "500px" }}>
          <LinearProgress />
        </div>
      )}
      {cart && (
        <Container className={Styles.container}>
          <Row>
            {/* cart Items component */}
            <Col xs={12} md={8}>
              {/* <p>Shopping Cart</p> */}
              <Card>
                {/* <Card.Img variant="top" src="../../images/holder.js/100px270" alt="Image Placeholder" /> */}
                <ListGroup variant="flush">
                  {/*cart item needs a formula to create a cart */}
                  <ListGroup.Item>
                    {/*check first if cart is empty  */}
                    {/* if(cart.cartCount===0){
                      <emptyCard/>
                    } */}
                    {cart.cart.map((cartItem) => {
                      return (
                        <>
                          <hr />
                          <CartItemLine
                            cartItemImage={cartItem.imgURls}
                            cartItemName={cartItem.productName}
                            cartItemQuantity={cartItem.quantity}
                            cartItemColor={cartItem.option.color}
                            cartItemSize={cartItem.option.size}
                            cartItemSellingPrice={
                              cartItem.sellingPrice * cartItem.quantity
                            }
                            pushToShoppingCartPage={() => {
                              history.push("/cart/");
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
                        </>
                      );
                    })}
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>

            {/* Summary detail card component */}
            <Col xs={6} md={4}>
              <Card className="cardStyle">
                <Card.Header className={Styles.Name}>Summary</Card.Header>
                <ListGroup variant="flush">
                  {/* replace 2 with the cart count total */}
                  <ListGroup.Item>
                    <Row>
                      <Col xs={6}> Price ({cart.cartCount} Items) </Col>
                      <Col xs={6} md={2} />
                      <Col xs={6} md={4}>
                        R {cart.cartTotal}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col xs={6}> Delivery Charges </Col>
                      <Col xs={6} md={2} />
                      <Col xs={6} md={4}>
                        R {cart.cartDeliveryCharge}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col xs={6}>Total Price </Col>
                      <Col xs={6} md={2} />
                      <Col xs={6} md={4}>
                        R {cart.cartTotal + cart.cartDeliveryCharge}
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
              </Card>
            </Col>
          </Row>
        </Container>
      )}
    </div>
  );
}

export default ShoppingCartPage;

//the div rendered when cart is empty
function emptyCard() {
  return <div>Empty Cart</div>;
}
