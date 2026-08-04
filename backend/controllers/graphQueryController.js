import {
  getSafeQueryNames,
  runSafeGraphQuery,
} from '../services/safeGraphQueryService.js';
import { requireNonEmptyString } from '../utils/validation.js';

export function listSafeGraphQueries(_request, response) {
  response.json({ data: getSafeQueryNames() });
}

export async function executeSafeGraphQuery(request, response) {
  const queryName = requireNonEmptyString(request.body?.queryName, 'queryName');
  const data = await runSafeGraphQuery(queryName, request.body?.parameters);
  response.json({ data });
}
