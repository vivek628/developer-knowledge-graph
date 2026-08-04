// Query files contain only fixed Cypher. Values always enter through named
// parameters, which keeps user input separate from executable query text.

export const findAllDevelopersQuery = `
MATCH (developer:Developer)
OPTIONAL MATCH (developer)-[:BELONGS_TO]->(team:Team)
RETURN developer {.*, team: team.name} AS developer
ORDER BY developer.name
`;

export const findDeveloperProfileQuery = `
MATCH (developer:Developer {id: $developerId})
OPTIONAL MATCH (developer)-[:KNOWS]->(skill:Skill)
OPTIONAL MATCH (developer)-[:WORKED_ON]->(project:Project)
OPTIONAL MATCH (developer)-[:CONTRIBUTED_TO]->(repository:Repository)
OPTIONAL MATCH (developer)-[:BELONGS_TO]->(team:Team)
OPTIONAL MATCH (developer)-[:WORKED_WITH]-(collaborator:Developer)
OPTIONAL MATCH (mentor:Developer)-[:MENTORED]->(developer)
RETURN developer {.*} AS developer,
       collect(DISTINCT skill {.*}) AS skills,
       collect(DISTINCT project {.*}) AS projects,
       collect(DISTINCT repository {.*}) AS repositories,
       head(collect(DISTINCT team {.*})) AS team,
       collect(DISTINCT collaborator {.*}) AS collaborators,
       head(collect(DISTINCT mentor {.*})) AS mentor
`;

export const findDevelopersBySkillQuery = `
MATCH (developer:Developer)-[:KNOWS]->(skill:Skill)
WHERE toLower(skill.name) = toLower($skillName)
OPTIONAL MATCH (developer)-[:BELONGS_TO]->(team:Team)
RETURN developer {.*, team: team.name} AS developer,
       skill {.*} AS matchedSkill
ORDER BY developer.experience DESC, developer.name
`;

// Developer -> Project -> Technology is a two-hop traversal. Adding another
// project does not require a schema change or an extra SQL join table.
export const findTechnologiesUsedByDeveloperQuery = `
MATCH (developer:Developer {id: $developerId})-[:WORKED_ON]->(project:Project)-[:USES]->(technology:Technology)
RETURN technology {.*} AS technology,
       collect(DISTINCT project {id: project.id, name: project.name}) AS usedOnProjects
ORDER BY technology.name
`;

export const findTeammatesQuery = `
MATCH (developer:Developer {id: $developerId})-[:BELONGS_TO]->(team:Team)<-[:BELONGS_TO]-(teammate:Developer)
WHERE teammate.id <> developer.id
RETURN teammate {.*} AS teammate, team {.*} AS team
ORDER BY teammate.name
`;

export const findMentorsQuery = `
MATCH (mentor:Developer)-[:MENTORED]->(developer:Developer {id: $developerId})
RETURN mentor {.*} AS mentor
ORDER BY mentor.name
`;

// The variable-length relationship is intentionally capped at ten hops. This
// prevents an unexpectedly large traversal while still handling this dataset.
export const findShortestCollaborationPathQuery = `
MATCH (start:Developer {id: $startDeveloperId}),
      (end:Developer {id: $endDeveloperId})
MATCH path = shortestPath((start)-[:WORKED_WITH*..10]-(end))
RETURN [node IN nodes(path) | node {.*}] AS developers,
       length(path) AS hopCount
LIMIT 1
`;

export const findDevelopersWithSharedSkillsQuery = `
MATCH (developer:Developer {id: $developerId})-[:KNOWS]->(skill:Skill)<-[:KNOWS]-(other:Developer)
WHERE other.id <> developer.id
RETURN other {.*} AS developer,
       collect(DISTINCT skill {.*}) AS sharedSkills,
       count(DISTINCT skill) AS sharedSkillCount
ORDER BY sharedSkillCount DESC, developer.name
`;

