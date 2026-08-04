import { randomUUID } from 'node:crypto';
import { createProjectTeamQuery, findProjectTeamByIdQuery, findProjectTeamsQuery } from '../queries/teamQueries.js';
import { HttpError } from '../utils/httpErrors.js';
import { runReadQuery, runWriteQuery } from './queryService.js';

export async function getProjectTeams() {
  return runReadQuery(findProjectTeamsQuery);
}

export async function getProjectTeam(teamId) {
  const rows = await runReadQuery(findProjectTeamByIdQuery, { teamId });
  if (!rows.length) throw new HttpError(404, `Project team ${teamId} was not found.`);
  return rows[0];
}

export async function createProjectTeam({ name, requiredSkills, developerIds }) {
  const teamId = `project-team-${randomUUID()}`;
  const rows = await runWriteQuery(createProjectTeamQuery, {
    teamId,
    name,
    requiredSkills,
    developerIds,
    createdAt: new Date().toISOString(),
  });

  // The query creates nothing if any selected developer ID is unknown.
  if (!rows.length) {
    throw new HttpError(400, 'One or more selected developers do not exist.');
  }

  return rows[0];
}
