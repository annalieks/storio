import React from 'react';
import { Redirect, Route } from 'react-router-dom';

const PrivateRoute: React.FC<{
  component: React.FC;
  rest: never;
}> = ({
  component,
  ...rest
}) => {

  // TODO: Redux state
  const condition = true;

  return condition
    ? (<Route {...rest} component={component}/>)
    : (<Redirect to="/login"/>);
};

export default PrivateRoute;
