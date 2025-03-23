import configuration from "src/config/configuration.json";

const root = document.documentElement;

export const getStyle = (variable: string): string =>
  getComputedStyle(root).getPropertyValue(variable);

export const assert = (condition: boolean, message: string): void => {
  if (!condition) {
    throw new Error(message);
  }
};

export const getBaseUrl = (url: keyof typeof configuration["baseUrls"]): string =>
  configuration.baseUrls[url];

export const getPath = (path: keyof typeof configuration["paths"], fileName: string): string => {
  const pathTemplate = configuration.paths[path];
  return pathTemplate.replace("{{fileName}}", fileName);
};

export const createUrl = (baseUrl: string, path: string): string => {
  return baseUrl + path;
};

const getFirebaseUrl = (pathKey: keyof typeof configuration["paths"], fileName: string): string => {
  const baseUrl = getBaseUrl("firebase");
  const path = getPath(pathKey, fileName); 
  return createUrl(baseUrl, path);
};

export const getImageUrl = (fileName: string): string => {
  return getFirebaseUrl("images", fileName);
};

export const getCVUrl = (fileName: string): string => {
  return getFirebaseUrl("cv", fileName);
};

/*
* Common function for handling network errors.
* Returns an object with a key and optional arguments for translation
*/
export const handleNetworkError = (status: number): {
  key: string;
  args?: Record<string, number | string>;
} => {
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