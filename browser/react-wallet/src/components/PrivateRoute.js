import React from 'react';
import { connect } from 'react-redux';
import { Navigate } from "react-router-dom";

function PrivateRoute({ children, loggedIn = true }) {
  return loggedIn ? children : <Navigate to="/login" />;
}

const mapStateToProps = (state) => {
  const { loggedIn } = state.authentication;

  return {
    loggedIn
  };
};

export default connect(mapStateToProps, null)(PrivateRoute);