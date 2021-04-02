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
import CreateCoursePage from '@containers/CreateCoursePage';
import ToDo from "@containers/ToDo";
import UserPage from '@containers/UserPage';

interface IRouterProps {
  userId: string;
  fetchUserInfo: () => any;
}

const AppRouter: React.FC<IRouterProps> = ({
  userId,
  fetchUserInfo
}) => {
  useEffect(() => {
    fetchUserInfo();
  }, []);

  return (
    <Router history={history}>
      <Header userId={userId}/>
      <Switch>
        <Route exact path="/" component={() => <LandingPage/>}/>
        <PrivateRoute exact path="/home" component={HomePage}/>
        <Route exact path="/login" component={() => <AuthForm register={false}/>}/>
        <Route exact path="/signup" component={() => <AuthForm register={true}/>}/>
        <PrivateRoute exact path="/course/:courseId" component={CoursePage}/>
        <PrivateRoute exact path="/user/:id" component={UserPage}/>
        <PrivateRoute exact path="/create/course" component={CreateCoursePage}/>
        <PrivateRoute exact path="/todo" component={ToDo} />
      </Switch>
    </Router>
  );
};

const mapStateToProps = (state: any) => ({
  userId: state.auth.id,
});

const mapDispatchToProps = {
  fetchUserInfo: fetchUserInfoRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(AppRouter);
