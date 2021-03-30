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
import PrivateRoute from '@containers/PrivateRoute';
import ToDo from "@containers/ToDo";

interface IRouterProps {
  fetchUserInfo: () => any;
}

const AppRouter: React.FC<IRouterProps> = ({
  fetchUserInfo
}) => {
  useEffect(() => {
    fetchUserInfo();
  }, []);

  return (
    <Router history={history}>
      <Header/>
      <Switch>
        <Route exact path="/" component={() => <LandingPage/>}/>
        <PrivateRoute exact path="/home" component={HomePage}/>
        <Route exact path="/login" component={() => <AuthForm register={false}/>}/>
        <Route exact path="/signup" component={() => <AuthForm register={true}/>}/>
        <PrivateRoute exact path="/course/:courseId" component={CoursePage}/>
        <PrivateRoute exact path="/todo" component={ToDo} />
      </Switch>
    </Router>
  );
};

const mapDispatchToProps = {
  fetchUserInfo: fetchUserInfoRoutine
};

export default connect(null, mapDispatchToProps)(AppRouter);
