"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
// GET leaderboard (all users ranked)
router.get('/', (req, res) => {
    res.json({ message: 'Get leaderboard', data: [] });
});
// GET leaderboard by team
router.get('/team/:teamId', (req, res) => {
    const { teamId } = req.params;
    res.json({ message: `Get leaderboard for team ${teamId}`, data: [] });
});
// GET user ranking
router.get('/user/:userId', (req, res) => {
    const { userId } = req.params;
    res.json({ message: `Get ranking for user ${userId}`, data: null });
});
exports.default = router;
//# sourceMappingURL=leaderboard.js.map