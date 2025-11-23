import { HttpClient } from "src/common/api/http/HttpClient";
import { getConfiguration } from "src/config/utils";

const firebaseClient = new HttpClient(getConfiguration().baseUrls.firebase);
export const apiClient = new HttpClient(getConfiguration().baseUrls.api);
export const publicClient = new HttpClient('');

export const getAssetUrl = (path: string): string => {
  return firebaseClient.createUrl(path);
}
