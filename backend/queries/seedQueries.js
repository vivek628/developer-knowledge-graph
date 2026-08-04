// Labels and relationship types cannot be supplied as Cypher parameters, so
// every statement is a fixed constant. Only data values enter through $rows.
export const constraintQueries = [
  'CREATE CONSTRAINT developer_id_unique IF NOT EXISTS FOR (node:Developer) REQUIRE node.id IS UNIQUE',
  'CREATE CONSTRAINT skill_id_unique IF NOT EXISTS FOR (node:Skill) REQUIRE node.id IS UNIQUE',
  'CREATE CONSTRAINT project_id_unique IF NOT EXISTS FOR (node:Project) REQUIRE node.id IS UNIQUE',
  'CREATE CONSTRAINT technology_id_unique IF NOT EXISTS FOR (node:Technology) REQUIRE node.id IS UNIQUE',
  'CREATE CONSTRAINT repository_id_unique IF NOT EXISTS FOR (node:Repository) REQUIRE node.id IS UNIQUE',
  'CREATE CONSTRAINT team_id_unique IF NOT EXISTS FOR (node:Team) REQUIRE node.id IS UNIQUE',
  'CREATE CONSTRAINT company_id_unique IF NOT EXISTS FOR (node:Company) REQUIRE node.id IS UNIQUE',
];

export const nodeQueries = {
  developers: 'UNWIND $rows AS row MERGE (node:Developer {id: row.id}) SET node += row',
  skills: 'UNWIND $rows AS row MERGE (node:Skill {id: row.id}) SET node += row',
  projects: 'UNWIND $rows AS row MERGE (node:Project {id: row.id}) SET node += row',
  technologies: 'UNWIND $rows AS row MERGE (node:Technology {id: row.id}) SET node += row',
  repositories: 'UNWIND $rows AS row MERGE (node:Repository {id: row.id}) SET node += row',
  teams: 'UNWIND $rows AS row MERGE (node:Team {id: row.id}) SET node += row',
  companies: 'UNWIND $rows AS row MERGE (node:Company {id: row.id}) SET node += row',
};

export const relationshipQueries = {
  developerSkills: `UNWIND $rows AS row MATCH (developer:Developer {id: row.fromId}) MATCH (skill:Skill {id: row.toId}) MERGE (developer)-[:KNOWS]->(skill)`,
  teamMembers: `UNWIND $rows AS row MATCH (developer:Developer {id: row.fromId}) MATCH (team:Team {id: row.toId}) MERGE (developer)-[:BELONGS_TO]->(team)`,
  projectDevelopers: `UNWIND $rows AS row MATCH (developer:Developer {id: row.fromId}) MATCH (project:Project {id: row.toId}) MERGE (developer)-[:WORKED_ON]->(project)`,
  projectTechnologies: `UNWIND $rows AS row MATCH (project:Project {id: row.fromId}) MATCH (technology:Technology {id: row.toId}) MERGE (project)-[:USES]->(technology)`,
  projectSkills: `UNWIND $rows AS row MATCH (project:Project {id: row.fromId}) MATCH (skill:Skill {id: row.toId}) MERGE (project)-[:REQUIRES]->(skill)`,
  projectCompanies: `UNWIND $rows AS row MATCH (project:Project {id: row.fromId}) MATCH (company:Company {id: row.toId}) MERGE (project)-[:OWNED_BY]->(company)`,
  repositoryContributors: `UNWIND $rows AS row MATCH (developer:Developer {id: row.fromId}) MATCH (repository:Repository {id: row.toId}) MERGE (developer)-[:CONTRIBUTED_TO]->(repository)`,
  collaborations: `UNWIND $rows AS row MATCH (first:Developer {id: row.fromId}) MATCH (second:Developer {id: row.toId}) MERGE (first)-[:WORKED_WITH]->(second)`,
  mentorships: `UNWIND $rows AS row MATCH (mentor:Developer {id: row.fromId}) MATCH (mentee:Developer {id: row.toId}) MERGE (mentor)-[:MENTORED]->(mentee)`,
};

export const countQuery = `
MATCH (node)
WHERE node.id STARTS WITH 'developer-'
   OR node.id STARTS WITH 'skill-'
   OR node.id STARTS WITH 'project-'
   OR node.id STARTS WITH 'technology-'
   OR node.id STARTS WITH 'repository-'
   OR node.id STARTS WITH 'team-'
   OR node.id STARTS WITH 'company-'
RETURN labels(node)[0] AS label, count(node) AS count
ORDER BY label
`;
