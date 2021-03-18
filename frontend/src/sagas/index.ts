import {all} from 'redux-saga/effects';
import authSagas from '@containers/AuthForm/sagas';

export default function* rootSaga() {
    yield all([
      authSagas(),
    ]);
}
