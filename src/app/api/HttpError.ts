export class HttpError extends Error {
  constructor(
    public readonly status: number = 500,
    public readonly response = {},
    public readonly message: string = "HTTP Error"
  ) {
    super(message);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
