import express from 'express';
import {
	handleAddOrder,
	handleGetOrderIDsByUser,
	handleGetOrderItemIDsByOrder,
} from '../controllers/orderControllers';
import verifyJWT from '../middleware/verifyJWT';

const orderRouter = express.Router();

orderRouter
	.get('/orderItem', verifyJWT, handleGetOrderItemIDsByOrder)
	.route('/')
	.post(verifyJWT, handleAddOrder)
	.get(verifyJWT, handleGetOrderIDsByUser);

export { orderRouter };
