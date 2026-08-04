import { env } from './env.js';

// Browsers send an Origin header for cross-origin requests. Tools such as curl
// usually do not, so requests without an origin are safe to allow here.
export const corsOptions = {
  origin(origin, callback) {
    if (!origin || env.clientOrigins.includes(origin)) {
      callback(null, true);
      return;
    }

    const error = new Error('This origin is not allowed to access the API.');
    error.statusCode = 403;
    callback(error);
  },
};
