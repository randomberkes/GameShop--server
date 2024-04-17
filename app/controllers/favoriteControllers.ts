import { Request, Response } from "express";
import {
	addFavoritesLinkToDB,
	deleteFavoritesLinkFromDB,
} from "../services/favoriteServices";

const handleAddFavoritesLink = async (req: any, res: any) => {
	const productID = req.body.productID;
	const userID = req.id;
	try {
		await addFavoritesLinkToDB(productID, userID);
		res.sendStatus(201);
	} catch (err) {
		res.status(500).json({ message: err });
	}
};

const handleDeleteFavoritesLink = async (req: any, res: any) => {
	const productID = req.body.productID;
	const userID = req.id;
	try {
		await deleteFavoritesLinkFromDB(productID, userID);
		res.sendStatus(204);
	} catch (err) {
		res.status(500).json({ message: err });
	}
};

export { handleAddFavoritesLink, handleDeleteFavoritesLink };
