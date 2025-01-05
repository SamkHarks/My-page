const root = document.documentElement;

export const getStyle = (variable: string) =>
  getComputedStyle(root).getPropertyValue(variable);

export const assert = (condition: boolean, message: string) => {
  if (!condition) {
    console.error(message);
  }
};
