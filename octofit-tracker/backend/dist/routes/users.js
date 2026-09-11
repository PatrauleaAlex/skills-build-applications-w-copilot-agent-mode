"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
// GET all users
router.get('/', (req, res) => {
    res.json({ message: 'Get all users', data: [] });
});
// GET user by ID
router.get('/:id', (req, res) => {
    const { id } = req.params;
    res.json({ message: `Get user with ID ${id}`, data: null });
});
// POST create user
router.post('/', (req, res) => {
    res.status(201).json({ message: 'User created', data: req.body });
});
// PUT update user
router.put('/:id', (req, res) => {
    const { id } = req.params;
    res.json({ message: `User ${id} updated`, data: req.body });
});
// DELETE user
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    res.status(204).json({ message: `User ${id} deleted` });
});
exports.default = router;
//# sourceMappingURL=users.js.map