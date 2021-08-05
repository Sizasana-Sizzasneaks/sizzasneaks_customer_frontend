import React from "react";
import Styles from "./WriteReview.module.css";
import { Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";

import Button from "../general/Button.js";
import Rating from "./Rating.js";

import {
  validateRatingScore,
  validateRatingBody,
} from "../../services/inputValidation.js";
import {getCurrentDateAsString} from "../../services/dateManipulationFunctions.js"
import { CircularProgress } from "@material-ui/core";

function WriteReview(props) {
  const authState = useSelector((state) => state.firebase.auth);
  const profileState = useSelector((state) => state.profile);

  var [rating, setRating] = React.useState(0);
  var [body, setBody] = React.useState("");

  var [ratingValid, setRatingValid] = React.useState(null);
  var [bodyValid, setBodyValid] = React.useState(null);

  var [formValid, setFormValid] = React.useState(false);

  var [loading, setloading] = React.useState(false);
  var [writeReviewState, setWriteReviewState] = React.useState(null);

  React.useEffect(() => {
    checkFormValidity();
  }, [ratingValid, bodyValid]);

  var currentDate = getCurrentDateAsString();

  async function checkInputValidity() {
    var validateRatingScoreResult = await validateRatingScore(rating);
    await setRatingValid(validateRatingScoreResult);
    var validateRatingBodyResult = await validateRatingBody(body);
    await setBodyValid(validateRatingBodyResult);
    await checkFormValidity();
  }

  async function checkFormValidity() {
    if (ratingValid && bodyValid) {
      if (ratingValid.valid === true && bodyValid.valid === true) {
        setFormValid(true);
      } else {
        setFormValid(false);
      }
    }
  }

  function clearFields() {
    setRating(0);
    setBody("");
    setRatingValid(null);
    setBodyValid(null);
    setWriteReviewState(null);
    setFormValid(false);
  }

  return (
    <Row className={Styles.WriteReview}>
      <Col>
        {authState.isEmpty || authState.isAnonymous ? (
          <p style={{ margin: "auto", textAlign: "center", fontSize: "18px" }}>
            <span style={{ fontWeight: "500" }}>Sign Up</span> /{" "}
            <span style={{ fontWeight: "500" }}>Log In</span> to leave a{" "}
            <span style={{ fontWeight: "500" }}>review </span>
            for this <span style={{ fontWeight: "500" }}>product</span>.
          </p>
        ) : (
          <>
            <Row>
              <Col className={Styles.WriteReviewHeader}>
                {!profileState.loading ? (
                  <p>{profileState.firstName + " " + profileState.lastName}</p>
                ) : (
                  <CircularProgress style={{ marginRight: "10px" }} size={22} />
                )}
                <Rating
                  value={rating}
                  mutable={true}
                  trackRating={async (value) => {
                    await setRating(value);
                    var validateRatingScoreResult = await validateRatingScore(
                      value
                    );
                    setRatingValid(validateRatingScoreResult);
                  }}
                />{" "}
                <p
                  style={{
                    fontWeight: "300",
                    color: "red",
                    margin: "0px",
                    marginLeft: "10px",
                    display: "flex",
                    alignItems: "start",
                  }}
                >
                  {" "}
                  {ratingValid &&
                    (!ratingValid.valid ? ratingValid.message : "")}
                </p>
                {loading ? (
                  <CircularProgress style={{ marginRight: "10px" }} size={22} />
                ) : (
                  ""
                )}
                {writeReviewState && (
                  <>
                    {writeReviewState.ok === true ? (
                      <p style={{ color: "green" }}>
                        {writeReviewState.message}
                      </p>
                    ) : (
                      <p style={{ color: "red" }}>{writeReviewState.message}</p>
                    )}
                  </>
                )}
                <p style={{ marginLeft: "auto", marginRight: "0px" }}>
                  {currentDate}
                </p>
              </Col>
            </Row>
            <Row>
              <Col className={Styles.WriteReviewBody}>
                <div className={Styles.TextAreaWrapper}>
                  <textarea
                    className={Styles.TextArea}
                    rows="3"
                    placeholder="Write a review..."
                    value={body}
                    onChange={async (event) => {
                      await setBody(event.target.value);
                      var validateRatingBodyResult = await validateRatingBody(
                        event.target.value
                      );
                      setBodyValid(validateRatingBodyResult);
                    }}
                  ></textarea>
                </div>
              </Col>
            </Row>
            <Row>
              <Col className={Styles.ErrorMessage}>
                <p>
                  {" "}
                  {bodyValid && (!bodyValid.valid ? bodyValid.message : "")}
                </p>
              </Col>
            </Row>
            <Row>
              <Col className={Styles.WriteReviewPublishSection}>
                <Button
                  disabled={!formValid}
                  onClick={async () => {
                    await checkInputValidity();

                    if (formValid === true) {
                      if (typeof props.writeReview !== "undefined") {
                        setloading(true);
                        var writeAReviewResult = await props.writeReview({
                          rating: rating,
                          body: body,
                        });
                        setloading(false);

                        if (writeAReviewResult.ok === true) {
                          setWriteReviewState(writeAReviewResult);
                          setTimeout(() => {
                            clearFields();
                          }, 1000);
                        } else {
                          setRatingValid(writeAReviewResult);
                        }
                      }
                    }
                  }}
                  label="Publish"
                  styles={{ float: "right" }}
                />
              </Col>
            </Row>
          </>
        )}
      </Col>
    </Row>
  );
}

export default WriteReview;
