import { all, call, put, takeEvery } from 'redux-saga/effects';
import * as service from './service';
import { toastr } from 'react-redux-toastr';
import { fetchCourseInfoRoutine, fetchPostsRoutine, fetchStudentsRoutine } from '@routines/courseRoutines';
import { AnyAction } from 'redux';
import { createPostRoutine } from '@routines/postRoutines';
import { CourseInfo } from '@models/courseData';

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

export default function* authSagas() {
  yield all([
    watchFetchCourseInfo(),
    watchCreatePost(),
    watchFetchPosts(),
    watchFetchStudents()
  ]);
}
