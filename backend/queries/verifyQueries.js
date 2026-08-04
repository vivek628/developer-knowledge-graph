import { closeDatabase, executeRead } from '../db/driver.js';
import {
  dashboardSummaryQuery,
  findAllProjectsQuery,
  findAllSkillsQuery,
  findAllTechnologiesQuery,
  findProjectsByTechnologyQuery,
  popularSkillsQuery,
} from './catalogQueries.js';
import {
  findAllDevelopersQuery,
  findDeveloperProfileQuery,
  findDeveloperNetworkQuery,
  findDevelopersBySkillQuery,
  findDeveloperSkillGapsQuery,
  findDevelopersWithSharedSkillsQuery,
  findMentorsQuery,
  findRepositoriesWorkedOnTogetherQuery,
  findShortestCollaborationPathQuery,
  findTeammatesQuery,
  findTechnologiesUsedByDeveloperQuery,
  recommendReviewersQuery,
  recommendTeamMembersQuery,
} from './developerQueries.js';
import { findCompleteGraphQuery, findDeveloperGraphQuery } from './visualizationQueries.js';

// Representative parameters make failures reproducible without modifying data.
const checks = [
  ['complete visualization graph', findCompleteGraphQuery, {}],
  ['developer visualization graph', findDeveloperGraphQuery, { developerId: 'developer-11' }],
  ['all developers', findAllDevelopersQuery, {}],
  ['developer profile', findDeveloperProfileQuery, { developerId: 'developer-11' }],
  ['all projects', findAllProjectsQuery, {}],
  ['all skills', findAllSkillsQuery, {}],
  ['all technologies', findAllTechnologiesQuery, {}],
  ['dashboard summary', dashboardSummaryQuery, {}],
  ['popular skills', popularSkillsQuery, { limit: 5 }],
  ['developers by skill', findDevelopersBySkillQuery, { skillName: 'React' }],
  ['GraphQL projects', findProjectsByTechnologyQuery, { technologyName: 'GraphQL' }],
  ['developer technologies', findTechnologiesUsedByDeveloperQuery, { developerId: 'developer-11' }],
  ['teammates', findTeammatesQuery, { developerId: 'developer-01' }],
  ['mentor', findMentorsQuery, { developerId: 'developer-09' }],
  ['shortest collaboration path', findShortestCollaborationPathQuery, { startDeveloperId: 'developer-01', endDeveloperId: 'developer-13' }],
  ['shared skills', findDevelopersWithSharedSkillsQuery, { developerId: 'developer-02' }],
  ['shared repositories', findRepositoriesWorkedOnTogetherQuery, { firstDeveloperId: 'developer-02', secondDeveloperId: 'developer-11' }],
  ['skill gaps', findDeveloperSkillGapsQuery, { developerId: 'developer-12' }],
  ['two-hop network', findDeveloperNetworkQuery, { developerId: 'developer-01' }],
  ['reviewer recommendations', recommendReviewersQuery, { developerId: 'developer-11', limit: 5 }],
  ['case-insensitive team recommendations', recommendTeamMembersQuery, { requiredSkills: ['react', 'graphql'], limit: 5 }],
];

let failed = false;

try {
  for (const [name, query, parameters] of checks) {
    try {
      const result = await executeRead(query, parameters);
      console.log(`PASS ${name}: ${result.records.length} row(s)`);
    } catch (error) {
      failed = true;
      console.error(`FAIL ${name}: ${error.message}`);
    }
  }
} finally {
  await closeDatabase();
}

if (failed) {
  process.exitCode = 1;
}
