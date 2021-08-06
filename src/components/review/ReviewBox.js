import React from "react";
import { Row, Col } from "react-bootstrap";
import Styles from "./ReviewBox.module.css";
import ViewReview from "./ViewReview.js";

import {
  getReviewsByProductId,
  sendAReview,
  deleteReviewByReviewId,
} from "../../api/reviews.js";

import WriteReview from "./WriteReview.js";
import { CircularProgress, LinearProgress } from "@material-ui/core";

function ReviewBox(props) {
  var [reviews, setReviews] = React.useState(null);
  var [reviewLoad, setReviewLoad] = React.useState(true);

  var [getReviewError, setGetReviewError] = React.useState(null);

  React.useEffect(() => {
    getReviews();
  }, []);

  async function getReviews() {
    setGetReviewError(null);
    setReviews(null);
    setReviewLoad(true);
    var getReviewsByProductIdResult = await getReviewsByProductId(
      props.productId
    );
    setReviewLoad(false);
    if (getReviewsByProductIdResult.ok === true) {
      setReviews(getReviewsByProductIdResult.data);
      console.log(getReviewsByProductIdResult);
    } else {
      setGetReviewError(getReviewsByProductIdResult);
    }
  }

  async function deleteReview(review_id) {
    if (typeof review_id !== "undefined") {
      var deleteReviewByReviewIdResult = await deleteReviewByReviewId(
        review_id
      );

      return deleteReviewByReviewIdResult;
    } else {
      return { ok: false, message: " Insufficient Information Supplied" };
    }
  }

  async function writeAReview(review) {
    if (
      typeof review.rating !== "undefined" &&
      typeof review.body !== "undefined" &&
      typeof props.productId !== "undefined"
    ) {
      //Add Product ID
      review.product_id = props.productId;

      var writeAReviewResult = await sendAReview(review);
      getReviews();

      return writeAReviewResult;
      //Send Review
    } else {
      return { ok: false, message: "Review Fields Insufficient" };
    }
  }

  return (
    <div className={Styles.reviewBox}>
      <Row>
        {reviewLoad && <CircularProgress />}
        {reviews && (
          <Col className={Styles.reviewCount}>
            <p>Reviews ({reviews && reviews.reviewCount})</p>
          </Col>
        )}
      </Row>
      {reviews && (
        <Row>
          <Col className={Styles.averageRating}>
            <span
              style={{ fontSize: "25px", alignItems: "baseline" }}
              class="material-icons"
            >
              star_outline
            </span>
            <p style={{ marginRight: "0px", fontSize: "25px" }}>
              {reviews.ratingAverage}
            </p>
            <p>/5</p>
            <p style={{ color: "black" }}>Average Rating</p>
          </Col>
        </Row>
      )}

      <WriteReview writeReview={writeAReview} />
      <Row>
        <Col className={Styles.divider}></Col>
      </Row>
      {reviews &&
        reviews.reviews.map((review) => {
          return (
            <ViewReview
              fullName={review.customerFullName}
              rating={review.rating}
              body={review.body}
              createdAt={review.createdAt}
              user={review.customer_id}
              id={review._id}
              deleteReview={deleteReview}
              callGetReviews={getReviews}
            />
          );
        })}

      {getReviewError && (
        <p style={{ color: "red", fontSize: "20px", marginTop: "15px" }}>
          {getReviewError.message}
        </p>
      )}

      {reviewLoad && (
        <Row>
          <Col style={{ margin: "20px 0px" }}>
            <LinearProgress />
          </Col>
        </Row>
      )}
    </div>
  );
}

export default ReviewBox;
