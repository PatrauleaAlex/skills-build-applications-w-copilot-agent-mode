import { Router, Request, Response } from 'express';
import Activity from '../models/Activity';

const router = Router();

// GET all activities
router.get('/', async (req: Request, res: Response) => {
  try {
    const activities = await Activity.find().populate('userId');
    res.json({ message: 'Get all activities', data: activities });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch activities' });
  }
});

// GET activity by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const activity = await Activity.findById(id).populate('userId');
    res.json({ message: `Get activity with ID ${id}`, data: activity });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch activity' });
  }
});

// POST create activity
router.post('/', async (req: Request, res: Response) => {
  try {
    const activity = new Activity(req.body);
    await activity.save();
    res.status(201).json({ message: 'Activity created', data: activity });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create activity' });
  }
});

// PUT update activity
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const activity = await Activity.findByIdAndUpdate(id, req.body, { new: true });
    res.json({ message: `Activity ${id} updated`, data: activity });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update activity' });
  }
});

// DELETE activity
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await Activity.findByIdAndDelete(id);
    res.status(204).json({ message: `Activity ${id} deleted` });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete activity' });
  }
});

export default router;
