import { callApi } from '@root/helpers/api.helper';

export const fetchCourseInfo = async (id: string): Promise<any> => {
  const result = await callApi({
    endpoint: `/course/info/${id}`,
    type: 'GET',
  });

  return result.json();
};
