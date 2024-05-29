import express from "express";
import {
	handleAddFavoritesLink,
	handleDeleteFavoritesLink,
	handleGetFavoritesProductsByUser,
} from "../controllers/favoriteControllers";
import verifyJWT from "../middleware/verifyJWT";

const favoriteRouter = express.Router();

favoriteRouter
	.route("/")
	.post(verifyJWT, handleAddFavoritesLink)
	.delete(verifyJWT, handleDeleteFavoritesLink)
	.get(verifyJWT, handleGetFavoritesProductsByUser);

export { favoriteRouter };
