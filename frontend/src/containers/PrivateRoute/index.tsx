import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';

interface IPrivateRouteProps {
  isAuthorized: boolean;
  component: React.FC;
  rest: never;
}

const PrivateRoute: React.FC<IPrivateRouteProps> = ({
  isAuthorized,
  component,
  ...rest
}) => {
  return isAuthorized
    ? (<Route {...rest} component={component}/>)
    : (<Redirect to="/login"/>);
};

const mapStateToProps = (state: any) => ({
  isAuthorized: state.auth.isAuthorized
});

export default connect(mapStateToProps)(PrivateRoute);
