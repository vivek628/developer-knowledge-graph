import dotenv from 'dotenv';

// Load local environment variables before the rest of the application starts.
// Keeping this in one file gives every module the same validated configuration.
dotenv.config();

const parsedPort = Number.parseInt(process.env.PORT || '5000', 10);

if (!Number.isInteger(parsedPort) || parsedPort < 1 || parsedPort > 65535) {
  throw new Error('PORT must be a number between 1 and 65535.');
}

const clientOrigins = (process.env.CLIENT_ORIGINS || 'http://localhost:5173')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

// Fail at startup when a required setting is absent. A clear configuration
// error is much easier to fix than a vague database connection failure later.
function requireEnvironmentVariable(name) {
  const value = process.env[name]?.trim();

  if (!value) {
    throw new Error(`${name} is required. Add it to backend/.env.`);
  }

  return value;
}

export const env = Object.freeze({
  nodeEnv: process.env.NODE_ENV || 'development',
  port: parsedPort,
  clientOrigins,
  databaseUri: requireEnvironmentVariable('DATABASE_URI'),
  databaseUsername: requireEnvironmentVariable('DATABASE_USERNAME'),
  databasePassword: requireEnvironmentVariable('DATABASE_PASSWORD'),
});