export const findRepositoriesWorkedOnTogetherQuery = `
MATCH (first:Developer {id: $firstDeveloperId})-[:CONTRIBUTED_TO]->(repository:Repository)<-[:CONTRIBUTED_TO]-(second:Developer {id: $secondDeveloperId})
RETURN repository {.*} AS repository
ORDER BY repository.name
`;

// This anti-pattern traversal finds required skills for which no KNOWS edge
// exists. Expressing the same question in SQL needs several joins plus NOT EXISTS.
export const findDeveloperSkillGapsQuery = `
MATCH (developer:Developer {id: $developerId})
MATCH (project:Project)-[:REQUIRES]->(missingSkill:Skill)
WHERE NOT (developer)-[:KNOWS]->(missingSkill)
RETURN project {.*} AS project,
       collect(DISTINCT missingSkill {.*}) AS missingSkills,
       count(DISTINCT missingSkill) AS missingSkillCount
ORDER BY missingSkillCount ASC, project.name
`;

// Paths of at most two relationships reveal direct collaborators as well as
// developers connected through a shared skill, team, project, or repository.
export const findDeveloperNetworkQuery = `
MATCH path = (source:Developer {id: $developerId})-[*1..2]-(connected:Developer)
WHERE connected.id <> source.id
RETURN connected {.*} AS developer,
       min(length(path)) AS distance,
       collect(DISTINCT [relationship IN relationships(path) | type(relationship)]) AS connectionTypes
ORDER BY distance, developer.name
`;

// Recommendations are explainable: projects carry the most weight, followed by
// repositories and technologies. A candidate must share at least one signal.
export const recommendReviewersQuery = `
MATCH (developer:Developer {id: $developerId})
MATCH (candidate:Developer)
WHERE candidate.id <> developer.id
OPTIONAL MATCH (developer)-[:WORKED_ON]->(sharedProject:Project)<-[:WORKED_ON]-(candidate)
WITH developer, candidate, collect(DISTINCT sharedProject) AS sharedProjects
OPTIONAL MATCH (developer)-[:CONTRIBUTED_TO]->(sharedRepository:Repository)<-[:CONTRIBUTED_TO]-(candidate)
WITH developer, candidate, sharedProjects, collect(DISTINCT sharedRepository) AS sharedRepositories
OPTIONAL MATCH (developer)-[:WORKED_ON]->(:Project)-[:USES]->(sharedTechnology:Technology)<-[:USES]-(:Project)<-[:WORKED_ON]-(candidate)
WITH candidate, sharedProjects, sharedRepositories,
     collect(DISTINCT sharedTechnology) AS sharedTechnologies
WITH candidate, sharedProjects, sharedRepositories, sharedTechnologies,
     size(sharedProjects) * 3 + size(sharedRepositories) * 2 + size(sharedTechnologies) AS score
WHERE score > 0
RETURN candidate {.*} AS developer,
       [item IN sharedProjects | item {.*}] AS sharedProjects,
       [item IN sharedRepositories | item {.*}] AS sharedRepositories,
       [item IN sharedTechnologies | item {.*}] AS sharedTechnologies,
       score
ORDER BY score DESC, developer.name
LIMIT $limit
`;

export const recommendTeamMembersQuery = `
MATCH (developer:Developer)-[:KNOWS]->(skill:Skill)
WHERE toLower(skill.name) IN [requiredSkill IN $requiredSkills | toLower(requiredSkill)]
WITH developer, collect(DISTINCT skill) AS matchedSkills
RETURN developer {.*} AS developer,
       [skill IN matchedSkills | skill {.*}] AS matchedSkills,
       size(matchedSkills) AS matchedSkillCount,
       round(100.0 * size(matchedSkills) / size($requiredSkills)) AS coveragePercent
ORDER BY matchedSkillCount DESC, developer.experience DESC, developer.name
LIMIT $limit
`;
