import { all } from 'redux-saga/effects';
import authSagas from '@containers/AuthForm/sagas';
import homeSagas from '@containers/HomePage/sagas';
import courseSagas from '@containers/CoursePage/sagas';
import userPageSagas from '@containers/UserPage/sagas';
import toDoSagas from '@containers/ToDo/sagas';
import createCourseSagas from '@containers/CreateCoursePage/sagas';

export default function* rootSaga() {
  yield all([
    authSagas(),
    homeSagas(),
    courseSagas(),
    userPageSagas(),
    toDoSagas(),
    createCourseSagas()
  ]);
}
