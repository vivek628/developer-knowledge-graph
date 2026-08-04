import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import { corsOptions } from './config/cors.js';
import developerRouter from './routes/developerRoutes.js';
import graphQueryRouter from './routes/graphQueryRoutes.js';
import healthRouter from './routes/healthRoutes.js';
import {
  dashboardRouter,
  projectRouter,
  skillRouter,
  technologyRouter,
} from './routes/catalogRoutes.js';
import teamRouter from './routes/teamRoutes.js';
import { errorHandler, notFoundHandler } from './utils/errorHandlers.js';

const app = express();

// These are the only global middlewares the API currently needs. The size
// limit prevents accidentally accepting an unreasonably large JSON request.
app.disable('x-powered-by');
app.use(helmet());
app.use(cors(corsOptions));
app.use(express.json({ limit: '100kb' }));

app.get('/', (_request, response) => {
  response.json({
    name: 'Developer Knowledge Graph API',
    health: '/api/health',
  });
});

app.use('/api/health', healthRouter);
app.use('/api/developers', developerRouter);
app.use('/api/projects', projectRouter);
app.use('/api/skills', skillRouter);
app.use('/api/technologies', technologyRouter);
app.use('/api/dashboard', dashboardRouter);
app.use('/api/teams', teamRouter);
app.use('/api/graph', graphQueryRouter);

// Error middleware belongs last because it handles requests not completed by
// any route above it.
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
