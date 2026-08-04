import { HttpError } from './httpErrors.js';

export function requireNonEmptyString(value, fieldName) {
  if (typeof value !== 'string' || !value.trim()) {
    throw new HttpError(400, `${fieldName} must be a non-empty string.`);
  }

  return value.trim();
}

export function parseLimit(value, defaultValue = 5, maximum = 20) {
  if (value === undefined) {
    return defaultValue;
  }

  // Number() rejects partial values such as "5people" that parseInt would
  // silently accept as 5.
  const limit = Number(value);
  if (!Number.isInteger(limit) || limit < 1 || limit > maximum) {
    throw new HttpError(400, `limit must be between 1 and ${maximum}.`);
  }

  return limit;
}

export function parseRequiredSkills(value) {
  const rawSkills = Array.isArray(value) ? value : value?.split(',');

  if (!rawSkills) {
    throw new HttpError(400, 'skills is required. Use a comma-separated list.');
  }

  const skills = [...new Set(rawSkills.map((skill) =>
    requireNonEmptyString(skill, 'Each skill')),
  )];

  if (skills.length === 0 || skills.length > 10) {
    throw new HttpError(400, 'Provide between 1 and 10 skills.');
  }

  return skills;
}

export function parseDeveloperIds(value) {
  if (!Array.isArray(value)) {
    throw new HttpError(400, 'developerIds must be an array.');
  }

  const developerIds = [...new Set(value.map((id) =>
    requireNonEmptyString(id, 'Each developer ID')),
  )];

  if (developerIds.length < 1 || developerIds.length > 10) {
    throw new HttpError(400, 'Select between 1 and 10 developers.');
  }

  return developerIds;
}
