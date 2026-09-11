/**
 * API Configuration Utility
 * Detects Codespaces environment and generates appropriate API base URL
 */
export declare const getApiUrl: () => string;
export declare const API_BASE_URL: string;
export declare const endpoints: {
    health: string;
    users: string;
    teams: string;
    activities: string;
    leaderboard: string;
    workouts: string;
};
declare const _default: {
    getApiUrl: typeof getApiUrl;
    API_BASE_URL: string;
    endpoints: {
        health: string;
        users: string;
        teams: string;
        activities: string;
        leaderboard: string;
        workouts: string;
    };
};
export default _default;
//# sourceMappingURL=api.d.ts.map