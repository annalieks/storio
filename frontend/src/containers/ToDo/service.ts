import { callApi } from '@root/helpers/api.helper';

export const fetchToDos = async (): Promise<any> => {
  const result = await callApi({
    endpoint: `/user/todos`,
    type: 'GET'
  });

  return result.json();
};

export const addToDo = async (text: string): Promise<any> => {
  await callApi({
    endpoint: '/todo/create',
    type: 'POST',
    requestData: {
      text
    }
  });
};

export const deleteToDo = async (id: string): Promise<any> => {
  await callApi({
    endpoint: `/todo/delete/${id}`,
    type: 'DELETE'
  });
};

export const changeToDo = async (id: string, text: string, done: boolean): Promise<any> => {
  await callApi({
    endpoint: `/todo/change/${id}`,
    type: 'PUT',
    requestData: {
      text,
      done
    }
  });
};
