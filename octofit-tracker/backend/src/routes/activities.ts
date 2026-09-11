import { Router, Request, Response } from 'express';

const router = Router();

// GET all activities
router.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Get all activities', data: [] });
});

// GET activity by ID
router.get('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({ message: `Get activity with ID ${id}`, data: null });
});

// POST create activity
router.post('/', (req: Request, res: Response) => {
  res.status(201).json({ message: 'Activity created', data: req.body });
});

// PUT update activity
router.put('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({ message: `Activity ${id} updated`, data: req.body });
});

// DELETE activity
router.delete('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  res.status(204).json({ message: `Activity ${id} deleted` });
});

export default router;
