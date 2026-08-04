import { closeDatabase, executeRead, executeWrite } from '../db/driver.js';
import { constraintQueries, countQuery, nodeQueries, relationshipQueries } from '../queries/seedQueries.js';
import {
  collaborations, companies, developers, developerSkills, mentorships,
  projectCompanies, projectDevelopers, projects, projectSkills,
  projectTechnologies, repositories, repositoryContributors, skills,
  teamMembers, teams, technologies,
} from './data.js';

// Convert a parent-to-children map into the simple row format consumed by
// parameterized UNWIND queries.
function expandManyToManyMap(map, reverse = false) {
  return Object.entries(map).flatMap(([parentId, childIds]) =>
    childIds.map((childId) => ({
      fromId: reverse ? childId : parentId,
      toId: reverse ? parentId : childId,
    })),
  );
}

function expandOneToOneMap(map) {
  return Object.entries(map).map(([fromId, toId]) => ({ fromId, toId }));
}

function expandPairs(pairs) {
  return pairs.map(([fromId, toId]) => ({ fromId, toId }));
}

async function seedGraph() {
  console.log('Creating unique ID constraints...');
  for (const query of constraintQueries) {
    await executeWrite(query);
  }

  const nodeData = { developers, skills, projects, technologies, repositories, teams, companies };
  for (const [name, rows] of Object.entries(nodeData)) {
    await executeWrite(nodeQueries[name], { rows });
    console.log(`Seeded ${rows.length} ${name}.`);
  }

  const relationshipData = {
    developerSkills: expandManyToManyMap(developerSkills),
    teamMembers: expandManyToManyMap(teamMembers, true),
    projectDevelopers: expandManyToManyMap(projectDevelopers, true),
    projectTechnologies: expandManyToManyMap(projectTechnologies),
    projectSkills: expandManyToManyMap(projectSkills),
    projectCompanies: expandOneToOneMap(projectCompanies),
    repositoryContributors: expandManyToManyMap(repositoryContributors, true),
    collaborations: expandPairs(collaborations),
    mentorships: expandPairs(mentorships),
  };

  for (const [name, rows] of Object.entries(relationshipData)) {
    await executeWrite(relationshipQueries[name], { rows });
    console.log(`Seeded ${rows.length} ${name} relationships.`);
  }

  const result = await executeRead(countQuery);
  console.log('\nGraph totals:');
  for (const record of result.records) {
    console.log(`- ${record.get('label')}: ${record.get('count')}`);
  }
}

try {
  await seedGraph();
  console.log('\nSeed completed successfully.');
} catch (error) {
  console.error(`\nSeed failed: ${error.message}`);
  process.exitCode = 1;
} finally {
  await closeDatabase();
}
