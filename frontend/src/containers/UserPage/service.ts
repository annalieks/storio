import { callApi } from '@root/helpers/api.helper';

export const fetchUserInfo = async (id: string): Promise<any> => {
  const result = await callApi({
    endpoint: `/user/info/${id}`,
    type: 'GET'
  });

  return result.json();
};
