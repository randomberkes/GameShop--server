import express from "express";
import {
	handleAddFavoritesLink,
	handleDeleteFavoritesLink,
	handleGetFavoritesProductsByUser,
} from "../controllers/favoriteControllers";
import verifyJWT from "../middleware/verifyJWT";
import verifyRoles from "../middleware/verifyRoles";
import ROLES_LIST from "../config/roles_list";

const favoriteRouter = express.Router();

favoriteRouter
	.route("/")
	.post(
		verifyJWT,
		verifyRoles(ROLES_LIST.Buyer, ROLES_LIST.Seller),
		handleAddFavoritesLink
	)
	.delete(
		verifyJWT,
		verifyRoles(ROLES_LIST.Buyer, ROLES_LIST.Seller),
		handleDeleteFavoritesLink
	)
	.get(
		verifyJWT,
		verifyRoles(ROLES_LIST.Buyer, ROLES_LIST.Seller),
		handleGetFavoritesProductsByUser
	);

export { favoriteRouter };
