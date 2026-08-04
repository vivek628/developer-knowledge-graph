import { executeRead } from '../db/driver.js';

// Checking both the HTTP server and database gives hosting services a useful
// readiness signal. The harmless query neither reads nor changes user data.
export async function getHealth(_request, response) {
  try {
    await executeRead('RETURN 1 AS connectionCheck');

    response.status(200).json({
      status: 'ok',
      service: 'developer-knowledge-graph-api',
      database: 'connected',
      timestamp: new Date().toISOString(),
    });
  } catch (_error) {
    // Do not return raw driver errors because they may reveal infrastructure
    // details. The server stays alive so clients receive a meaningful response.
    response.status(503).json({
      status: 'degraded',
      service: 'developer-knowledge-graph-api',
      database: 'unavailable',
      timestamp: new Date().toISOString(),
    });
  }
}
