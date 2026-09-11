"use strict";
/**
 * API Configuration Utility
 * Detects Codespaces environment and generates appropriate API base URL
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.endpoints = exports.API_BASE_URL = exports.getApiUrl = void 0;
const getApiUrl = () => {
    // Check if running in Codespaces environment
    if (process.env.CODESPACE_NAME) {
        return `https://${process.env.CODESPACE_NAME}-8000.app.github.dev`;
    }
    // Default to localhost
    const port = process.env.PORT || 8000;
    return `http://localhost:${port}`;
};
exports.getApiUrl = getApiUrl;
exports.API_BASE_URL = (0, exports.getApiUrl)();
exports.endpoints = {
    health: `${exports.API_BASE_URL}/api/health`,
    users: `${exports.API_BASE_URL}/api/users`,
    teams: `${exports.API_BASE_URL}/api/teams`,
    activities: `${exports.API_BASE_URL}/api/activities`,
    leaderboard: `${exports.API_BASE_URL}/api/leaderboard`,
    workouts: `${exports.API_BASE_URL}/api/workouts`
};
exports.default = {
    getApiUrl: exports.getApiUrl,
    API_BASE_URL: exports.API_BASE_URL,
    endpoints: exports.endpoints
};
//# sourceMappingURL=api.js.map