"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Activity_1 = __importDefault(require("../models/Activity"));
const router = (0, express_1.Router)();
// GET all activities
router.get('/', async (req, res) => {
    try {
        const activities = await Activity_1.default.find().populate('userId');
        res.json({ message: 'Get all activities', data: activities });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch activities' });
    }
});
// GET activity by ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const activity = await Activity_1.default.findById(id).populate('userId');
        res.json({ message: `Get activity with ID ${id}`, data: activity });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch activity' });
    }
});
// POST create activity
router.post('/', async (req, res) => {
    try {
        const activity = new Activity_1.default(req.body);
        await activity.save();
        res.status(201).json({ message: 'Activity created', data: activity });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to create activity' });
    }
});
// PUT update activity
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const activity = await Activity_1.default.findByIdAndUpdate(id, req.body, { new: true });
        res.json({ message: `Activity ${id} updated`, data: activity });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to update activity' });
    }
});
// DELETE activity
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await Activity_1.default.findByIdAndDelete(id);
        res.status(204).json({ message: `Activity ${id} deleted` });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to delete activity' });
    }
});
exports.default = router;
//# sourceMappingURL=activities.js.map