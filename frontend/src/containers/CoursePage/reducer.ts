import { Routine } from 'redux-saga-routines';
import { fetchCourseInfoRoutine } from '@routines/courseRoutines';

const initialState = {
  id: '',
  name: '',
  description: '',
  tags: [],
  posts: [],
  assignments: [],
  students: [],
  teacher: {},
};

const courseData = (state = initialState, action: Routine<any>) => {
  switch (action.type) {
    case fetchCourseInfoRoutine.SUCCESS: {
      return {
        ...state,
        ...action.payload,
      };
    }
    default:
      return state;
  }
};

export default courseData;
