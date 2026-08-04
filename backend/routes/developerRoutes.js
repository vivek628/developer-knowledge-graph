import { Router } from 'express';
import {
  listDeveloperSkillGaps,
  listDevelopers,
  listReviewerRecommendations,
  showDeveloper,
  showDeveloperNetwork,
} from '../controllers/developerController.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const developerRouter = Router();

developerRouter.get('/', asyncHandler(listDevelopers));
developerRouter.get('/:id/network', asyncHandler(showDeveloperNetwork));
developerRouter.get('/:id/recommend-reviewers', asyncHandler(listReviewerRecommendations));
developerRouter.get('/:id/skill-gaps', asyncHandler(listDeveloperSkillGaps));
developerRouter.get('/:id', asyncHandler(showDeveloper));

export default developerRouter;
