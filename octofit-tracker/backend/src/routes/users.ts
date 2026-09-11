import { Router, Request, Response } from 'express';

const router = Router();

// GET all users
router.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Get all users', data: [] });
});

// GET user by ID
router.get('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({ message: `Get user with ID ${id}`, data: null });
});

// POST create user
router.post('/', (req: Request, res: Response) => {
  res.status(201).json({ message: 'User created', data: req.body });
});

// PUT update user
router.put('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({ message: `User ${id} updated`, data: req.body });
});

// DELETE user
router.delete('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  res.status(204).json({ message: `User ${id} deleted` });
});

export default router;
