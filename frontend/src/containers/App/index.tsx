import React from 'react';
import { Provider } from 'react-redux';
import { store } from '@root/store';
import { LandingPage } from '@containers/LandingPage';
import { Header } from '@components/Header';
import { Router, Switch, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { AuthForm } from '@containers/AuthForm';
import { CoursePage } from '@containers/CoursePage';

export const history = createBrowserHistory();

const App: React.FC = () => (
  <Provider store={store}>
    <Router history={history}>
      <Header isAuthorized={false}/>
      <Switch>
        <Route exact path="/" component={LandingPage}/>
        <Route exact path="/login" component={AuthForm}/>
        <Route exact path="/signup" component={() => <AuthForm register={true}/>}/>
        <Route exact path="/course/:courseId" component={CoursePage}/>
      </Switch>
    </Router>
  </Provider>
);

export default App;
