import { all, call, put, takeEvery } from 'redux-saga/effects';
import { CoursePreview } from '@models/courseData';
import { fetchOtherUserInfoRoutine } from '@routines/userRoutines';
import { AnyAction } from 'redux';
import { toastr } from 'react-redux-toastr';
import * as service from './service';

function* fetchOtherUserInfo({ payload }: AnyAction) {
  try {
    const response: CoursePreview[] = yield call(() => service.fetchUserInfo(payload));
    yield put(fetchOtherUserInfoRoutine.success(response));
  } catch (error) {
    yield put(fetchOtherUserInfoRoutine.failure(error.message));
    toastr.error('Could not load user info', 'Such user does not exist');
  }
}

function* watchFetchUserInfo() {
  yield takeEvery(fetchOtherUserInfoRoutine.TRIGGER, fetchOtherUserInfo);
}

export default function* userPageSagas() {
  yield all([
    watchFetchUserInfo()
  ]);
}
