import { createRoutine } from 'redux-saga-routines';
import { PostCreate } from '@models/postData';

export const createPostRoutine = createRoutine('POST:CREATE',
  (data: PostCreate) => data);
