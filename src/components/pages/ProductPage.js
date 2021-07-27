import React, { useState } from "react";
/* import '@fortawesome/fontawesome-free/css/all.min.css'; 
import 'bootstrap-css-only/css/bootstrap.min.css'; 
import 'mdbreact/dist/css/mdb.css'; */

import Styles from "./ProductPage.module.css";
import { Row, Col } from "react-bootstrap";

import { Grid, Typography } from "@material-ui/core";
import ImageGrid from "../general/ImageGrid";
//import MainImage from "../general/MainImage";
import Info from "../general/Info";
import Reviews from "../general/Reviews";
import ProductItem from "../general/ProductItem.js";

import ProductCarousel from "../general/ProductsCarousel.js";

const images = [
  "https://res.cloudinary.com/shelflife-online/image/upload/c_fill,f_auto,q_auto:best,w_681/v1575961299/uploads/assets/560-Nike-Air-Force-1-Hello-CZ0327-100-side-075.jpg",
  "https://res.cloudinary.com/shelflife-online/image/upload/c_fill,f_auto,q_auto:best,w_681/v1575961299/uploads/assets/80c-Nike-Air-Force-1-Hello-CZ0327-100-close-up-1-6ab.jpg",
  "https://res.cloudinary.com/shelflife-online/image/upload/c_fill,f_auto,q_auto:best,w_681/v1575961299/uploads/assets/867-Nike-Air-Force-1-Hello-CZ0327-100-close-up-2-380.jpg",
];

const product = {
  title: "Airforce 1",
  description:
    "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
  price: 1999,
  brand: "Nike",
};

const reviews = {
  name: "Levi Ackerman",
};

function ProductPage() {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <>
      <div>
        <div className={Styles.currentProductCard}>
          <Row>
            <Col className={Styles.currentProductImagesSegment}>
              <Row>
                <Col className={Styles.imageOptionsSegment} xl={2}>
                  {" "}
                  <ImageGrid
                    images={images}
                    onSelect={setSelectedImage}
                    selectedImage={selectedImage}
                  />
                </Col>
                <Col className={Styles.mainImageSegment} xl={10}>
                  <Grid Item sm={5}>
                    <MainImage src={images[selectedImage]} />
                  </Grid>
                </Col>
              </Row>
            </Col>
            <Col className={Styles.currentProductDetailsSegment}>
              <Row>
                <Col>Brand</Col>
              </Row>
              <Row>
                <Col>Product Name</Col>
              </Row>
              <Row>
                <Col>Product Description</Col>
              </Row>
              <Row>
                <Col>Product Rating</Col>
              </Row>
              <Row>
                <Col>Color Selector</Col>
              </Row>
              <Row>
                <Col>Size Selector</Col>
              </Row>
              <Row>
                <Col>Price</Col>
                <Col>ADD TO CART ADD TO WISHLIST</Col>
              </Row>
            </Col>
          </Row>

          {/* <Grid
            container
            spacing={1}
            style={{ maxWidth: 1100, margin: "0 auto" }}
          >
            <Grid Item sm={1}>
              <ImageGrid
                images={images}
                onSelect={setSelectedImage}
                selectedImage={selectedImage}
              />
            </Grid>
            <Grid Item sm={5}>
              <MainImage src={images[selectedImage]} />
            </Grid>
            <Grid Item sm={6}>
              <Info {...product} />
            </Grid>
          </Grid> */}
        </div>

        {/* <Grid
          container
          spacing={1}
          style={{ maxWidth: 1100, margin: "0 auto" }}
        >
          <Grid Item>
            <Reviews {...reviews} />
          </Grid>
        </Grid> */}

        <div className="w-100"></div>
      </div>
      <ProductCarousel label="Related Products" />
    </>
  );
}

 function MainImage({ src }){
  return <div>
      <img src={src} width="100%"/>
  </div>;
}

export default ProductPage;
