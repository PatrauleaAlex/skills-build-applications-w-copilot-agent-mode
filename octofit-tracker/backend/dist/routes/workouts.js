"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
// GET all workouts
router.get('/', (req, res) => {
    res.json({ message: 'Get all workouts', data: [] });
});
// GET workout by ID
router.get('/:id', (req, res) => {
    const { id } = req.params;
    res.json({ message: `Get workout with ID ${id}`, data: null });
});
// POST create workout
router.post('/', (req, res) => {
    res.status(201).json({ message: 'Workout created', data: req.body });
});
// PUT update workout
router.put('/:id', (req, res) => {
    const { id } = req.params;
    res.json({ message: `Workout ${id} updated`, data: req.body });
});
// DELETE workout
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    res.status(204).json({ message: `Workout ${id} deleted` });
});
// GET personalized workout suggestions for user
router.get('/suggestions/:userId', (req, res) => {
    const { userId } = req.params;
    res.json({ message: `Get personalized workout suggestions for user ${userId}`, data: [] });
});
exports.default = router;
//# sourceMappingURL=workouts.js.map