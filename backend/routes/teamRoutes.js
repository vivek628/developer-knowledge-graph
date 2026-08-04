import { Router } from 'express';
import {
  listProjectTeams,
  listTeamRecommendations,
  showProjectTeam,
  storeProjectTeam,
} from '../controllers/catalogController.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const teamRouter = Router();

teamRouter.get('/recommend', asyncHandler(listTeamRecommendations));
teamRouter.get('/project-teams', asyncHandler(listProjectTeams));
teamRouter.post('/project-teams', asyncHandler(storeProjectTeam));
teamRouter.get('/project-teams/:id', asyncHandler(showProjectTeam));

export default teamRouter;
