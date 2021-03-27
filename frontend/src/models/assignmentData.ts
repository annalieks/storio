import { ShortUserInfo } from '@models/userData';

export interface AssignmentPreview {
  id: string;
  text: string;
  dueDate: string;
  author: ShortUserInfo;
}

export interface AssignmentCreate {
  courseId: string,
  text: string;
  dueDate: Date;
}
