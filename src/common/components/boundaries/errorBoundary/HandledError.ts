export class HandledError extends Error {
  reset?: () => void;
  key: string;
  args?: Record<string, unknown>;
  constructor(key: string, args?: Record<string, number | string>) {
    super();
    this.name = "HandledError";
    this.key = key;
    this.args = args;
  }

  setReset(reset: () => void): void {
    this.reset = reset;
  }
}