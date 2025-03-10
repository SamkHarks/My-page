const root = document.documentElement;

export const getStyle = (variable: string): string =>
  getComputedStyle(root).getPropertyValue(variable);

export const assert = (condition: boolean, message: string): void => {
  if (!condition) {
    throw new Error(message);
  }
};
