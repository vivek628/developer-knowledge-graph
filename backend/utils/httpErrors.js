// A small custom error lets services report expected HTTP failures without
// knowing anything about Express response objects.
export class HttpError extends Error {
  constructor(statusCode, message, details) {
    super(message);
    this.name = 'HttpError';
    this.statusCode = statusCode;
    this.details = details;
  }
}
