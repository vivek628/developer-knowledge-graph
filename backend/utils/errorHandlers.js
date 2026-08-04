import { env } from '../config/env.js';

// No route matched the request, so pass a normal 404 error to the shared error
// handler. This keeps every error response in the same JSON shape.
export function notFoundHandler(request, _response, next) {
  const error = new Error(`Route ${request.method} ${request.originalUrl} was not found.`);
  error.statusCode = 404;
  next(error);
}

// Express recognizes an error handler by its four parameters. Expected errors
// keep their status code; unexpected errors become a safe 500 response.
export function errorHandler(error, _request, response, _next) {
  const statusCode = error.statusCode || error.status || 500;
  const isServerError = statusCode >= 500;

  if (isServerError) {
    console.error(error);
  }

  const payload = {
    error: {
      message: isServerError ? 'An unexpected server error occurred.' : error.message,
    },
  };

  if (error.details) {
    payload.error.details = error.details;
  }

  if (env.nodeEnv === 'development' && isServerError) {
    payload.error.debugMessage = error.message;
  }

  response.status(statusCode).json(payload);
}
