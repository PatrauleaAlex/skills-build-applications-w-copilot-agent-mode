/**
 * API Configuration Utility
 * Detects Codespaces environment and generates appropriate API base URL
 */

export const getApiUrl = (): string => {
  // Check if running in Codespaces environment
  if (process.env.CODESPACE_NAME) {
    return `https://${process.env.CODESPACE_NAME}-8000.app.github.dev`;
  }
  
  // Default to localhost
  const port = process.env.PORT || 8000;
  return `http://localhost:${port}`;
};

export const API_BASE_URL = getApiUrl();

export const endpoints = {
  health: `${API_BASE_URL}/api/health`,
  users: `${API_BASE_URL}/api/users`,
  teams: `${API_BASE_URL}/api/teams`,
  activities: `${API_BASE_URL}/api/activities`,
  leaderboard: `${API_BASE_URL}/api/leaderboard`,
  workouts: `${API_BASE_URL}/api/workouts`
};

export default {
  getApiUrl,
  API_BASE_URL,
  endpoints
};
