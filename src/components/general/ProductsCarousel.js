import React from "react";
import { Grid } from "@material-ui/core";
import { Row, Col } from "react-bootstrap";

import Styles from "./ProductsCarousel.module.css";

import ProductItem from "./ProductItem.js";
//This page conatins a functionality that determines how the products will look on a page 
function ProductCarousel(props) {
  return (
    <div className={Styles.coursel_segment}>
      <Row>
        <div className="home-section-header">
          <p style={{ marginLeft: "10px" }}>{props.label}</p>
        </div>
      </Row>
      <Grid container spacing={1} style={{ maxWidth: 1100, margin: "0 auto" }}>
        <Grid Item sm={4}>
          <ProductItem />
        </Grid>
        <Grid Item sm={4}>
          <ProductItem />
        </Grid>
        <Grid Item sm={4}>
          <ProductItem />
        </Grid>
      </Grid>
    </div>
  );//in the code above we created a conatiner and a grid inside the container that holds 4 items in a row
}

export default ProductCarousel;
