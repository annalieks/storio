import { combineReducers } from 'redux';
import { reducer as toastr } from 'react-redux-toastr';
import auth from '@containers/AuthForm/reducer';
import home from '@containers/HomePage/reducer';

export default combineReducers({
  auth,
  home,
  toastr,
});
