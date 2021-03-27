import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateRoute = (props: any) => {
  return localStorage.getItem('accessToken')
    ? (<Route {...props} component={props.component}/>)
    : (<Redirect to="/login"/>);
};

const mapStateToProps = (state: any) => ({
  isAuthorized: state.auth.isAuthorized
});

export default connect(mapStateToProps)(PrivateRoute);
