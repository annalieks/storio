import React from 'react';
import ReduxToastr from 'react-redux-toastr';
import { Provider } from 'react-redux';
import { store } from '@root/store';
import AppRouter from '@containers/AppRouter';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';

const App: React.FC = () => (
  <Provider store={store}>
    <ReduxToastr
      timeOut={2000}
      newestOnTop={false}
      preventDuplicates
      position="top-left"
      transitionIn="fadeIn"
      transitionOut="fadeOut"
      progressBar
      closeOnToastrClick/>
    <AppRouter />
  </Provider>
);

export default App;
