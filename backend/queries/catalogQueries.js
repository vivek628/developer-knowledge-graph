export const findAllProjectsQuery = `
MATCH (project:Project)
OPTIONAL MATCH (project)-[:USES]->(technology:Technology)
OPTIONAL MATCH (project)-[:OWNED_BY]->(company:Company)
RETURN project {.*} AS project,
       collect(DISTINCT technology {.*}) AS technologies,
       head(collect(DISTINCT company {.*})) AS company
ORDER BY project.name
`;

export const findProjectsByTechnologyQuery = `
MATCH (project:Project)-[:USES]->(technology:Technology)
WHERE toLower(technology.name) = toLower($technologyName)
RETURN project {.*} AS project, technology {.*} AS technology
ORDER BY project.name
`;

export const findAllSkillsQuery = `
MATCH (skill:Skill)
OPTIONAL MATCH (developer:Developer)-[:KNOWS]->(skill)
RETURN skill {.*} AS skill, count(DISTINCT developer) AS developerCount
ORDER BY developerCount DESC, skill.name
`;

export const findAllTechnologiesQuery = `
MATCH (technology:Technology)
OPTIONAL MATCH (project:Project)-[:USES]->(technology)
RETURN technology {.*} AS technology, count(DISTINCT project) AS projectCount
ORDER BY projectCount DESC, technology.name
`;

export const dashboardSummaryQuery = `
CALL {
  MATCH (developer:Developer) RETURN count(developer) AS developerCount
}
CALL {
  MATCH (project:Project) RETURN count(project) AS projectCount
}
CALL {
  MATCH (skill:Skill) RETURN count(skill) AS skillCount
}
CALL {
  MATCH (technology:Technology) RETURN count(technology) AS technologyCount
}
CALL {
  MATCH (repository:Repository) RETURN count(repository) AS repositoryCount
}
CALL {
  MATCH (team:Team) RETURN count(team) AS teamCount
}
RETURN developerCount, projectCount, skillCount, technologyCount,
       repositoryCount, teamCount
`;

export const popularSkillsQuery = `
MATCH (developer:Developer)-[:KNOWS]->(skill:Skill)
RETURN skill {.*} AS skill, count(DISTINCT developer) AS developerCount
ORDER BY developerCount DESC, skill.name
LIMIT $limit
`;
