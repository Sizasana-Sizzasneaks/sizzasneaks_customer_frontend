import React from "react";
import ProductItem from "../general/ProductItem.js";
import { Grid } from "@material-ui/core";
import { useParams } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";

import { getProducts } from "../../api/products.js";

function ProductsPage(props) {
  var [products, setProducts] = React.useState(null);
  var [error, setError] = React.useState(null);
  var [loading, setLoading] = React.useState(true);
  var { searchBy, category } = useParams();

  React.useEffect(() => {
    console.log("Use Effct");

    getTheProducts();
  }, [searchBy, category]);

  async function getTheProducts() {
    setError(null);
    setProducts(null);
    setLoading(true);
    var getProductsResult = await getProducts({
      searchBy: searchBy,
      value: category,
    });

    if (getProductsResult.ok === true) {
      console.log("Worked");
      console.log(getProductsResult);
      setLoading(false);
      setProducts(getProductsResult.data);
    } else {
      console.log("Failed");
      setLoading(false);
      console.log(getProductsResult);
      setError(getProductsResult);
    }
  }

  return (
    <>
      <div>
        <div
          style={{ display: "flex", marginTop: "25px", marginLeft: " 30px" }}
        >
          <p style={{ marginRight: "10px" }}>Home</p>
          <span style={{ marginRight: "10px" }} class="material-icons">
            chevron_right
          </span>
          <p>{category}</p>
        </div>{" "}
        <p
          style={{
            fontSize: "22px",
            fontWeight: "400",
            marginLeft: "45px",
            marginBottom: "30px",
            marginTop: "15px",
          }}
        >
          {category}
        </p>
      </div>
      <Grid container spacing={5} style={{ height: "500px" }}>
        {products &&
          products.map((product) => {
            return (
              <Grid item xs={20} sm={5} md={3}>
                <div className="products-display">
                  <ProductItem product={product} />
                </div>
              </Grid>
            );
          })}
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
      </Grid>
    </>
  );
}

export default ProductsPage;

function PageNumberHolder(props) {
  var className = props.activePage
    ? "page-number-holder active-page"
    : "page-number-holder";

  return (
    <div className={className}>
      <p>{props.pageNumber}</p>
    </div>
  );
}
