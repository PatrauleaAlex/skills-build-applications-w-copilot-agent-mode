import { Router, Request, Response } from 'express';
import Workout from '../models/Workout';

const router = Router();

// GET all workouts
router.get('/', async (req: Request, res: Response) => {
  try {
    const workouts = await Workout.find().populate('userId');
    res.json({ message: 'Get all workouts', data: workouts });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch workouts' });
  }
});

// GET workout by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const workout = await Workout.findById(id).populate('userId');
    res.json({ message: `Get workout with ID ${id}`, data: workout });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch workout' });
  }
});

// POST create workout
router.post('/', async (req: Request, res: Response) => {
  try {
    const workout = new Workout(req.body);
    await workout.save();
    res.status(201).json({ message: 'Workout created', data: workout });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create workout' });
  }
});

// PUT update workout
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const workout = await Workout.findByIdAndUpdate(id, req.body, { new: true });
    res.json({ message: `Workout ${id} updated`, data: workout });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update workout' });
  }
});

// DELETE workout
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await Workout.findByIdAndDelete(id);
    res.status(204).json({ message: `Workout ${id} deleted` });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete workout' });
  }
});

// GET personalized workout suggestions for user
router.get('/suggestions/:userId', async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const userWorkouts = await Workout.find({ userId }).populate('userId');
    res.json({ message: `Get personalized workout suggestions for user ${userId}`, data: userWorkouts });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch workout suggestions' });
  }
});

export default router;
