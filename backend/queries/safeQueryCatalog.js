import {
  findDeveloperSkillGapsQuery,
  findDevelopersBySkillQuery,
  findDevelopersWithSharedSkillsQuery,
  findRepositoriesWorkedOnTogetherQuery,
  findShortestCollaborationPathQuery,
  findTeammatesQuery,
  findTechnologiesUsedByDeveloperQuery,
} from './developerQueries.js';
import { findProjectsByTechnologyQuery } from './catalogQueries.js';

// POST /graph/query will accept one of these public names, never raw Cypher.
// requiredParameters will later drive request validation in the controller.
export const safeQueryCatalog = Object.freeze({
  developersBySkill: {
    query: findDevelopersBySkillQuery,
    requiredParameters: ['skillName'],
  },
  projectsByTechnology: {
    query: findProjectsByTechnologyQuery,
    requiredParameters: ['technologyName'],
  },
  technologiesByDeveloper: {
    query: findTechnologiesUsedByDeveloperQuery,
    requiredParameters: ['developerId'],
  },
  teammates: {
    query: findTeammatesQuery,
    requiredParameters: ['developerId'],
  },
  shortestCollaborationPath: {
    query: findShortestCollaborationPathQuery,
    requiredParameters: ['startDeveloperId', 'endDeveloperId'],
  },
  developersWithSharedSkills: {
    query: findDevelopersWithSharedSkillsQuery,
    requiredParameters: ['developerId'],
  },
  sharedRepositories: {
    query: findRepositoriesWorkedOnTogetherQuery,
    requiredParameters: ['firstDeveloperId', 'secondDeveloperId'],
  },
  developerSkillGaps: {
    query: findDeveloperSkillGapsQuery,
    requiredParameters: ['developerId'],
  },
});
