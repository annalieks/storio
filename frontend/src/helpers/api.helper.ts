import * as queryString from 'query-string';
import { IFetchArgsData, IFetchArgs } from '@models/fetchData';

const getFetchUrl = ({
  endpoint,
  queryParams
}: IFetchArgsData) => `${endpoint}${
  queryParams ? `?${queryString.stringify(queryParams)}` : ''
}`;

const getInitHeaders = (contentType = 'application/json', hasContent = true) => {
  const headers: HeadersInit = new Headers();
  if (hasContent) {
    headers.set('Content-Type', contentType);
  }
  const token = localStorage.getItem('accessToken');
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }
  return headers;
};

const getFetchArgs = (args: IFetchArgsData): IFetchArgs => {
  const headers = getInitHeaders();
  let body;
  if (args.requestData) {
    if (args.type === 'GET') {
      throw new Error('GET request does not support request body.');
    }
    body = JSON.stringify(args.requestData);
  }

  const token = localStorage.getItem('accessToken');
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  return {
    method: args.type,
    headers,
    ...(args.requestData === 'GET' ? {} : { body })
  };
};

const throwIfResponseFailed = async (res: Response) => {
  if (!res.ok) {
    if (res.status === 401) {
      // todo: logout
    }
    let parsedException = 'Something went wrong with request!';
    try {
      parsedException = await res.json();
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(`An error occurred: ${err}`);
    }
    throw parsedException;
  }
};

export const callApi = async (args: IFetchArgsData): Promise<Response> => {
  const res = await fetch(`http://localhost:9999${getFetchUrl(args)}`, getFetchArgs(args));
  await throwIfResponseFailed(res);
  return res;
};
