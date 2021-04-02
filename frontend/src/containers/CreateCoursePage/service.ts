import { callApi } from '@root/helpers/api.helper';
import { PostCreate } from '@models/postData';

export const fetchCourseInfo = async (id: string): Promise<any> => {
  const result = await callApi({
    endpoint: `/course/info/${id}`,
    type: 'GET'
  });

  return result.json();
};

export const createPost = async (data: PostCreate): Promise<any> => {
  await callApi({
    endpoint: '/post/create',
    type: 'POST',
    requestData: data
  });
};
