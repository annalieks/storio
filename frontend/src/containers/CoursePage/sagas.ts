import { all, call, put, takeEvery } from 'redux-saga/effects';
import * as service from './service';
import { fetchCourseInfoRoutine } from '@routines/courseRoutines';
import { AnyAction } from 'redux';

function* fetchCourseInfo({ payload }: AnyAction) {
  try {
    const response: [] = yield call(() => service.fetchCourseInfo(payload));
    yield put(fetchCourseInfoRoutine.success(response));
  } catch (error) {
    yield put(fetchCourseInfoRoutine.failure(error.message));
  }
}

function* watchFetchCourseInfo() {
  yield takeEvery(fetchCourseInfoRoutine.TRIGGER, fetchCourseInfo);
}

export default function* authSagas() {
  yield all([
    watchFetchCourseInfo()
  ]);
}
