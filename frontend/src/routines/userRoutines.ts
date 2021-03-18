import { createRoutine } from 'redux-saga-routines';
import { LoginData, RegisterData, UserData } from '@models/userData';

export const fetchUserInfoRoutine = createRoutine('USER:FETCH_INFO',
  (id: string) => id, (data: UserData) => data);

export const loginRoutine = createRoutine('USER:LOGIN',
  (data: LoginData) => data);

export const signupRoutine = createRoutine('USER:SIGNUP',
  (data: RegisterData) => data);
