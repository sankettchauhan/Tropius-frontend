import React from "react";
import { Redirect, Route } from "react-router-dom";
import { isAuthenticated } from "../../helper/auth";

function ProtectedRoute({ component: Component, ...restOfProps }) {
  return (
    <Route
      {...restOfProps}
      render={(props) =>
        isAuthenticated() ? <Component {...props} /> : <Redirect to="/auth" />
      }
    />
  );
}

export default ProtectedRoute;
