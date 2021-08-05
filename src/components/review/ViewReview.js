import React from "react";
import { Row, Col } from "react-bootstrap";
import Styles from "./ViewReview.module.css";
import { CircularProgress } from "@material-ui/core";

import { useSelector } from "react-redux";

import Button from "../general/Button.js";
import Rating from "./Rating.js";

import { convertDateToString } from "../../services/dateManipulationFunctions.js";

function ViewReview(props) {
  const authState = useSelector((state) => state.firebase.auth);

  var [deletReviewState, setDeletReviewState] = React.useState(null);
  var [deleteLoad, setDeleteLoad] = React.useState(false);

  return (
    <Row className={Styles.reviewViewCard}>
      <Col xs={12} style={{ padding: "0px" }}>
        <Row>
          <Col className={Styles.name}>
            <p>{props.fullName}</p>
            {deleteLoad ? (
              <CircularProgress style={{ marginRight: "10px" }} size={22} />
            ) : (
              ""
            )}
            {deletReviewState && (
              <>
                {deletReviewState.ok === true ? (
                  <p style={{ color: "green" }}>{deletReviewState.message}</p>
                ) : (
                  <p style={{ color: "red" }}>{deletReviewState.message}</p>
                )}
              </>
            )}
            <p style={{ marginLeft: "auto", marginRight: "0px" }}>
              {convertDateToString(props.createdAt)}
            </p>
          </Col>
        </Row>
        <Row>
          <Col className={Styles.rating}>
            <Rating value={props.rating} />
          </Col>
        </Row>

        <Row>
          <Col className={Styles.body}>
            <p>{props.body}</p>
          </Col>
        </Row>

        {!authState.isEmpty &&
          !authState.isAnonymous &&
          (authState.uid === props.user ? (
            <Row>
              <Col className={Styles.delete}>
                {" "}
                <Button
                  onClick={async () => {
                    if (
                      typeof props.id !== "undefined" &&
                      typeof props.deleteReview !== "undefined"
                    ) {
                      setDeleteLoad(true);
                      var deleteReviewResult = await props.deleteReview(
                        props.id
                      );

                      setDeleteLoad(false);
                      if (deleteReviewResult.ok === true) {
                        setDeletReviewState(deleteReviewResult);

                        if (typeof props.callGetReviews !== "undefined") {
                          setTimeout(() => {
                            props.callGetReviews();
                          }, 2000);
                        }
                      } else {
                        setDeletReviewState(deleteReviewResult);
                      }
                    }
                  }}
                  label="Delete"
                  styles={{ float: "right" }}
                />
              </Col>
            </Row>
          ) : (
            ""
          ))}
      </Col>
    </Row>
  );
}

export default ViewReview;
