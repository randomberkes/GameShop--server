import { Request, Response } from "express";
import {
	addFavoritesLinkToDB,
	deleteFavoritesLinkFromDB,
	getFavoritesProductsByUserFromDB,
} from "../services/favoriteServices";

const handleAddFavoritesLink = async (req: any, res: any) => {
	const offerID = req.body.offerID;
	const userID = req.id;
	try {
		await addFavoritesLinkToDB(offerID, userID);
		res.sendStatus(201);
	} catch (err) {
		res.status(500).json({ message: err });
	}
};

const handleDeleteFavoritesLink = async (req: any, res: any) => {
	const offerID = req.query.offerID;
	const userID = req.id;

	try {
		await deleteFavoritesLinkFromDB(offerID, userID);
		res.sendStatus(204);
	} catch (err) {
		res.status(500).json({ message: err });
	}
};

const handleGetFavoritesProductsByUser = async (req: any, res: any) => {
	const userID = req.id;
	try {
		const products = await getFavoritesProductsByUserFromDB(userID);
		res.status(200).json(products);
	} catch (err) {
		res.status(500).json({ message: err });
	}
};

export {
	handleAddFavoritesLink,
	handleDeleteFavoritesLink,
	handleGetFavoritesProductsByUser,
};
