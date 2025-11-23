import { HandledError } from "src/common/components/boundaries/errorBoundary/HandledError";
import { createUrl, handleNetworkError } from "src/common/utils/utils";
import configuration from "src/config/configuration.json";


class HttpClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(path: string, options: RequestInit): Promise<T> {
    const url = createUrl(path, this.baseUrl);
    const response = await fetch(url, options);
    if (response.ok) {
      return await response.json();
    }
    throw this.handleNetworkError(response.status);
  }

  private handleNetworkError(status: number): never {
    const errorArgs = handleNetworkError(status);
    throw new HandledError(errorArgs.key, errorArgs.args);
  }

  async get<T>(path: string, headers?: Record<string, string>): Promise<T> {
    const options: RequestInit = {
      method: 'GET',
      ...(headers && { headers }),
    };
    return this.request<T>(path, options);
  }

  async post<T>(path: string, body?: Record<string, unknown>, headers?: Record<string, string>): Promise<T> {
    const options: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      body: body ? JSON.stringify(body) : undefined,
    };
    return this.request<T>(path, options);
  }

  private createUrl(path: string): string {
    return this.baseUrl ? new URL(path, this.baseUrl).toString() : path;
  }

}

const env = process.env.NODE_ENV === 'production' ? 'prod' : 'dev';
const baseUrl = configuration.baseUrls[env];

const apiClient = new HttpClient(baseUrl);
const firebaseClient = new HttpClient(configuration.baseUrls.firebase);
const publicClient = new HttpClient('');

export const httpClients = {
  apiClient,
  firebaseClient,
  publicClient,
}