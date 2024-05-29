import express from 'express';
import { getAllCategoryTypes } from '../controllers/categoryTypeController';

const categoryTypeRouter = express.Router();

categoryTypeRouter.route('/').get(getAllCategoryTypes);

export { categoryTypeRouter };
