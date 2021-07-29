import React from "react";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

import ProductItemImage from "../../images/product-item-image.png";

function ProductItem(props) {
  return (
    <Link to={"/products/" + props.product._id}>
      <div className="product-item">
        <Row>
          <Col>
            <img
              className="product-item-image"
              src={props.product.imgURls[0]}
              alt={props.product.productName}
            />
          </Col>
        </Row>
        <Row className="name-rating-row row">
          <Col>
            {" "}
            <p>{props.product.productName}</p>
          </Col>
          <Col xl={2}>
            <p>4.2</p>
          </Col>
        </Row>
        <Row>
          <Col>
            <p>{props.product.brand}</p>
          </Col>
        </Row>
        <Row className="name-rating-row row">
          <Col>
            {" "}
            <p>R {props.product.sellingPrice} </p>
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
