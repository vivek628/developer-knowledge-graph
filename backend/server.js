import app from './app.js';
import { env } from './config/env.js';
import {
  closeDatabase,
  verifyDatabaseConnectivity,
} from './db/driver.js';

// Keep the network listener separate from app.js. This lets future tests import
// the Express application without opening a real port.
const server = app.listen(env.port, () => {
  console.log(`API is running at http://localhost:${env.port}`);
});

// A database outage should not crash the HTTP process. Keeping it alive means
// the health endpoint can explain that the service is temporarily degraded.
try {
  await verifyDatabaseConnectivity();
  console.log('CognoDB connection verified.');
} catch (_error) {
  console.error('CognoDB is unavailable. Check the database configuration and status.');
}

// Stop accepting new requests during local restarts or hosting shutdowns.
function shutDown(signal) {
  console.log(`${signal} received. Closing the HTTP server.`);
  server.close(async () => {
    try {
      await closeDatabase();
      process.exit(0);
    } catch (_error) {
      console.error('The database driver could not close cleanly.');
      process.exit(1);
    }
  });
}

process.on('SIGINT', () => shutDown('SIGINT'));
process.on('SIGTERM', () => shutDown('SIGTERM'));
