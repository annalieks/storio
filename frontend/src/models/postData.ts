import { ShortUserInfo } from '@models/userData';

export interface PostPreview {
  id: string;
  text: string;
  author: ShortUserInfo;
}
