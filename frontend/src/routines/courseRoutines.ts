import { createRoutine } from 'redux-saga-routines';
import { CourseInfo } from '@models/courseData';

export const fetchStudentCoursesRoutine = createRoutine('COURSES:STUDENT:FETCH_PREVIEW');

export const fetchTeacherCoursesRoutine = createRoutine('COURSES:TEACHER:FETCH_PREVIEW');

export const fetchCourseInfoRoutine = createRoutine('COURSE:FETCH_INFO',
  (id: string) => id, (payload: CourseInfo) => ({...payload}));
