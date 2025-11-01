
const root = document.documentElement;

export const getStyle = (variable: string): string =>
  getComputedStyle(root).getPropertyValue(variable);

export const assert = (condition: boolean, message: string): void => {
  if (!condition) {
    throw new Error(message);
  }
};

// TODO: add query params if needed
export const createUrl = (path: string, baseUrl?: string): string => {
  return baseUrl ? new URL(path, baseUrl).toString() : path;
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