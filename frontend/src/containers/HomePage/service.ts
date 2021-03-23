import { callApi } from '@root/helpers/api.helper';

export const fetchCourses = async (studentRequest: boolean): Promise<any> => {
  const endpoint = studentRequest ? 'student' : 'teacher';
  const result = await callApi({
    endpoint: `/user/courses/${endpoint}/preview`,
    type: 'GET',
  });

  return result.json();
};
