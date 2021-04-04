import { callApi } from '@root/helpers/api.helper';
import { CourseCreateData } from '@models/courseData';

export const createCourse = async (data: CourseCreateData): Promise<any> => {
  const result = await callApi({
    endpoint: '/course/create',
    type: 'POST',
    requestData: {
      ...data
    }
  });

  return result.json();
};
