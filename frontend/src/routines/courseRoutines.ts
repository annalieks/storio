import { createRoutine } from 'redux-saga-routines';
import { CourseInfo } from '@models/courseData';
import { PostPreview } from '@models/postData';

export const fetchStudentCoursesRoutine = createRoutine('COURSES:STUDENT:FETCH_PREVIEW');

export const fetchTeacherCoursesRoutine = createRoutine('COURSES:TEACHER:FETCH_PREVIEW');

export const fetchCourseInfoRoutine = createRoutine('COURSE:FETCH_INFO',
  (id: string) => id, (payload: CourseInfo) => ({ ...payload }));

export const fetchPostsRoutine = createRoutine('COURSE:FETCH_POSTS',
  (id: string) => id, (data: PostPreview[]) => data);
