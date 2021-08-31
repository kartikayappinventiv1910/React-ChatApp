import React, { useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import InitialScreen from "./Pages/initialScreen";
import Loginpage from "./Pages/login";
import SignupPage from "./Pages/SignUp";
import HomePage from "./Pages/HomePage";
import PrivateRoute from "./Components/PrivateRoute";
import { isLoggedInUser } from "../action/authenticationAction";

function WebChat() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (!auth.authenticated) {
      dispatch(isLoggedInUser);
    }
  }, []);

  return (
    <Router>
      <Route path="/" exact component={InitialScreen} />
      <Route path="/Signup" exact component={SignupPage} />
      <Route path="/login" exact component={Loginpage} />
    
      <PrivateRoute path="/GupShup" exact component={HomePage} />
    </Router>
  );
}

export default WebChat;