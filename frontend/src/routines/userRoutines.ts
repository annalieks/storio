import { createRoutine } from 'redux-saga-routines';
import { LoginData, RegisterData } from '@models/userData';

export const fetchUserInfoRoutine = createRoutine('USER:FETCH_INFO');

export const loginRoutine = createRoutine('USER:LOGIN',
  (data: LoginData) => data);

export const signupRoutine = createRoutine('USER:SIGNUP',
  (data: RegisterData) => data);
