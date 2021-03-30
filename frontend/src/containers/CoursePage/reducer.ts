import { Routine } from 'redux-saga-routines';
import {
  fetchAssignmentsRoutine,
  fetchCourseInfoRoutine,
  fetchPostsRoutine,
  fetchSponsorsRoutine,
  fetchStudentsRoutine
} from '@routines/courseRoutines';

const initialState = {
  id: '',
  name: '',
  description: '',
  tags: [],
  posts: [],
  assignments: [],
  sponsors: [],
  students: [],
  teacher: {}
};

const courseData = (state = initialState, action: Routine<any>) => {
  switch (action.type) {
    case fetchCourseInfoRoutine.SUCCESS: {
      return {
        ...state,
        ...action.payload
      };
    }
    case fetchPostsRoutine.SUCCESS: {
      return {
        ...state,
        posts: action.payload
      };
    }
    case fetchStudentsRoutine.SUCCESS: {
      return {
        ...state,
        students: action.payload,
      };
    }
    case fetchSponsorsRoutine.SUCCESS: {
      return {
        ...state,
        sponsors: action.payload,
      }
    }
    case fetchAssignmentsRoutine.SUCCESS: {
      return {
        ...state,
        assignments: action.payload,
      }
    }
    default:
      return state;
  }
};

export default courseData;
