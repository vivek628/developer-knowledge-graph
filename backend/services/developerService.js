import {
  findAllDevelopersQuery,
  findDeveloperNetworkQuery,
  findDeveloperProfileQuery,
  findDeveloperSkillGapsQuery,
  recommendReviewersQuery,
} from '../queries/developerQueries.js';
import { HttpError } from '../utils/httpErrors.js';
import { runReadQuery } from './queryService.js';

export async function getDevelopers() {
  const rows = await runReadQuery(findAllDevelopersQuery);
  return rows.map((row) => row.developer);
}

export async function getDeveloperProfile(developerId) {
  const rows = await runReadQuery(findDeveloperProfileQuery, { developerId });

  if (rows.length === 0) {
    throw new HttpError(404, `Developer ${developerId} was not found.`);
  }

  return rows[0];
}

export async function getDeveloperNetwork(developerId) {
  await getDeveloperProfile(developerId);
  return runReadQuery(findDeveloperNetworkQuery, { developerId });
}

export async function getReviewerRecommendations(developerId, limit) {
  await getDeveloperProfile(developerId);
  return runReadQuery(recommendReviewersQuery, { developerId, limit });
}

export async function getDeveloperSkillGaps(developerId) {
  await getDeveloperProfile(developerId);
  return runReadQuery(findDeveloperSkillGapsQuery, { developerId });
}
