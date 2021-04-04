import { createRoutine } from 'redux-saga-routines';
import { LoginData, RegisterData, ShortUserInfo } from '@models/userData';

export const fetchUserInfoRoutine = createRoutine('USER:FETCH_INFO');

export const fetchOtherUserInfoRoutine = createRoutine('USER:OTHER:FETCH_INFO',
  (id: string) => id, (data: ShortUserInfo) => data);

export const loginRoutine = createRoutine('USER:LOGIN',
  (data: LoginData) => data);

export const signupRoutine = createRoutine('USER:SIGNUP',
  (data: RegisterData) => data);

export const fetchUserToDosRoutine = createRoutine('USER:TODOS');
