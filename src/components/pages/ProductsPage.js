import React from "react";
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
          <PageNumberHolder pageNumber={1} activePage={true}/>
          <PageNumberHolder pageNumber={2} activePage={true} />
          <PageNumberHolder pageNumber={3}/>
          <PageNumberHolder pageNumber={4}/>
          <PageNumberHolder pageNumber={5}/>
          <PageNumberHolder pageNumber={">"}/>
          <PageNumberHolder pageNumber={">>"}/>
        </div>
      </Grid>
    </>
  );
}

export default ProductsPage;

function PageNumberHolder(props) {

  var className = props.activePage ? "page-number-holder active-page": "page-number-holder";


  return (
    <div className={className}>
      <p>{props.pageNumber}</p>
    </div>
  );
}

