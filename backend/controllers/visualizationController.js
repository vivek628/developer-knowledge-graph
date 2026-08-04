import { getCompleteGraph, getFocusedDeveloperGraph } from '../services/visualizationService.js';
import { requireNonEmptyString } from '../utils/validation.js';

export async function showCompleteGraph(_request, response) {
  response.json({ data: await getCompleteGraph() });
}

export async function showDeveloperGraph(request, response) {
  const developerId = requireNonEmptyString(request.params.id, 'developer id');
  response.json({ data: await getFocusedDeveloperGraph(developerId) });
}
