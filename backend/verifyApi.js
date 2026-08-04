import app from './app.js';
import { closeDatabase } from './db/driver.js';

const checks = [
  ['developers', '/api/developers', 200],
  ['developer profile', '/api/developers/developer-11', 200],
  ['developer network', '/api/developers/developer-01/network', 200],
  ['reviewers', '/api/developers/developer-11/recommend-reviewers?limit=3', 200],
  ['skill gaps', '/api/developers/developer-12/skill-gaps', 200],
  ['projects', '/api/projects', 200],
  ['skills', '/api/skills', 200],
  ['technologies', '/api/technologies', 200],
  ['dashboard', '/api/dashboard', 200],
  ['case-insensitive team recommendation', '/api/teams/recommend?skills=react,graphql&limit=3', 200],
  ['saved project teams', '/api/teams/project-teams', 200],
  ['complete graph', '/api/graph/network', 200],
  ['developer graph', '/api/graph/developers/developer-11', 200],
  ['missing developer', '/api/developers/developer-999', 404],
  ['invalid team request', '/api/teams/recommend', 400],
  ['invalid partial limit', '/api/developers/developer-11/recommend-reviewers?limit=3people', 400],
];

let failed = false;
const server = app.listen(0);
await new Promise((resolve) => server.once('listening', resolve));
const baseUrl = `http://127.0.0.1:${server.address().port}`;

try {
  for (const [name, path, expectedStatus] of checks) {
    const response = await fetch(`${baseUrl}${path}`);
    const passed = response.status === expectedStatus;
    failed ||= !passed;
    console.log(`${passed ? 'PASS' : 'FAIL'} ${name}: ${response.status}`);
  }

  const securedResponse = await fetch(`${baseUrl}/`);
  const hasSecurityHeader = securedResponse.headers.get('x-content-type-options') === 'nosniff';
  console.log(`${hasSecurityHeader ? 'PASS' : 'FAIL'} security headers`);
  failed ||= !hasSecurityHeader;

  const safeResponse = await fetch(`${baseUrl}/api/graph/query`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      queryName: 'developersBySkill',
      parameters: { skillName: 'React' },
    }),
  });
  console.log(`${safeResponse.status === 200 ? 'PASS' : 'FAIL'} safe graph query: ${safeResponse.status}`);
  failed ||= safeResponse.status !== 200;

  const rawQueryResponse = await fetch(`${baseUrl}/api/graph/query`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ queryName: 'MATCH (node) RETURN node', parameters: {} }),
  });
  console.log(`${rawQueryResponse.status === 400 ? 'PASS' : 'FAIL'} raw query rejected: ${rawQueryResponse.status}`);
  failed ||= rawQueryResponse.status !== 400;
} finally {
  await new Promise((resolve) => server.close(resolve));
  await closeDatabase();
}

if (failed) {
  process.exitCode = 1;
}
