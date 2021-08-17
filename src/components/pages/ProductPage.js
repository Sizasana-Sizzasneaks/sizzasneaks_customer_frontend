import React from "react";
import { useParams } from "react-router-dom";
// import Styles from "./ProductPage.module.css";

import CircularProgress from "@material-ui/core/CircularProgress";

import ProductDisplayCard from "../products/ProductDisplayCard.js";
import ReviewBox from "../review/ReviewBox.js";

import ProductCarousel from "../general/ProductsCarousel.js";

import { getProduct } from "../../api/products.js";



function ProductPage() {
  var [product, setProduct] = React.useState(null);
  var [error, setError] = React.useState(null);
  var [loading, setLoading] = React.useState(true);

  var { id } = useParams();

  React.useEffect(() => {
    console.log("Use Effct");

    getTheProduct(id);
  }, []);

  async function getTheProduct(productId) {
    var getProductsResult = await getProduct(productId);

    if (getProductsResult.ok === true) {
      console.log(getProductsResult);
      setLoading(false);
      setProduct(getProductsResult.data[0]);
      console.log(getProductsResult.data[0]);
    } else {
      setLoading(false);
      console.log(getProductsResult);
      setError(getProductsResult);
    }
  }

  return (
    <>
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
          <ProductDisplayCard product={product} />{" "}
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
