import React from "react";
import { useParams } from "react-router-dom";
import Styles from "./ProductPage.module.css";

import CircularProgress from "@material-ui/core/CircularProgress";

import ProductDisplayCard from "../products/ProductDisplayCard.js";
import ReviewBox from "../review/ReviewBox.js";

import ProductCarousel from "../general/ProductsCarousel.js";

import { getProduct } from "../../api/products.js";

import { StylesProvider } from "@material-ui/core";


//This is the page that shows when a user clicks a products

function ProductPage() {
  var [product, setProduct] = React.useState(null);
  var [error, setError] = React.useState(null);
  var [loading, setLoading] = React.useState(true);
  var [addToCartState, setAddToCartState] = React.useState(null);

  var { id } = useParams();
//use effects
  React.useEffect(() => {
    console.log("Use Effct");

    getTheProduct(id);
  }, []);
  //function used to get products by its id
  async function getTheProduct(productId) {
    var getProductsResult = await getProduct(productId);
//if the getProductsResult is true show the products 
    if (getProductsResult.ok === true) {
      console.log(getProductsResult);
      setLoading(false);// loading is canceled
      setProduct(getProductsResult.data[0]);
      console.log(getProductsResult.data[0]);// print the getProductsResult to the terminal
    } else {
      setLoading(false);// loading is canceled
      console.log(getProductsResult);// print the getProductsResult to the terminal
      setError(getProductsResult); //will show error
    }
  }
//this method will return a display card for a single product
  return (
    <>
      {addToCartState &&
        (addToCartState.ok ? (
          <div className={Styles.Message}>
            <p>{addToCartState.message}</p>
          </div>
        ) : (
          <div className={Styles.MessageError}>
            <p>{addToCartState.message}</p>
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

export default ProductPage;
