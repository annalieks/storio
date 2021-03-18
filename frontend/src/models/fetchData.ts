export interface IFetchArgs {
  method: string;
  headers: HeadersInit;
  body?: string;
}

export interface IFetchArgsData {
  type: string;
  endpoint: string;
  requestData?: any | string;
  queryParams?: any;
  attachment?: File;
}
