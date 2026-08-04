// Project teams use MEMBER_OF so they remain distinct from the permanent
// organizational teams represented by BELONGS_TO.
export const createProjectTeamQuery = `
MATCH (developer:Developer)
WHERE developer.id IN $developerIds
WITH collect(developer) AS developers
WHERE size(developers) = size($developerIds)
CREATE (team:Team {
  id: $teamId,
  name: $name,
  kind: 'ProjectTeam',
  requiredSkills: $requiredSkills,
  createdAt: $createdAt
})
FOREACH (developer IN developers |
  CREATE (developer)-[:MEMBER_OF]->(team)
)
RETURN team {.*} AS team,
       [developer IN developers | developer {.*}] AS members
`;

export const findProjectTeamsQuery = `
MATCH (team:Team {kind: 'ProjectTeam'})
OPTIONAL MATCH (developer:Developer)-[:MEMBER_OF]->(team)
OPTIONAL MATCH (developer)-[:KNOWS]->(skill:Skill)
WITH team, developer, collect(DISTINCT skill.name) AS developerSkills
WITH team,
     collect(DISTINCT developer {.*, skills: developerSkills}) AS members
RETURN team {.*} AS team, members
ORDER BY team.createdAt DESC
`;

export const findProjectTeamByIdQuery = `
MATCH (team:Team {id: $teamId, kind: 'ProjectTeam'})
OPTIONAL MATCH (developer:Developer)-[:MEMBER_OF]->(team)
OPTIONAL MATCH (developer)-[:KNOWS]->(skill:Skill)
WITH team, developer, collect(DISTINCT skill.name) AS developerSkills
WITH team,
     collect(DISTINCT developer {.*, skills: developerSkills}) AS members
RETURN team {.*} AS team, members
`;
