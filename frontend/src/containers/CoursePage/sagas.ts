import { all, call, put, takeEvery } from 'redux-saga/effects';
import * as service from './service';
import { toastr } from 'react-redux-toastr';
import {
  addStudentRoutine,
  fetchAssignmentsRoutine,
  fetchCourseInfoRoutine,
  fetchPostsRoutine,
  fetchSponsorsRoutine,
  fetchStudentsRoutine
} from '@routines/courseRoutines';
import { AnyAction } from 'redux';
import { createPostRoutine } from '@routines/postRoutines';
import { CourseInfo } from '@models/courseData';
import { createAssignmentRoutine } from '@routines/assignmentRoutines';

function* fetchCourseInfo({ payload }: AnyAction) {
  try {
    const response: CourseInfo = yield call(() => service.fetchCourseInfo(payload));
    yield put(fetchCourseInfoRoutine.success(response));
  } catch (error) {
    yield put(fetchCourseInfoRoutine.failure(error.message));
  }
}

function* createPost({ payload }: AnyAction) {
  try {
    yield call(() => service.createPost(payload));
    yield put(fetchPostsRoutine.trigger(payload.courseId));
    yield put(createPostRoutine.success(payload.courseId));
  } catch (error) {
    yield put(createPostRoutine.failure(error.message));
    toastr.error('Could not create a post', 'The post was not saved');
  }
}

function* fetchPosts({ payload }: AnyAction) {
  try {
    const response: [] = yield call(() => service.fetchPosts(payload));
    yield put(fetchPostsRoutine.success(response));
  } catch (error) {
    yield put(fetchPostsRoutine.failure(error.message));
  }
}

function* fetchStudents({ payload }: AnyAction) {
  try {
    const response: [] = yield call(() => service.fetchStudents(payload));
    yield put(fetchStudentsRoutine.success(response));
  } catch (error) {
    yield put(fetchStudentsRoutine.failure(error.message));
  }
}

function* fetchSponsors({ payload }: AnyAction) {
  try {
    const response: [] = yield call(() => service.fetchSponsors(payload));
    yield put(fetchSponsorsRoutine.success(response));
  } catch (error) {
    yield put(fetchSponsorsRoutine.failure(error.message));
  }
}

function* fetchAssignments({ payload }: AnyAction) {
  try {
    const response: [] = yield call(() => service.fetchAssignments(payload));
    yield put(fetchAssignmentsRoutine.success(response));
  } catch (error) {
    yield put(fetchAssignmentsRoutine.failure(error.message));
  }
}

function* addStudent({ payload }: AnyAction) {
  try {
    yield call(() => service.addStudent(payload.courseId, payload.email));
    yield put(fetchStudentsRoutine.trigger(payload.courseId));
  } catch (error) {
    yield put(addStudentRoutine.failure('Could not add student', error.message));
    toastr.error('Could not add student', 'The user is already added or does not exist');
  }
}

function* createAssignment({ payload }: AnyAction) {
  try {
    yield call(() => service.addAssignment(payload));
    yield put(fetchAssignmentsRoutine.trigger(payload.courseId));
  } catch (error) {
    yield put(createAssignmentRoutine.failure('Could not create assignment'));
    toastr.error('Could not create assignment', error.message);
  }
}

function* watchFetchCourseInfo() {
  yield takeEvery(fetchCourseInfoRoutine.TRIGGER, fetchCourseInfo);
}

function* watchCreatePost() {
  yield takeEvery(createPostRoutine.TRIGGER, createPost);
}

function* watchFetchPosts() {
  yield takeEvery(fetchPostsRoutine.TRIGGER, fetchPosts);
}

function* watchFetchStudents() {
  yield takeEvery(fetchStudentsRoutine.TRIGGER, fetchStudents);
}

function* watchAddStudent() {
  yield takeEvery(addStudentRoutine.TRIGGER, addStudent);
}

function* watchFetchSponsors() {
  yield takeEvery(fetchSponsorsRoutine.TRIGGER, fetchSponsors);
}

function* watchFetchAssignments() {
  yield takeEvery(fetchAssignmentsRoutine.TRIGGER, fetchAssignments);
}

function* watchCreateAssignment() {
  yield takeEvery(createAssignmentRoutine.TRIGGER, createAssignment);
}

export default function* authSagas() {
  yield all([
    watchFetchCourseInfo(),
    watchCreatePost(),
    watchFetchPosts(),
    watchFetchStudents(),
    watchAddStudent(),
    watchFetchSponsors(),
    watchFetchAssignments(),
    watchCreateAssignment()
  ]);
}
