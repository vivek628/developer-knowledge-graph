import { Router } from 'express';
import {
  executeSafeGraphQuery,
  listSafeGraphQueries,
} from '../controllers/graphQueryController.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import {
  showCompleteGraph,
  showDeveloperGraph,
} from '../controllers/visualizationController.js';

const graphQueryRouter = Router();

graphQueryRouter.get('/network', asyncHandler(showCompleteGraph));
graphQueryRouter.get('/developers/:id', asyncHandler(showDeveloperGraph));
graphQueryRouter.get('/queries', listSafeGraphQueries);
graphQueryRouter.post('/query', asyncHandler(executeSafeGraphQuery));

export default graphQueryRouter;
