import { ShortUserInfo } from '@models/userData';
import { PostPreview } from '@models/postData';
import { AssignmentPreview } from '@models/assignmentData';
import { SponsorShortInfo } from '@models/sponsorData';

export interface CourseData {
  name: string;
  description: string;
}

export interface CoursePreview {
  id: string;
  name: string;
  studentsNum: number;
}

export interface CourseInfo {
  id: string;
  name: string;
  description: string;
  tags: string[];
  posts: PostPreview[];
  assignments: AssignmentPreview[];
  students: ShortUserInfo[];
}

export interface CourseCreateData {
  name: string;
  description: string;
  tags: string[],
  sponsors: SponsorShortInfo[],
}
