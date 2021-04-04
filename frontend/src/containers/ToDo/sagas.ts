import { all, call, put, takeEvery } from 'redux-saga/effects';
import * as service from './service';
import { toastr } from 'react-redux-toastr';
import { fetchUserToDosRoutine } from '@routines/userRoutines';
import { ToDoPreview } from '@models/toDoData';
import { AnyAction } from 'redux';
import { addToDoRoutine, changeToDoRoutine, deleteToDoRoutine } from '@routines/toDoRoutines';

function* fetchToDos() {
  try {
    const response: ToDoPreview[] = yield call(service.fetchToDos);
    yield put(fetchUserToDosRoutine.success(response));
  } catch (error) {
    toastr.error('Error appeared', 'Could not load todos');
    yield put(fetchUserToDosRoutine.failure(error.message));
  }
}

function* addToDo({ payload }: AnyAction) {
  try {
    yield call(() => service.addToDo(payload));
    yield put(fetchUserToDosRoutine.trigger());
  } catch (error) {
    toastr.error('Error appeared', 'Could not add todo');
    yield put(addToDoRoutine.failure(error.message));
  }
}

function* deleteToDo({ payload }: AnyAction) {
  try {
    yield call(() => service.deleteToDo(payload));
    yield put(fetchUserToDosRoutine.trigger());
  } catch (error) {
    toastr.error('Error appeared', 'Could not delete todo');
    yield put(deleteToDoRoutine.failure(error.message));
  }
}

function* changeToDo({ payload }: AnyAction) {
  try {
    yield call(() => service.changeToDo(payload.id, payload.text, payload.done));
    yield put(fetchUserToDosRoutine.trigger());
  } catch (error) {
    toastr.error('Error appeared', 'Could not change todo');
    yield put(changeToDoRoutine.failure(error.message));
  }
}

function* watchFetchToDos() {
  yield takeEvery(fetchUserToDosRoutine.TRIGGER, fetchToDos);
}

function* watchAddToDo() {
  yield takeEvery(addToDoRoutine.TRIGGER, addToDo);
}

function* watchDeleteToDo() {
  yield takeEvery(deleteToDoRoutine.TRIGGER, deleteToDo);
}

function* watchChangeToDo() {
  yield takeEvery(changeToDoRoutine.TRIGGER, changeToDo);
}

export default function* authSagas() {
  yield all([
    watchFetchToDos(),
    watchAddToDo(),
    watchDeleteToDo(),
    watchChangeToDo()
  ]);
}
