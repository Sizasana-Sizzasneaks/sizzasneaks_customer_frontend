import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

function ProtectedRoute({ component: Component, ...rest }) {
  const auth = useSelector((state) => state.firebase.auth);

  return (
    <Route
      {...rest}
      render={(props) => {
        if (!auth.isEmpty && !auth.isAnonymous) {
          return <Component />;
        } else {
          return (
            <Redirect
              to={{ pathname: "/sign-up", state: { from: props.location } }}
            />
          );
        }
      }}
    />
  );
}

export default ProtectedRoute;
