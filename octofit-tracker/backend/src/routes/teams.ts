import { Router, Request, Response } from 'express';

const router = Router();

// GET all teams
router.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Get all teams', data: [] });
});

// GET team by ID
router.get('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({ message: `Get team with ID ${id}`, data: null });
});

// POST create team
router.post('/', (req: Request, res: Response) => {
  res.status(201).json({ message: 'Team created', data: req.body });
});

// PUT update team
router.put('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({ message: `Team ${id} updated`, data: req.body });
});

// DELETE team
router.delete('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  res.status(204).json({ message: `Team ${id} deleted` });
});

export default router;
