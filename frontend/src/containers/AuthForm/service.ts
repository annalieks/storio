import { callApi } from '@root/helpers/api.helper';
import { RegisterData } from '@models/userData';

export const login = async (email: string, password: string): Promise<any> => {
  const result = await callApi({
    endpoint: '/auth/login',
    type: 'POST',
    requestData: {
      email,
      password
    }
  });

  return result.json();
};

export const signup = async (user: RegisterData): Promise<any> => {
  const result = await callApi({
    endpoint: '/auth/register',
    type: 'POST',
    requestData: {
      'email': user.email,
      'password': user.password,
      'firstName': user.firstName,
      'lastName': user.lastName
    }
  });

  return result.json();
};

export const fetchUserInfo = async (id: string): Promise<any> => {
  const result = await callApi({
    endpoint: `/user/info/${id}`,
    type: 'GET'
  });

  return result.json();
};

export const setToken = (token: string): void => {
  localStorage.setItem('accessToken', token);
};

export const clearToken = (): void => {
  localStorage.removeItem('accessToken');
};
