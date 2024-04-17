import express from "express";
import { handleAddFavoritesLink } from "../controllers/favoriteControllers";

const favoriteRouter = express.Router();

favoriteRouter.route("/").post(handleAddFavoritesLink);

export { favoriteRouter };
