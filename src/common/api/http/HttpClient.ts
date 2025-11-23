import {
  METHODS,
  type Request,
  type RequestOptions,
  type Response,
  type RequestHeaders
} from 'src/common/api/http/types';
import { HandledError } from 'src/common/components/boundaries/errorBoundary/HandledError';

export class HttpClient {
  private readonly baseUrl: string;
  private readonly defaultHeaders: RequestHeaders = {
    'Content-Type': 'application/json',
  }
  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(request: Request): Promise<Response<T>> {
    try {
      const response = await fetch(this.createUrl(request.path), {
        method: request.method,
        headers: {
          ...this.defaultHeaders,
          ...(request.headers && { ...request.headers }),
        },
        body: request.body ? JSON.stringify(request.body) : undefined,
      });
      if (response.ok) {
        const body = await response.text();
        return {
          body: body ? JSON.parse(body) as T : null as T,
          status: response.status,
          headers: response.headers,
        }
      }
      throw this.handleNetworkError(response.status);
    } catch (error) {
      if (error instanceof HandledError) {
        throw error;
      }
      if (error instanceof Error) {
        throw new HandledError(error.message || 'unexpected network error, instance of Error');
      }

      throw new HandledError('unexpected network error');
    }

  }

  get<T>(path: string, options?: RequestOptions): Promise<Response<T>> {
    return this.request<T>({
      method: METHODS.GET,
      path,
      ...options,
    })
  }

  post<T>(path: string, body?: T, options?: RequestOptions): Promise<Response<T>> {
    return this.request<T>({
      method: METHODS.POST,
      path,
      body,
      ...options,
    })
  }

  createUrl(path: string): string {
    return this.baseUrl ? new URL(path, this.baseUrl).toString() : path;
  }

  private handleNetworkError(status: number): never {
    const errorArgs = this.getHandledNetworkError(status);
    throw new HandledError(errorArgs.key, errorArgs.args);
  }

  private getHandledNetworkError(status: number): {
    key: string;
    args?: Record<string, number | string>;
  } {
    switch (status) {
      case 400:
      case 404:
      case 500:
      case 502:
      case 503:
      case 504:
      case 505:
        return { key: `${status}` };
      default:
        return { key: 'otherStatus', args: { status } };
    }
  }

}