import React from "react";
import { Row, Col } from "react-bootstrap";
import ProductItem from "../general/ProductItem.js";
import { Grid } from "@material-ui/core";

function ProductsPage() {
  return (
    <>
      <Grid container spacing={5}>
        <Grid item xs={20} sm={5} md={3}>
          <div className="products-display">
            <ProductItem />
          </div>
        </Grid>
        <Grid item xs={20} sm={5} md={3}>
          <div className="products-display">
            <ProductItem />
          </div>
        </Grid>
        <Grid item xs={20} sm={5} md={3}>
          <div className="products-display">
            <ProductItem />
          </div>
        </Grid>
        <Grid item xs={20} sm={5} md={3}>
          <div className="products-display">
            <ProductItem />
          </div>
        </Grid>
        <Grid item xs={20} sm={5} md={3}>
          <div className="products-display">
            <ProductItem />
          </div>
        </Grid>
        <Grid item xs={20} sm={5} md={3}>
          <div className="products-display">
            <ProductItem />
          </div>
        </Grid>
        <Grid item xs={20} sm={5} md={3}>
          <div className="products-display">
            <ProductItem />
          </div>
        </Grid>
        <Grid item xs={20} sm={5} md={3}>
          <div className="products-display">
            <ProductItem />
          </div>
        </Grid>
        <Grid item xs={20} sm={5} md={3}>
          <div className="products-display">
            <ProductItem />
          </div>
        </Grid>
        <Grid item xs={20} sm={5} md={3}>
          <div className="products-display">
            <ProductItem />
          </div>
        </Grid>
        <Grid item xs={20} sm={5} md={3}>
          <div className="products-display">
            <ProductItem />
          </div>
        </Grid>
        <Grid item xs={20} sm={5} md={3}>
          <div className="products-display">
            <ProductItem />
          </div>
        </Grid>
      </Grid>

      <Grid container>
        <div className="page-number-indicator-section">
          <PageNumberHolder/>
          <PageNumberHolder2/>
          <PageNumberHolder3/>
          <PageNumberHolder4/>
          <PageNumberHolder5/>
          <PageNumberHolder6/>


        </div>
      </Grid>
    </>
  );
}

export default ProductsPage;

function PageNumberHolder() {
  return (
    <div className="page-number-holder-1">
      <p>1</p>
    </div>
  );
}
function PageNumberHolder2() {
    return (
      <div className="page-number-holder-2">
        <p>2</p>
      </div>
    );
  }
  function PageNumberHolder3() {
    return (
      <div className="page-number-holder-2">
        <p>3</p>
      </div>
    );
  }
  function PageNumberHolder4() {
    return (
      <div className="page-number-holder-2">
        <p>4</p>
      </div>
    );
  }
  function PageNumberHolder5() {
    return (
      <div className="page-number-holder-2">
        <p>{">"}</p>
      </div>
    );
  }
  function PageNumberHolder6() {
    return (
      <div className="page-number-holder-2">
        <p>{">>"}</p>
      </div>
    );
  }
