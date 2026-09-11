import { Router, Request, Response } from 'express';
import Leaderboard from '../models/Leaderboard';

const router = Router();

// GET leaderboard (all users ranked)
router.get('/', async (req: Request, res: Response) => {
  try {
    const leaderboard = await Leaderboard.find().sort({ rank: 1 }).populate('userId').populate('teamId');
    res.json({ message: 'Get leaderboard', data: leaderboard });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch leaderboard' });
  }
});

// GET leaderboard by team
router.get('/team/:teamId', async (req: Request, res: Response) => {
  try {
    const { teamId } = req.params;
    const leaderboard = await Leaderboard.find({ teamId }).sort({ rank: 1 }).populate('userId');
    res.json({ message: `Get leaderboard for team ${teamId}`, data: leaderboard });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch team leaderboard' });
  }
});

// GET user ranking
router.get('/user/:userId', async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const ranking = await Leaderboard.findOne({ userId }).populate('userId').populate('teamId');
    res.json({ message: `Get ranking for user ${userId}`, data: ranking });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user ranking' });
  }
});

export default router;
