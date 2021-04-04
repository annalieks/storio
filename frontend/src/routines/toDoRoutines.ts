import { createRoutine } from 'redux-saga-routines';
import { ToDoPreview } from '@models/toDoData';

export const addToDoRoutine = createRoutine('TODO:ADD',
  (text: string) => text);

export const deleteToDoRoutine = createRoutine('TODO:DELETE',
  (id: string) => id);

export const changeToDoRoutine = createRoutine('TODO:CHANGE');
