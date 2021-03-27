import { Routine } from 'redux-saga-routines';
import { fetchUserInfoRoutine, loginRoutine, signupRoutine } from '@routines/userRoutines';

const initialState = {
  id: undefined,
  email: undefined,
  firstName: undefined,
  lastName: undefined,
  isAuthorized: false,
  isLoading: false,
};

const userData = (state = initialState, action: Routine<any>) => {
  switch (action.type) {
    case loginRoutine.TRIGGER: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case signupRoutine.TRIGGER: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case fetchUserInfoRoutine.SUCCESS: {
      return {
        ...state,
        ...action.payload,
        isAuthorized: true,
        isLoading: false,
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
        isAuthorized: false,
        isLoading: false,
      };
    }
    case signupRoutine.FAILURE: {
      return {
        ...state,
        isAuthorized: false,
        isLoading: false,
      };
    }
    default:
      return state;
  }
};

export default userData;
