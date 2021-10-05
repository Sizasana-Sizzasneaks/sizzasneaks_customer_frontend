import React from "react";
import { Breadcrumb } from "react-bootstrap";
import { Link } from "react-router-dom";

import Styles from "./ProfilePage.module.css";

function ProfilePage(props) {
  return (
    <div>
      {" "}
      <Breadcrumb style={{ margin: "20px" }}>
        <Breadcrumb.Item>
          <Link to="/">Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item active>Profile</Breadcrumb.Item>
      </Breadcrumb>
    </div>
  );
}

export default ProfilePage;
