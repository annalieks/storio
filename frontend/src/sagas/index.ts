import {all} from 'redux-saga/effects';
import authSagas from '@containers/AuthForm/sagas';
import homeSagas from '@containers/HomePage/sagas';

export default function* rootSaga() {
    yield all([
      authSagas(),
      homeSagas(),
    ]);
}
