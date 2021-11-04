import React from "react";
import { useParams, useHistory } from "react-router-dom";
import Styles from "./ProductPage.module.css";

import CircularProgress from "@material-ui/core/CircularProgress";

import ProductDisplayCard from "../products/ProductDisplayCard.js";
import ReviewBox from "../review/ReviewBox.js";
import Notification from "../general/Notification.js";

import { getProduct } from "../../api/products.js";

//This is the page that shows when a user clicks a products

function ProductPage() {
  var [product, setProduct] = React.useState(null);
  var [error, setError] = React.useState(null);
  var [loading, setLoading] = React.useState(true);
  var [addToCartState, setAddToCartState] = React.useState(null);

  var { id } = useParams();
  var history = useHistory();
  //use effects
  React.useEffect(() => {

    getTheProduct(id);
  }, []);
  //function used to get products by its id
  async function getTheProduct(productId) {
    var getProductsResult = await getProduct(productId);
    //if the getProductsResult is true show the products
    if (getProductsResult.ok === true) {
      setLoading(false); // loading is canceled
      setProduct(getProductsResult.data[0]);
    } else {
      setLoading(false); // loading is canceled
     
      if(getProductsResult.message === "Invalid Product Id"){
        setError({ok:false, message:"Product does not exist"}); //will show error
      }else{
        setError(getProductsResult); //will show error
      }
      
    }
  }
  //this method will return a display card for a single product
  return (
    <div style={{ position: "relative" }}>
      {addToCartState &&
        (addToCartState.ok ? (
          <div
            className={Styles.NotificationBox}
            onClick={() => {
              if (addToCartState.message !== "loading") {
                history.push("/cart");
              }
            }}
          >
            <Notification
              state={
                addToCartState.message === "Loading" ? "loading" : "success"
              }
              label={
                addToCartState.message === "Loading"
                  ? "Adding to cart"
                  : product.productName + " " + addToCartState.message
              }
              styles={{
                width: "max-content",
                marginTop: "20px",
                display: "flex",
                marginLeft: "auto",
              }}
            />
          </div>
        ) : (
          <div className={Styles.NotificationBox}>
            <Notification
              state="error"
              label={addToCartState.message}
              styles={{
                width: "max-content",
                marginTop: "20px",
                display: "flex",
                marginLeft: "auto",
              }}
            />
          </div>
        ))}

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
          <ProductDisplayCard
            product={product}
            addToCartState={(state) => {
              setAddToCartState(state);
            }}
          />{" "}
          <ReviewBox productId={id} />
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
    </div>
  );
}

export default ProductPage;
