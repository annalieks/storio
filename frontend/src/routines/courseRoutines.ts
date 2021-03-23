import { createRoutine } from 'redux-saga-routines';

export const fetchStudentCoursesRoutine = createRoutine('COURSES:STUDENT:FETCH_PREVIEW');

export const fetchTeacherCoursesRoutine = createRoutine('COURSES:TEACHER:FETCH_PREVIEW');
