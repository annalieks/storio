import { combineReducers } from 'redux';
import { reducer as toastr } from 'react-redux-toastr';
import auth from '@containers/AuthForm/reducer';

export default combineReducers({
  auth,
  toastr,
});
