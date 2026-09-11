/**
 * API Configuration for Frontend
 * Detects Codespaces environment and generates appropriate API base URL
 */

const getApiUrl = (): string => {
  // Check for Codespaces environment
  if (window.location.hostname.includes('app.github.dev')) {
    // Extract the codespace name from the hostname
    // Format: codespace-name-8000.app.github.dev -> codespace-name
    const codespaceName = window.location.hostname.split('-8000.app.github.dev')[0];
    return `https://${codespaceName}-8000.app.github.dev`;
  }
  
  // Default to localhost for development
  return 'http://localhost:8000';
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

/**
 * API Client helper functions
 */
export const apiClient = {
  async get<T>(endpoint: string): Promise<T> {
    const response = await fetch(endpoint);
    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }
    return response.json();
  },

  async post<T>(endpoint: string, data: any): Promise<T> {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }
    return response.json();
  },

  async put<T>(endpoint: string, data: any): Promise<T> {
    const response = await fetch(endpoint, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }
    return response.json();
  },

  async delete<T>(endpoint: string): Promise<T> {
    const response = await fetch(endpoint, {
      method: 'DELETE'
    });
    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }
    return response.json();
  }
};

export default {
  API_BASE_URL,
  endpoints,
  apiClient,
  getApiUrl
};
