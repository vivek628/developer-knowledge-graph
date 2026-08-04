import { safeQueryCatalog } from '../queries/safeQueryCatalog.js';
import { HttpError } from '../utils/httpErrors.js';
import { requireNonEmptyString } from '../utils/validation.js';
import { runReadQuery } from './queryService.js';

export function getSafeQueryNames() {
  return Object.keys(safeQueryCatalog);
}

export async function runSafeGraphQuery(queryName, suppliedParameters) {
  const definition = safeQueryCatalog[queryName];

  if (!definition) {
    throw new HttpError(400, `Unknown queryName. Allowed values: ${getSafeQueryNames().join(', ')}.`);
  }

  if (!suppliedParameters || typeof suppliedParameters !== 'object' || Array.isArray(suppliedParameters)) {
    throw new HttpError(400, 'parameters must be a JSON object.');
  }

  // Copy only allowlisted fields. Even if a caller sends extra data, it can
  // never become query text or an unexpected database parameter.
  const parameters = Object.fromEntries(
    definition.requiredParameters.map((name) => [
      name,
      requireNonEmptyString(suppliedParameters[name], `parameters.${name}`),
    ]),
  );

  return runReadQuery(definition.query, parameters);
}
