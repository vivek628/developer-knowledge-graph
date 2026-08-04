import {
  dashboardSummaryQuery,
  findAllProjectsQuery,
  findAllSkillsQuery,
  findAllTechnologiesQuery,
  popularSkillsQuery,
} from '../queries/catalogQueries.js';
import { recommendTeamMembersQuery } from '../queries/developerQueries.js';
import { runReadQuery } from './queryService.js';

export async function getProjects() {
  return runReadQuery(findAllProjectsQuery);
}

export async function getSkills() {
  return runReadQuery(findAllSkillsQuery);
}

export async function getTechnologies() {
  return runReadQuery(findAllTechnologiesQuery);
}

export async function getDashboardSummary() {
  const [summary] = await runReadQuery(dashboardSummaryQuery);
  const popularSkills = await runReadQuery(popularSkillsQuery, { limit: 5 });
  return { ...summary, popularSkills };
}

export async function recommendTeamMembers(requiredSkills, limit) {
  return runReadQuery(recommendTeamMembersQuery, { requiredSkills, limit });
}
