import { createRoutine } from 'redux-saga-routines';
import { CourseInfo } from '@models/courseData';
import { PostPreview } from '@models/postData';
import { ShortUserInfo } from '@models/userData';
import { SponsorPreview } from '@models/sponsorData';
import { AssignmentPreview } from '@models/assignmentData';

export const fetchStudentCoursesRoutine = createRoutine('COURSES:STUDENT:FETCH_PREVIEW');

export const fetchTeacherCoursesRoutine = createRoutine('COURSES:TEACHER:FETCH_PREVIEW');

export const fetchCourseInfoRoutine = createRoutine('COURSE:FETCH_INFO',
  (id: string) => id, (payload: CourseInfo) => ({ ...payload }));

export const fetchPostsRoutine = createRoutine('COURSE:FETCH_POSTS',
  (id: string) => id, (data: PostPreview[]) => data);

export const fetchStudentsRoutine = createRoutine('COURSE:FETCH_STUDENTS',
  (id: string) => id, (data: ShortUserInfo[]) => data);

export const fetchSponsorsRoutine = createRoutine('COURSE:FETCH_SPONSORS',
  (id: string) => id, (data: SponsorPreview[]) => data);

export const fetchAssignmentsRoutine = createRoutine('COURSE:FETCH_ASSIGNMENTS',
  (id: string) => id, (data: AssignmentPreview[]) => data);

export const addStudentRoutine = createRoutine('COURSE:ADD_STUDENT',
  (courseId: string, email: string) => ({
    courseId,
    email
  }));
