import { all, call, put, takeEvery } from 'redux-saga/effects';
import { AnyAction } from 'redux';
import { fetchUserInfoRoutine, loginRoutine, signupRoutine } from '@root/routines/userRoutines';
import { toastr } from 'react-redux-toastr';
import * as service from './service';
import { LoginResponse, UserData } from '@models/userData';

function* login({ payload }: AnyAction) {
  try {
    const response: LoginResponse = yield call(() => service.login(payload.email, payload.password));
    service.setToken(response.token);
    yield put(fetchUserInfoRoutine.trigger(response.user.id));
  } catch (error) {
    service.clearToken();
    yield put(loginRoutine.failure(error.message));
    toastr.error('Login error', 'Please, check your credentials');
  }
}

function* signup({ payload }: AnyAction) {
  try {
    const response: LoginResponse = yield call(() => service.signup(payload));
    service.setToken(response.token);
    yield put(fetchUserInfoRoutine.trigger(response.user.id));
  } catch (error) {
    service.clearToken();
    yield put(signupRoutine.failure(error.message));
    toastr.error('Register error', 'Could not register new user');
  }
}

function* fetchUserInfo({ payload }: AnyAction) {
  try {
    const response: UserData = yield call(() => service.fetchUserInfo(payload));
    yield put(fetchUserInfoRoutine.success(response));
  } catch (error) {
    yield put(fetchUserInfoRoutine.failure(error.message));
  }
}

function* watchLogin() {
  yield takeEvery(loginRoutine.TRIGGER, login);
}

function* watchFetchUserInfo() {
  yield takeEvery(fetchUserInfoRoutine.TRIGGER, fetchUserInfo);
}

function* watchSignup() {
  yield takeEvery(signupRoutine.TRIGGER, signup);
}

export default function* authSagas() {
  yield all([
    watchLogin(),
    watchFetchUserInfo(),
    watchSignup()
  ]);
}
