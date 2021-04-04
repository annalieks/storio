import { all, call, put, takeEvery } from 'redux-saga/effects';
import * as service from './service';
import { createCourseRoutine } from '@routines/courseRoutines';
import { AnyAction } from 'redux';

function* addCourse({ payload }: AnyAction) {
  try {
    yield call(() => service.createCourse(payload));
    yield put(createCourseRoutine.success());
  } catch (error) {
    yield put(createCourseRoutine.failure(error.message));
  }
}

function* watchAddCourse() {
  yield takeEvery(createCourseRoutine.TRIGGER, addCourse);
}

export default function* createCourseSagas() {
  yield all([
    watchAddCourse()
  ]);
}
