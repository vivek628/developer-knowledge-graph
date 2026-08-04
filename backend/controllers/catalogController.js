import {
  getDashboardSummary,
  getProjects,
  getSkills,
  getTechnologies,
  recommendTeamMembers,
} from '../services/catalogService.js';
import { parseLimit, parseRequiredSkills } from '../utils/validation.js';
import { createProjectTeam, getProjectTeam, getProjectTeams } from '../services/projectTeamService.js';
import { parseDeveloperIds, requireNonEmptyString } from '../utils/validation.js';

export async function listProjects(_request, response) {
  response.json({ data: await getProjects() });
}

export async function listSkills(_request, response) {
  response.json({ data: await getSkills() });
}

export async function listTechnologies(_request, response) {
  response.json({ data: await getTechnologies() });
}

export async function showDashboard(_request, response) {
  response.json({ data: await getDashboardSummary() });
}

export async function listTeamRecommendations(request, response) {
  const requiredSkills = parseRequiredSkills(request.query.skills);
  const limit = parseLimit(request.query.limit, 10);
  response.json({
    data: await recommendTeamMembers(requiredSkills, limit),
    meta: { requiredSkills },
  });
}

export async function listProjectTeams(_request, response) {
  response.json({ data: await getProjectTeams() });
}

export async function showProjectTeam(request, response) {
  const teamId = requireNonEmptyString(request.params.id, 'team id');
  response.json({ data: await getProjectTeam(teamId) });
}

export async function storeProjectTeam(request, response) {
  const name = requireNonEmptyString(request.body?.name, 'name');
  if (name.length < 2 || name.length > 80) {
    const error = new Error('name must contain between 2 and 80 characters.');
    error.statusCode = 400;
    throw error;
  }

  const requiredSkills = parseRequiredSkills(request.body?.requiredSkills);
  const developerIds = parseDeveloperIds(request.body?.developerIds);
  response.status(201).json({
    data: await createProjectTeam({ name, requiredSkills, developerIds }),
  });
}
