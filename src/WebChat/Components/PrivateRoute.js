import React from "react";
import { Redirect, Route } from "react-router-dom";

export default function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      component={(props) => {
        const loggedInUser = localStorage.getItem("User")
          ? JSON.parse(localStorage.getItem("User"))
          : null;

        if (loggedInUser) {
          return <Component {...props} />;
        } else {
          return <Redirect to={"/"} />;
        }
      }}
    />
  );
}
