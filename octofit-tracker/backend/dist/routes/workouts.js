"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Workout_1 = __importDefault(require("../models/Workout"));
const router = (0, express_1.Router)();
// GET all workouts
router.get('/', async (req, res) => {
    try {
        const workouts = await Workout_1.default.find().populate('userId');
        res.json({ message: 'Get all workouts', data: workouts });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch workouts' });
    }
});
// GET workout by ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const workout = await Workout_1.default.findById(id).populate('userId');
        res.json({ message: `Get workout with ID ${id}`, data: workout });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch workout' });
    }
});
// POST create workout
router.post('/', async (req, res) => {
    try {
        const workout = new Workout_1.default(req.body);
        await workout.save();
        res.status(201).json({ message: 'Workout created', data: workout });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to create workout' });
    }
});
// PUT update workout
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const workout = await Workout_1.default.findByIdAndUpdate(id, req.body, { new: true });
        res.json({ message: `Workout ${id} updated`, data: workout });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to update workout' });
    }
});
// DELETE workout
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await Workout_1.default.findByIdAndDelete(id);
        res.status(204).json({ message: `Workout ${id} deleted` });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to delete workout' });
    }
});
// GET personalized workout suggestions for user
router.get('/suggestions/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const userWorkouts = await Workout_1.default.find({ userId }).populate('userId');
        res.json({ message: `Get personalized workout suggestions for user ${userId}`, data: userWorkouts });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch workout suggestions' });
    }
});
exports.default = router;
//# sourceMappingURL=workouts.js.map