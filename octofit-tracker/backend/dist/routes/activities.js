"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
// GET all activities
router.get('/', (req, res) => {
    res.json({ message: 'Get all activities', data: [] });
});
// GET activity by ID
router.get('/:id', (req, res) => {
    const { id } = req.params;
    res.json({ message: `Get activity with ID ${id}`, data: null });
});
// POST create activity
router.post('/', (req, res) => {
    res.status(201).json({ message: 'Activity created', data: req.body });
});
// PUT update activity
router.put('/:id', (req, res) => {
    const { id } = req.params;
    res.json({ message: `Activity ${id} updated`, data: req.body });
});
// DELETE activity
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    res.status(204).json({ message: `Activity ${id} deleted` });
});
exports.default = router;
//# sourceMappingURL=activities.js.map