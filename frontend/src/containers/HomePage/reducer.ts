import { Routine } from 'redux-saga-routines';
import { fetchStudentCoursesRoutine, fetchTeacherCoursesRoutine } from '@routines/courseRoutines';

const initialState = {
  studentCourses: [],
  teacherCourses: [],
};

const homeData = (state = initialState, action: Routine<any>) => {
  switch (action.type) {
    case fetchStudentCoursesRoutine.SUCCESS: {
      return {
        ...state,
        studentCourses: action.payload
      };
    }
    case fetchTeacherCoursesRoutine.SUCCESS: {
      return {
        ...state,
        teacherCourses: action.payload
      };
    }
    default:
      return state;
  }
};

export default homeData;
