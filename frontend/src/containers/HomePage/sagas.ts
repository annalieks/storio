import { all, call, put, takeEvery } from 'redux-saga/effects';
import { AnyAction } from 'redux';
import * as service from './service';
import { CoursePreview } from '@models/courseData';
import { fetchStudentCoursesRoutine, fetchTeacherCoursesRoutine } from '@routines/courseRoutines';

function* fetchStudentCourses() {
  try {
    const response: CoursePreview[] = yield call(() => service.fetchCourses(true));
    yield put(fetchStudentCoursesRoutine.success(response));
  } catch (error) {
    yield put(fetchStudentCoursesRoutine.failure(error.message));
  }
}

function* fetchTeacherCourses() {
  try {
    const response: CoursePreview[] = yield call(() => service.fetchCourses(false));
    yield put(fetchTeacherCoursesRoutine.success(response));
  } catch (error) {
    yield put(fetchTeacherCoursesRoutine.failure(error.message));
  }
}

function* watchFetchStudentCourses() {
  yield takeEvery(fetchStudentCoursesRoutine.TRIGGER, fetchStudentCourses);
}

function* watchFetchTeacherCourses() {
  yield takeEvery(fetchTeacherCoursesRoutine.TRIGGER, fetchTeacherCourses);
}

export default function* authSagas() {
  yield all([
    watchFetchStudentCourses(),
    watchFetchTeacherCourses()
  ]);
}
