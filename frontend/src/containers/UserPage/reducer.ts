import { Routine } from 'redux-saga-routines';
import { fetchOtherUserInfoRoutine } from '@routines/userRoutines';

const initialState = {
  user: {}
};

const userData = (state = initialState, action: Routine<any>) => {
  switch (action.type) {
    case fetchOtherUserInfoRoutine.SUCCESS: {
      return {
        user: action.payload
      };
    }
    default:
      return state;
  }
};

export default userData;
