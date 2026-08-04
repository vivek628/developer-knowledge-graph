// The visualization needs relationship endpoints as plain maps rather than raw
// Neo4j values. That keeps Cytoscape-specific formatting out of the database.
export const findCompleteGraphQuery = `
MATCH (source)-[relationship]->(target)
WHERE source.id IS NOT NULL AND target.id IS NOT NULL
RETURN source {.*, nodeType: labels(source)[0]} AS source,
       target {.*, nodeType: labels(target)[0]} AS target,
       type(relationship) AS relationshipType
ORDER BY source.id, relationshipType, target.id
`;

// A profile graph includes every direct relationship plus useful project
// context one additional hop away, such as technologies and required skills.
export const findDeveloperGraphQuery = `
MATCH (focus:Developer {id: $developerId})-[relationship]-(neighbor)
WITH startNode(relationship) AS sourceNode,
     endNode(relationship) AS targetNode,
     relationship
RETURN sourceNode {.*, nodeType: labels(sourceNode)[0]} AS source,
       targetNode {.*, nodeType: labels(targetNode)[0]} AS target,
       type(relationship) AS relationshipType
UNION
MATCH (focus:Developer {id: $developerId})-[:WORKED_ON]->(project:Project)-[relationship]->(detail)
WITH startNode(relationship) AS sourceNode,
     endNode(relationship) AS targetNode,
     relationship
RETURN sourceNode {.*, nodeType: labels(sourceNode)[0]} AS source,
       targetNode {.*, nodeType: labels(targetNode)[0]} AS target,
       type(relationship) AS relationshipType
`;
