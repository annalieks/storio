import React, { useEffect } from 'react';
import { history } from '@helpers/history.helper';
import { Header } from '@components/Header';
import { Route, Router, Switch } from 'react-router-dom';
import LandingPage from '@containers/LandingPage';
import AuthForm from '@containers/AuthForm';
import CoursePage from '@containers/CoursePage';
import { connect } from 'react-redux';
import { store } from '@root/store';

interface IRouterProps {
  isAuthorized: boolean;
}

const AppRouter: React.FC<IRouterProps> = ({ isAuthorized }) => {
  useEffect(() => {
    const authStatus = Boolean(localStorage.getItem('accessToken'));
    store.dispatch({ type: 'AUTHENTICATION:CHANGE', payload: authStatus });
  }, []);

  return (
    <Router history={history}>
      <Header isAuthorized={isAuthorized}/>
      <Switch>
        <Route exact path="/" component={LandingPage}/>
        <Route exact path="/login" component={AuthForm}/>
        <Route exact path="/signup" component={() => <AuthForm register={true}/>}/>
        <Route exact path="/course/:courseId" component={CoursePage}/>
      </Switch>
    </Router>
  );
}

const mapStateToProps = (state: any) => ({
  isAuthorized: state.auth.isAuthorized
});

export default connect(mapStateToProps)(AppRouter);
