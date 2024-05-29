import express from 'express';
import { getCategoriesByType } from '../controllers/categoryControllers';

const categoryRouter = express.Router();

categoryRouter.route('/').get(getCategoriesByType);

export { categoryRouter };
