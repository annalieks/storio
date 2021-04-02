import { Routine } from 'redux-saga-routines';
import {
  fetchAssignmentsRoutine,
  fetchCourseInfoRoutine,
  fetchPostsRoutine,
  fetchSponsorsRoutine,
  fetchStudentsRoutine
} from '@routines/courseRoutines';

const initialState = {
  name: '',
  description: '',
  tags: [],
  sponsors: [],
};

const courseData = (state = initialState, action: Routine<any>) => {
  switch (action.type) {
    case fetchCourseInfoRoutine.SUCCESS: {
      return {
        ...state,
        ...action.payload
      };
    }
    default:
      return state;
  }
};

export default courseData;
