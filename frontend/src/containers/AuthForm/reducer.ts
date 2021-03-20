import { Routine } from 'redux-saga-routines';
import { fetchUserInfoRoutine, loginRoutine, signupRoutine } from '../../routines/userRoutines';

const initialState = {
  id: undefined,
  email: undefined,
  firstName: undefined,
  lastName: undefined,
  isAuthorized: false
};

const userData = (state = initialState, action: Routine<any>) => {
  switch (action.type) {
    case fetchUserInfoRoutine.SUCCESS: {
      return {
        ...state,
        ...action.payload,
        isAuthorized: true
      };
    }
    case 'AUTHENTICATION:CHANGE': {
      return {
        ...state,
        isAuthorized: action.payload,
      }
    }
    case loginRoutine.FAILURE: {
      return {
        ...state,
        isAuthorized: false
      };
    }
    case signupRoutine.FAILURE: {
      return {
        ...state,
        isAuthorized: false
      };
    }
    default:
      return state;
  }
};

export default userData;
