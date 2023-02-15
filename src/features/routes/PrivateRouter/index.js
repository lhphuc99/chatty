import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const PrivateRoute = ({ component: Component, ...rest }) => {

  const token = cookies.get('token');
  const checkAuthenticated = token ? true:false;
  return (
    <Route
      {...rest}
      render={(props) =>
        checkAuthenticated === true ? (
          <Component {...props} />
        ) : (
          <Redirect to="/signin" />
        )
      }
    />
  );
};

export default PrivateRoute;