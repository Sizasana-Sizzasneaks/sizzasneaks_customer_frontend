import React from "react";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

import ProductItemImage from "../../images/product-item-image.png";

function ProductItem(props) {
  return (
    <Link to="/product"> 
    <div className="product-item">
      <Row>
        <Col>
          <img
            className="product-item-image"
            src={ProductItemImage}
            alt="Product"
          />
        </Col>
      </Row>
      <Row className="name-rating-row row">
        <Col>
          {" "}
          <p>Jordan 11</p>
        </Col>
        <Col xl={2}>
          <p>4.2</p>
        </Col>
      </Row>
      <Row>
        <Col>
          <p>Nike</p>
        </Col>
      </Row>
      <Row className="name-rating-row row">
        <Col>
          {" "}
          <p>R1,250</p>
        </Col>
        <Col xl={5} style={{ padding: "0px" }}>
          <div
            style={{
              backgroundColor: "#FADA35",
              fontSize: "12px",
              fontWeight: "bold",
              textAlign: "center",
              marginTop: "3px",
            }}
          >
            <p>ADD TO CART</p>
          </div>
        </Col>
      </Row>
    </div>
    </Link>
  );
}

export default ProductItem;
