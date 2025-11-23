
export type RequestHeaders = Record<string, string>;

export const METHODS = {
  GET: 'GET',
  POST: 'POST',
  HEAD: 'HEAD',
} as const;

type HttpMethod = typeof METHODS[keyof typeof METHODS];

export type RequestOptions = {
  headers?: RequestHeaders;
}

export type Request<T = unknown> = {
  path: string;
  headers?: RequestHeaders;
  method: HttpMethod;
  body?: T;
}

export type Response<T = unknown> = {
  body: T;
  status: number;
  headers: Headers | null;
}