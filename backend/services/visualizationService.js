import { findCompleteGraphQuery, findDeveloperGraphQuery } from '../queries/visualizationQueries.js';
import { getDeveloperProfile } from './developerService.js';
import { runReadQuery } from './queryService.js';

// Turn repeated relationship rows into one node list and one edge list. This is
// a neutral graph shape that any visualization library can consume.
function buildGraph(rows) {
  const nodesById = new Map();
  const edges = [];

  for (const row of rows) {
    nodesById.set(row.source.id, {
      id: row.source.id,
      label: row.source.name,
      type: row.source.nodeType,
      properties: row.source,
    });
    nodesById.set(row.target.id, {
      id: row.target.id,
      label: row.target.name,
      type: row.target.nodeType,
      properties: row.target,
    });

    edges.push({
      id: `${row.source.id}-${row.relationshipType}-${row.target.id}`,
      source: row.source.id,
      target: row.target.id,
      type: row.relationshipType,
    });
  }

  return { nodes: [...nodesById.values()], edges };
}

export async function getCompleteGraph() {
  return buildGraph(await runReadQuery(findCompleteGraphQuery));
}

export async function getFocusedDeveloperGraph(developerId) {
  // Return a proper 404 instead of an empty graph for an unknown developer.
  await getDeveloperProfile(developerId);
  return buildGraph(await runReadQuery(findDeveloperGraphQuery, { developerId }));
}
