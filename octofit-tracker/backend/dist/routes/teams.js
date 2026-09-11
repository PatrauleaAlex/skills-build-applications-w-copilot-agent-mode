"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
// GET all teams
router.get('/', (req, res) => {
    res.json({ message: 'Get all teams', data: [] });
});
// GET team by ID
router.get('/:id', (req, res) => {
    const { id } = req.params;
    res.json({ message: `Get team with ID ${id}`, data: null });
});
// POST create team
router.post('/', (req, res) => {
    res.status(201).json({ message: 'Team created', data: req.body });
});
// PUT update team
router.put('/:id', (req, res) => {
    const { id } = req.params;
    res.json({ message: `Team ${id} updated`, data: req.body });
});
// DELETE team
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    res.status(204).json({ message: `Team ${id} deleted` });
});
exports.default = router;
//# sourceMappingURL=teams.js.map