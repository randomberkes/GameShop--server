import express from "express";
import verifyJWT from "../middleware/verifyJWT";
import verifyRoles from "../middleware/verifyRoles";
import ROLES_LIST from "../config/roles_list";
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
		verifyRoles(ROLES_LIST.Buyer, ROLES_LIST.Seller),
		handleGetOrderItemIDsByOrder
	)
	.route("/")
	.post(
		verifyJWT,
		verifyRoles(ROLES_LIST.Buyer, ROLES_LIST.Seller),
		handleAddOrder
	)
	.get(
		verifyJWT,
		verifyRoles(ROLES_LIST.Buyer, ROLES_LIST.Seller),
		handleGetOrderIDsByUser
	);

export { orderRouter };
