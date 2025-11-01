

export const isTypeOfElementArray = (data: Array<HTMLElement| null>): data is HTMLElement[] => {
  return data.every((element) => element && element instanceof HTMLElement);
};