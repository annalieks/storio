import { ShortUserInfo } from '@models/userData';

export interface AssignmentPreview {
  id: string;
  text: string;
  dueDate: string;
  author: ShortUserInfo;
}
