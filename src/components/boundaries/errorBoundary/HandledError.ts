export class HandledError extends Error {
  reset?: () => void;
  constructor(message: string) {
    super(message);
    this.name = "HandledError";
  }

  setReset(reset: () => void): void {
    this.reset = reset;
  }
}