import {
  getDeveloperNetwork,
  getDeveloperProfile,
  getDevelopers,
  getDeveloperSkillGaps,
  getReviewerRecommendations,
} from '../services/developerService.js';
import { parseLimit, requireNonEmptyString } from '../utils/validation.js';

export async function listDevelopers(_request, response) {
  response.json({ data: await getDevelopers() });
}

export async function showDeveloper(request, response) {
  const developerId = requireNonEmptyString(request.params.id, 'developer id');
  response.json({ data: await getDeveloperProfile(developerId) });
}

export async function showDeveloperNetwork(request, response) {
  const developerId = requireNonEmptyString(request.params.id, 'developer id');
  response.json({ data: await getDeveloperNetwork(developerId) });
}

export async function listReviewerRecommendations(request, response) {
  const developerId = requireNonEmptyString(request.params.id, 'developer id');
  const limit = parseLimit(request.query.limit);
  response.json({ data: await getReviewerRecommendations(developerId, limit) });
}

export async function listDeveloperSkillGaps(request, response) {
  const developerId = requireNonEmptyString(request.params.id, 'developer id');
  response.json({ data: await getDeveloperSkillGaps(developerId) });
}
