import React from 'react';
import { Provider } from 'react-redux';
import { store } from '@root/store';
import { LandingPage } from '@containers/LandingPage';
import { Header } from '@components/Header';
import { Router, Switch, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';

export const history = createBrowserHistory();

const App: React.FC = () => (
  <Provider store={store}>
    <Router history={history}>
      <Header isAuthorized={false}/>
      <Switch>
        <Route exact path="/" component={LandingPage}/>
      </Switch>
    </Router>
  </Provider>
);

export default App;
