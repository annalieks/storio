import { callApi } from '@root/helpers/api.helper';
import { PostCreate } from '@models/postData';
import { AssignmentCreate } from '@models/assignmentData';

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

export const fetchPosts = async (id: string): Promise<any> => {
  const result = await callApi({
    endpoint: `/course/posts/${id}`,
    type: 'GET'
  });

  return result.json();
};

export const fetchAssignments = async (id: string): Promise<any> => {
  const result = await callApi({
    endpoint: `/course/assignments/${id}`,
    type: 'GET'
  });

  return result.json();
};

export const fetchStudents = async (id: string): Promise<any> => {
  const result = await callApi({
    endpoint: `/course/students/${id}`,
    type: 'GET'
  });

  return result.json();
};

export const fetchSponsors = async (id: string): Promise<any> => {
  const result = await callApi({
    endpoint: `/course/sponsors/${id}`,
    type: 'GET'
  });

  return result.json();
};

export const addStudent = async (courseId: string, email: string): Promise<any> => {
  await callApi({
    endpoint: '/course/student',
    type: 'POST',
    requestData: {
      courseId,
      email
    }
  });
};

export const addAssignment = async (data: AssignmentCreate): Promise<any> => {
  await callApi({
    endpoint: '/assignment/create',
    type: 'POST',
    requestData: data
  });
};
