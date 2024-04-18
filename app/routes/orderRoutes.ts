import express from "express";
import verifyJWT from "../middleware/verifyJWT";
import verifyRoles from "../middleware/verifyRoles";
import ROLES_LIST from "../config/roles_list";
import { handleAddOrder } from "../controllers/orderControllers";

const orderRouter = express.Router();

orderRouter
	.route("/")
	.post(
		verifyJWT,
		verifyRoles(ROLES_LIST.Buyer, ROLES_LIST.Seller),
		handleAddOrder
	);

export { orderRouter };
