import React from "react";
import { Row, Col } from "react-bootstrap";
import ProductItem from "../general/ProductItem.js";

function ProductsPage() {
  return (
    <>
      <Row>
        <Col>
          <div className="products-display">
            <ProductItem />
            <ProductItem />
            <ProductItem />
            <ProductItem /><ProductItem />
            <ProductItem />
            <ProductItem />
          </div>
        </Col>{" "}
      </Row>
      <Row>
        <Col> <div className="page-number-indicator-section">
        <PageNumberHolder />
        <PageNumberHolder />
        <PageNumberHolder />
      </div></Col>{" "}
      </Row>
    </>
  );
}

export default ProductsPage;

function PageNumberHolder() {
  return (
    <div className="page-number-holder">
      <p>1</p>
    </div>
  );
}
