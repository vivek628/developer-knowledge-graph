import { Router } from 'express';
import {
  listProjects,
  listSkills,
  listTechnologies,
  showDashboard,
} from '../controllers/catalogController.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const projectRouter = Router();
export const skillRouter = Router();
export const technologyRouter = Router();
export const dashboardRouter = Router();

projectRouter.get('/', asyncHandler(listProjects));
skillRouter.get('/', asyncHandler(listSkills));
technologyRouter.get('/', asyncHandler(listTechnologies));
dashboardRouter.get('/', asyncHandler(showDashboard));
