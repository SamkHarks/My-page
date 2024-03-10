const root = document.documentElement;

export const getStyle = (variable: string) =>
  getComputedStyle(root).getPropertyValue(variable);
