import { executeRead, executeWrite } from '../db/driver.js';
import { HttpError } from '../utils/httpErrors.js';
import { recordToObject } from '../utils/neo4jValues.js';

// Services use this one boundary for reads. Driver errors become a stable 503
// response while query results become ordinary JavaScript objects.
export async function runReadQuery(query, parameters = {}) {
  try {
    const result = await executeRead(query, parameters);
    return result.records.map(recordToObject);
  } catch (error) {
    if (error instanceof HttpError) {
      throw error;
    }

    console.error('Database query failed:', error.message);
    throw new HttpError(503, 'The graph database is temporarily unavailable.');
  }
}

export async function runWriteQuery(query, parameters = {}) {
  try {
    const result = await executeWrite(query, parameters);
    return result.records.map(recordToObject);
  } catch (error) {
    console.error('Database write failed:', error.message);
    throw new HttpError(503, 'The graph database is temporarily unavailable.');
  }
}
