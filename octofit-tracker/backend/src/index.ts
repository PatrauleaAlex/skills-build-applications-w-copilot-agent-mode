import express, { Express, Request, Response } from 'express';
import './config/database';
import usersRouter from './routes/users';
import teamsRouter from './routes/teams';
import activitiesRouter from './routes/activities';
import leaderboardRouter from './routes/leaderboard';
import workoutsRouter from './routes/workouts';

const app: Express = express();
const PORT = process.env.PORT || 8000;

// Get API URL based on Codespaces environment
const getApiUrl = (): string => {
  if (process.env.CODESPACE_NAME) {
    return `https://${process.env.CODESPACE_NAME}-8000.app.github.dev`;
  }
  return `http://localhost:${PORT}`;
};

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS middleware for frontend communication
app.use((req: Request, res: Response, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

// Health check endpoint
app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'OK',
    message: 'OctoFit Tracker API is running',
    apiUrl: getApiUrl()
  });
});

// API Routes
app.use('/api/users', usersRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/activities', activitiesRouter);
app.use('/api/leaderboard', leaderboardRouter);
app.use('/api/workouts', workoutsRouter);

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: 'Route not found', path: req.path });
});

// Start server
app.listen(PORT, () => {
  const apiUrl = getApiUrl();
  console.log(`🚀 OctoFit Tracker API Server`);
  console.log(`📍 Running on port ${PORT}`);
  console.log(`🌐 API URL: ${apiUrl}`);
  console.log(`💪 Health check: ${apiUrl}/api/health`);
});
