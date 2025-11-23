import configuration from "src/config/configuration.json";
import { HttpClient } from "src/common/api/http/HttpClient";

const getBaseUrl = (): string => {
  const env = process.env.NODE_ENV === 'production' ? 'prod' : 'dev';
  const baseUrl = configuration.baseUrls[env];
  if (!baseUrl) throw new Error(`Base URL for environment '${env}' is not defined`);
  return baseUrl;
}

const firebaseClient = new HttpClient(configuration.baseUrls.firebase);
export const apiClient = new HttpClient(getBaseUrl());
export const publicClient = new HttpClient('');

export const getAssetUrl = (path: string): string => {
  return firebaseClient.createUrl(path);
}
