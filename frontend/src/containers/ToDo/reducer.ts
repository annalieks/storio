import { Routine } from 'redux-saga-routines';
import { fetchUserToDosRoutine } from '@routines/userRoutines';

const initialState = {
  todos: []
};

const toDoData = (state = initialState, action: Routine<any>) => {
  switch (action.type) {
    case fetchUserToDosRoutine.SUCCESS: {
      return {
        ...state,
        todos: action.payload
      };
    }
    default:
      return state;
  }
};

export default toDoData;
