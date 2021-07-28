import React, { useState } from "react";
/* import '@fortawesome/fontawesome-free/css/all.min.css'; 
import 'bootstrap-css-only/css/bootstrap.min.css'; 
import 'mdbreact/dist/css/mdb.css'; */

import Styles from "./ProductPage.module.css";
import { Row, Col } from "react-bootstrap";

import { Grid, Typography } from "@material-ui/core";
// import ImageGrid from "../general/ImageGrid";
// //import MainImage from "../general/MainImage";
// import Info from "../general/Info";
// import Reviews from "../general/Reviews";
// import ProductItem from "../general/ProductItem.js";

import ProductCarousel from "../general/ProductsCarousel.js";

// const images = [
//   "https://res.cloudinary.com/shelflife-online/image/upload/c_fill,f_auto,q_auto:best,w_681/v1575961299/uploads/assets/560-Nike-Air-Force-1-Hello-CZ0327-100-side-075.jpg",
//   "https://res.cloudinary.com/shelflife-online/image/upload/c_fill,f_auto,q_auto:best,w_681/v1575961299/uploads/assets/80c-Nike-Air-Force-1-Hello-CZ0327-100-close-up-1-6ab.jpg",
//   "https://res.cloudinary.com/shelflife-online/image/upload/c_fill,f_auto,q_auto:best,w_681/v1575961299/uploads/assets/867-Nike-Air-Force-1-Hello-CZ0327-100-close-up-2-380.jpg",
// ];

// const product = {
//   title: "Airforce 1",
//   description:
//     "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
//   price: 1999,
//   brand: "Nike",
// };

// const reviews = {
//   name: "Levi Ackerman",
// };

import image from "../../images/product-item-image.png";
import { Style } from "@material-ui/icons";

function ProductPage() {
  return (
    <>
      <ProductDisplayCard />
    </>
  );
}

function ProductDisplayCard(props) {
  return (
    <div className={Styles.currentProductCard}>
      <Row>
        <Col className={Styles.currentProductImagesSegment} xs={5}>
          <Row>
            <Col className={Styles.imageOptionsSegment} xl={4} xs={4}>
              <img src={image} />
              <img src={image} />
              <img src={image} />
              <img src={image} />
              <img src={image} />
              <img src={image} />
            </Col>
            <Col className={Styles.mainImageSegment} xl={8} xs={8}>
              <img src={image} />
            </Col>
          </Row>
        </Col>
        <Col className={Styles.currentProductDetailsSegment}>
          <Row>
            <Col className={Styles.brand}>
              <p>Nike</p>
            </Col>
          </Row>
          <Row>
            <Col className={Styles.productName}>
              <p>Product Name</p>
            </Col>
          </Row>
          <Row>
            <Col className={Styles.productDescription}>
              <p>
                The Nike Jordan 11 is made from premium leather and the finest
                materials. This shoes uses Nike's patented zoom technology to
                deliver a next level feeling of comfort.
              </p>
            </Col>
          </Row>
          <Row>
            <Col className={Styles.productRating}>
              <span class="material-icons">star</span>
              <span class="material-icons">star</span>
              <span class="material-icons">star</span>
              <span class="material-icons">star_outline</span>
              <span class="material-icons">star_outline</span>
            </Col>
          </Row>
          <Row>
            <Col className={Styles.colorSelector}>
              {" "}
              <OptionSelector
                label="Color"
                options={["Blue", "Red", "Green"]}
              />
            </Col>
          </Row>
          <Row>
            <Col className={Styles.sizeSelector}>
              <OptionSelector label="Size" options={[4, 3, 8]} />
            </Col>
          </Row>
          <Row className={Styles.priceAndButtons}>
            <Col className={Styles.productPrice}>
              <p>R 1,389.00</p>
            </Col>
            <Col className={Styles.cardButtons}>
              <Button label="ADD TO CART" color="#F3D63C" />
              <Button label="ADD TO WISHLIST" color="#E3E3E3" />
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}

function Button(props) {
  return (
    <div
      className={Styles.productPageButton}
      style={{ backgroundColor: props.color }}
    >
      {props.label}
    </div>
  );
}

function OptionSelector(props) {
  return (
    <div>
      <div className={Styles.optionSelectorBanner}>
        <p>{props.label}</p>
        <span class="material-icons">arrow_drop_down</span>
      </div>

      <div className={Styles.optionSelectorOptions}>
        <div className={Styles.optionItem}>
          <p>{props.options[0]}</p>
        </div>
        <div className={Styles.optionItem}>
          <p>{props.options[1]}</p>
        </div>
        <div className={Styles.optionItem}>
          <p>{props.options[2]}</p>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
