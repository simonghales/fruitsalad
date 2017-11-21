interface SessionValues {
  id?: string,
  users?: {},
}

export const DEFAULT_SESSION_VALUES: SessionValues = {};

export function generateNewSession(sessionValues: SessionValues) {
  return {
    ...DEFAULT_SESSION_VALUES,
    ...sessionValues,
  }
}