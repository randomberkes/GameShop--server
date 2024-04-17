import express from "express";
import {
	handleAddFavoritesLink,
	handleDeleteFavoritesLink,
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
	);

export { favoriteRouter };
