import React from "react";
import Styles from "./WriteReview.module.css";
import { Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { sendEmailVerificationEmail } from "../../services/authentication.js";

import Button from "../general/Button.js";
import Rating from "./Rating.js";

import {
  validateRatingScore,
  validateRatingBody,
} from "../../services/inputValidation.js";
import { getCurrentDateAsString } from "../../services/dateManipulationFunctions.js";
import { CircularProgress } from "@material-ui/core";
//Function used for Writing a review
function WriteReview(props) {
  const authState = useSelector((state) => state.firebase.auth);
  const profileState = useSelector((state) => state.profile);

  var [rating, setRating] = React.useState(0); // initail state of Rating set to 0
  var [body, setBody] = React.useState(""); // initail state of body set to nothing

  var [ratingValid, setRatingValid] = React.useState(null); //Used to check if the rating is valid
  var [bodyValid, setBodyValid] = React.useState(null); //Used to check if the body is valid

  var [formValid, setFormValid] = React.useState(false); //Used to check if the Form is valid

  var [loading, setloading] = React.useState(false);
  var [writeReviewState, setWriteReviewState] = React.useState(null);

  var [loadingRequest, setLoadingRequest] = React.useState(false);
  var [requestVerEmailState, setRequestVerEmailState] = React.useState(null);

  React.useEffect(() => {
    checkFormValidity();
  }, [ratingValid, bodyValid]); //Refreshes the screen

  var currentDate = getCurrentDateAsString();
  //Function to check Input Validation for rating and Body
  async function checkInputValidity() {
    var validateRatingScoreResult = await validateRatingScore(rating);
    await setRatingValid(validateRatingScoreResult);
    var validateRatingBodyResult = await validateRatingBody(body);
    await setBodyValid(validateRatingBodyResult);
    await checkFormValidity();
  }
  //function to check validation for Form e.g. Both Rating and body is required to publish a review
  async function checkFormValidity() {
    if (ratingValid && bodyValid) {
      if (ratingValid.valid === true && bodyValid.valid === true) {
        setFormValid(true);
      } else {
        setFormValid(false);
      }
    }
  }
  //Clears the feilds once the review is publised or deleted
  function clearFields() {
    setRating(0);
    setBody("");
    setRatingValid(null);
    setBodyValid(null);
    setWriteReviewState(null);
    setFormValid(false);
  }
  //visual aspect of how the Write Review fucntion will show
  // Visual functionalities of a review will be published
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
        ) : authState.emailVerified ? (
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
                    await checkInputValidity(); //Awaits checkInputValidity before publishing a review

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
                            clearFields(); //clear filds after a review is published
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
        ) : (
          <>
            <p
              style={{
                margin: "auto",
                textAlign: "center",
                fontSize: "18px",
                marginBottom: "10px",
              }}
            >
              Please
              <span style={{ fontWeight: "500" }}>
                {" "}
                verify your email address{" "}
              </span>
              in order to leave a
              <span style={{ fontWeight: "500" }}> review </span>
              for this
              <span style={{ fontWeight: "500" }}> product</span>.
            </p>
            <p
              className={Styles.RequestVerificationText}
              onClick={async () => {
                setRequestVerEmailState(null);
                setLoadingRequest(true);
                var sendEmailVerificationEmailResult =
                  await sendEmailVerificationEmail();

                if (sendEmailVerificationEmailResult.ok) {
                  setLoadingRequest(false);
                  setRequestVerEmailState({ ok: true });
                } else {
                  setLoadingRequest(false);
                  setRequestVerEmailState({ ok: false });
                }
              }}
              style={{
                fontWeight: "500",
                color: "blue",
                margin: "auto",
                textAlign: "center",
                fontSize: "18px",
                marginBottom: "10px",
              }}
            >
              {" "}
              Request Verification Email
            </p>
            {loadingRequest && (
              <div style={{ alignContent: "center", display: "flex" }}>
                <CircularProgress size={20} style={{ margin: "0px auto" }} />
              </div>
            )}
            {requestVerEmailState &&
              (requestVerEmailState.ok ? (
                <p
                  style={{
                    fontWeight: "400",
                    color: "green",
                    margin: "auto",
                    textAlign: "center",
                    fontSize: "18px",
                    marginBottom: "0px",
                  }}
                >
                  {" "}
                  Sent
                </p>
              ) : (
                <p
                  style={{
                    fontWeight: "400",
                    color: "red",
                    margin: "auto",
                    textAlign: "center",
                    fontSize: "18px",
                    marginBottom: "0px",
                  }}
                >
                  {" "}
                  Failed
                </p>
              ))}
          </>
        )}
      </Col>
    </Row>
  );
}

export default WriteReview;
