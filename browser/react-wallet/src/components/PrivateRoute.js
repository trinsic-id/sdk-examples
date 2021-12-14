import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from "react-router-dom";

function PrivateRoute({ children, loggedIn, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        loggedIn ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

const mapStateToProps = (state) => {
  const { loggedIn } = state.authentication;
  console.log(loggedIn)
  return {
    loggedIn
  };
};

export default connect(mapStateToProps, null)(PrivateRoute);