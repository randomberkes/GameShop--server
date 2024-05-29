import express from 'express';
import verifyJWT from '../middleware/verifyJWT';

import {
	handleAddCartLink,
	handleDecrementCartLink,
	handleDeleteCartLink,
	handleGetCartOffersByUser,
	handleIncrementCartLink,
} from '../controllers/cartControllers';

const cartRouter = express.Router();
const amountRouter = express.Router();

cartRouter
	.route('/')
	.post(verifyJWT, handleAddCartLink)
	.delete(verifyJWT, handleDeleteCartLink)
	.get(verifyJWT, handleGetCartOffersByUser);

const increment = amountRouter.get(
	'/increment',
	verifyJWT,
	handleIncrementCartLink
);
const decrement = amountRouter.get(
	'/decrement',
	verifyJWT,
	handleDecrementCartLink
);

export { cartRouter, decrement, increment };
