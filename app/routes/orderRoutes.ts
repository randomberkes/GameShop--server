import express from "express";
import verifyJWT from "../middleware/verifyJWT";

import {
	handleAddOrder,
	handleGetOrderIDsByUser,
	handleGetOrderItemIDsByOrder,
} from "../controllers/orderControllers";

const orderRouter = express.Router();

orderRouter
	.get(
		"/orderItem",
		verifyJWT,

		handleGetOrderItemIDsByOrder
	)
	.route("/")
	.post(
		verifyJWT,

		handleAddOrder
	)
	.get(
		verifyJWT,

		handleGetOrderIDsByUser
	);

export { orderRouter };
