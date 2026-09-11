"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Leaderboard_1 = __importDefault(require("../models/Leaderboard"));
const router = (0, express_1.Router)();
// GET leaderboard (all users ranked)
router.get('/', async (req, res) => {
    try {
        const leaderboard = await Leaderboard_1.default.find().sort({ rank: 1 }).populate('userId').populate('teamId');
        res.json({ message: 'Get leaderboard', data: leaderboard });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch leaderboard' });
    }
});
// GET leaderboard by team
router.get('/team/:teamId', async (req, res) => {
    try {
        const { teamId } = req.params;
        const leaderboard = await Leaderboard_1.default.find({ teamId }).sort({ rank: 1 }).populate('userId');
        res.json({ message: `Get leaderboard for team ${teamId}`, data: leaderboard });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch team leaderboard' });
    }
});
// GET user ranking
router.get('/user/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const ranking = await Leaderboard_1.default.findOne({ userId }).populate('userId').populate('teamId');
        res.json({ message: `Get ranking for user ${userId}`, data: ranking });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch user ranking' });
    }
});
exports.default = router;
//# sourceMappingURL=leaderboard.js.map