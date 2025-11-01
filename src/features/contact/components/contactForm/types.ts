


type ContactFormElements = HTMLFormControlsCollection & {
  name: HTMLInputElement;
  email: HTMLInputElement;
  message: HTMLTextAreaElement;
};

export type ContactFormType = HTMLFormElement & {
  readonly elements: ContactFormElements;
};


export type FormData = {
  name: string;
  email: string;
  message: string;
};
