import { useCallback, useEffect, useMemo } from "react";
import { HandledError } from "src/common/components/boundaries/errorBoundary/HandledError";
import { Service } from "src/common/components/serviceData/types";
import { useAsyncFunction } from "src/common/hooks/hooks";
import { createUrl, handleNetworkError } from "src/common/utils/utils";

type RequestOptions = {
  method: 'GET' | 'POST' | 'HEAD';
  headers?: Record<string, string>;
  body?: Record<string, unknown>;
};

type ServiceOptions<T> = {
  immediate?: boolean; // Whether to call the service immediately
  transformResponse?: (response: Response) => Promise<T>; // Transform the response
};

type UrlOptions = {
  baseUrl?: string
  path: string;
}

type ServiceParams<T> = {
  urlOptions: UrlOptions;
  requestOptions?: RequestOptions;
  serviceOptions?: ServiceOptions<T>;
}

export const useService = <T>({
  urlOptions,
  requestOptions,
  serviceOptions
}: ServiceParams<T>): {
  service: Service<T>;
  callService: () => Promise<void>;
  clearService: () => void;
} => {
  const { baseUrl, path } = urlOptions;
  const { transformResponse, immediate = true } = serviceOptions ?? {};

  const asyncFunction = useCallback(async () => {
    const url = createUrl(path, baseUrl);
    const options: RequestInit = getRequestOptions(requestOptions);
    const response = await fetch(url, options);
    if (response.ok) {
      return transformResponse
        ? transformResponse(response)
        : response.json();
    }
    const errorArgs = handleNetworkError(response.status);
    throw new HandledError(errorArgs.key, errorArgs.args);
  }, [baseUrl, path, requestOptions, transformResponse]);

  const [service, callService, clearService] = useAsyncFunction<T>(asyncFunction);

  useEffect(() => {
    if (immediate) {
      callService();
    }
  }, [callService, immediate]);

  return useMemo(() => ({ service, callService, clearService }), [service, callService, clearService]);
}


const getRequestOptions = (requestOptions: RequestOptions = { method: 'GET' }): RequestInit => {
  const { body, method, ...rest } = requestOptions;
  const defaultHeaders =  method !== 'HEAD' ? { 'Content-Type': 'application/json' } : undefined;
  const headers = {
    ...defaultHeaders,
    ...rest.headers,
  };

  return {
    method,
    headers,
    ...(body && method === 'POST' && { body: JSON.stringify(body) }),
  };
};