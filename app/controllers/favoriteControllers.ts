import { Request, Response } from "express";
import { addFavoritesLinkToDB } from "../services/favoriteServices";

const handleAddFavoritesLink = async (req: Request, res: Response) => {
	const productID = req.body.productID;
	const userID = req.body.userID;
	try {
		await addFavoritesLinkToDB(productID, userID);
		res.sendStatus(201);
	} catch (err) {
		res.status(500).json({ message: err });
	}
};

export { handleAddFavoritesLink };
