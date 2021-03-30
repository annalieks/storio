import { ShortUserInfo } from '@models/userData';

export interface AssignmentPreview {
  id: string;
  title: string;
  deadline: string;
  author: ShortUserInfo;
}

export interface AssignmentCreate {
  courseId: string,
  description: string;
  title: string;
  deadline: Date;
  maxGrade: number;
}
