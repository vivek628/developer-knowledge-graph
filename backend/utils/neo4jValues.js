import neo4j from 'neo4j-driver';

// Neo4j can return special integers, nodes, relationships, and temporal values.
// Convert them recursively so Express always receives plain JSON-friendly data.
export function toNativeValue(value) {
  if (neo4j.isInt(value)) {
    return value.toNumber();
  }

  if (Array.isArray(value)) {
    return value.map(toNativeValue);
  }

  if (value === null || value === undefined || typeof value !== 'object') {
    return value;
  }

  if (value.properties && value.labels) {
    return {
      ...toNativeValue(value.properties),
      labels: value.labels,
    };
  }

  if (value.properties && value.type) {
    return {
      type: value.type,
      properties: toNativeValue(value.properties),
    };
  }

  if (typeof value.toStandardDate === 'function') {
    return value.toStandardDate().toISOString();
  }

  return Object.fromEntries(
    Object.entries(value).map(([key, childValue]) => [key, toNativeValue(childValue)]),
  );
}

export function recordToObject(record) {
  return Object.fromEntries(
    record.keys.map((key) => [key, toNativeValue(record.get(key))]),
  );
}
