import React, { useEffect } from 'react';
import { history } from '@helpers/history.helper';
import { Header } from '@components/Header';
import { Route, Router, Switch } from 'react-router-dom';
import LandingPage from '@containers/LandingPage';
import AuthForm from '@containers/AuthForm';
import CoursePage from '@containers/CoursePage';
import { connect } from 'react-redux';
import HomePage from '@containers/HomePage';
import { fetchUserInfoRoutine } from '@routines/userRoutines';

interface IRouterProps {
  isAuthorized: boolean;
  fetchUserInfo: () => any;
}

const AppRouter: React.FC<IRouterProps> = ({
  isAuthorized,
  fetchUserInfo
}) => {
  useEffect(() => {
    fetchUserInfo();
  }, []);

  return (
    <Router history={history}>
      <Header isAuthorized={isAuthorized}/>
      <Switch>
        <Route exact path="/" component={() => <LandingPage isAuthorized={isAuthorized}/>}/>
        <Route exact path="/home" component={HomePage}/>
        <Route exact path="/login" component={() => <AuthForm register={false}/>}/>
        <Route exact path="/signup" component={() => <AuthForm register={true}/>}/>
        <Route exact path="/course/:courseId" component={CoursePage}/>
      </Switch>
    </Router>
  );
};

const mapStateToProps = (state: any) => ({
  isAuthorized: state.auth.isAuthorized
});

const mapDispatchToProps = {
  fetchUserInfo: fetchUserInfoRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(AppRouter);
