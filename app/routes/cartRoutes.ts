import express from "express";
import verifyJWT from "../middleware/verifyJWT";
import verifyRoles from "../middleware/verifyRoles";
import ROLES_LIST from "../config/roles_list";
import {
	handleAddCartLink,
	handleDeleteCartLink,
	handleGetCartProductsByUser,
} from "../controllers/cartControllers";

const cartRouter = express.Router();

cartRouter
	.route("/")
	.post(
		verifyJWT,
		verifyRoles(ROLES_LIST.Buyer, ROLES_LIST.Seller),
		handleAddCartLink
	)
	.delete(
		verifyJWT,
		verifyRoles(ROLES_LIST.Buyer, ROLES_LIST.Seller),
		handleDeleteCartLink
	)
	.get(
		verifyJWT,
		verifyRoles(ROLES_LIST.Buyer, ROLES_LIST.Seller),
		handleGetCartProductsByUser
	);

export { cartRouter };
