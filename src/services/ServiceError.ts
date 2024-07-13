export class ServiceError extends Error {
  constructor(
    message: string,
    public readonly name: string = "Service Error",
    public readonly statusCode: number = 500,
    public readonly info = {}
  ) {
    super(message);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
