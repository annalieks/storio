import { createRoutine } from 'redux-saga-routines';
import { AssignmentCreate } from '@models/assignmentData';

export const createAssignmentRoutine = createRoutine('ASSIGNMENT:CREATE',
  (data: AssignmentCreate) => data, (message: string) => message);
