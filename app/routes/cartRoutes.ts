import express from "express";
import verifyJWT from "../middleware/verifyJWT";
import verifyRoles from "../middleware/verifyRoles";
import ROLES_LIST from "../config/roles_list";
import {
	handleAddCartLink,
	handleDecrementCartLink,
	handleDeleteCartLink,
	handleGetAmountOfCartLink,
	handleGetCartProductsByUser,
	handleIncrementCartLink,
} from "../controllers/cartControllers";

const cartRouter = express.Router();
const amountRouter = express.Router();
// const deleteAllRouter = express.Router();

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

const increment = amountRouter.get(
	"/increment",
	verifyJWT,
	verifyRoles(ROLES_LIST.Buyer, ROLES_LIST.Seller),
	handleIncrementCartLink
);
const decrement = amountRouter.get(
	"/decrement",
	verifyJWT,
	verifyRoles(ROLES_LIST.Buyer, ROLES_LIST.Seller),
	handleDecrementCartLink
);

const amount = amountRouter.get(
	"/amount",
	verifyJWT,
	verifyRoles(ROLES_LIST.Buyer, ROLES_LIST.Seller),
	handleGetAmountOfCartLink
);

export { cartRouter, increment, decrement };
