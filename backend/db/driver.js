import neo4j from 'neo4j-driver';
import { env } from '../config/env.js';

// The Neo4j driver manages a pool of Bolt connections for us. Creating it once
// avoids opening a new TCP connection for every API request.
const driver = neo4j.driver(
  env.databaseUri,
  neo4j.auth.basic(env.databaseUsername, env.databasePassword),
  {
    connectionTimeout: 10_000,
    maxConnectionPoolSize: 50,
    disableLosslessIntegers: true,
  },
);

// Use a short-lived session for each unit of work. Sessions are lightweight,
// but closing them is important because it returns their connection to the pool.
export async function executeRead(query, parameters = {}) {
  const session = driver.session({ defaultAccessMode: neo4j.session.READ });

  try {
    return await session.executeRead((transaction) =>
      transaction.run(query, parameters),
    );
  } finally {
    await session.close();
  }
}

export async function executeWrite(query, parameters = {}) {
  const session = driver.session({ defaultAccessMode: neo4j.session.WRITE });

  try {
    return await session.executeWrite((transaction) =>
      transaction.run(query, parameters),
    );
  } finally {
    await session.close();
  }
}

// verifyConnectivity performs the Bolt handshake without changing graph data.
// It is used during startup so configuration problems are visible immediately.
export async function verifyDatabaseConnectivity() {
  await driver.verifyConnectivity();
}

// Hosting platforms send a shutdown signal before stopping the process. Closing
// the driver releases its sockets cleanly instead of waiting for them to time out.
export async function closeDatabase() {
  await driver.close();
}
