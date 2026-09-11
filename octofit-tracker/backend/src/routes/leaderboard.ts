import { Router, Request, Response } from 'express';

const router = Router();

// GET leaderboard (all users ranked)
router.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Get leaderboard', data: [] });
});

// GET leaderboard by team
router.get('/team/:teamId', (req: Request, res: Response) => {
  const { teamId } = req.params;
  res.json({ message: `Get leaderboard for team ${teamId}`, data: [] });
});

// GET user ranking
router.get('/user/:userId', (req: Request, res: Response) => {
  const { userId } = req.params;
  res.json({ message: `Get ranking for user ${userId}`, data: null });
});

export default router;
