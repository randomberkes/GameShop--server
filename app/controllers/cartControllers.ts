import {
	addCartLinkToDB,
	decrementCartLinkFromDB,
	deleteAllCartLinksByUserFromDB,
	deleteCartLinkFromDB,
	// getAmountOfCartLinkFromDB,
	getCartOffersByUserFromDB,
	getMaxAmountOfCartLinkFromDB,
	incrementCartLinkFromDB,
} from "../services/cartServices";

const handleAddCartLink = async (req: any, res: any) => {
	const offerID = req.body.offerID;
	const userID = req.id;
	try {
		await addCartLinkToDB(userID, offerID);
		res.sendStatus(201);
	} catch (err) {
		res.status(500).json({ message: err });
	}
};

const handleDeleteCartLink = async (req: any, res: any) => {
	const offerID = req.query.offerID;
	console.log(offerID);
	const userID = req.id;

	try {
		await deleteCartLinkFromDB(offerID, userID);
		res.sendStatus(204);
	} catch (err) {
		res.status(500).json({ message: err });
	}
};

const handleGetCartOffersByUser = async (req: any, res: any) => {
	const userID = req.id;
	try {
		const products = await getCartOffersByUserFromDB(userID);
		res.status(200).json(products);
	} catch (err) {
		res.status(500).json({ message: err });
	}
};

// const handleDeleteAllCartLinksByUser = async (req: any, res: any) => {
// 	const userID = req.id;

// 	try {
// 		await deleteAllCartLinksByUserFromDB(userID);
// 		res.sendStatus(204);
// 	} catch (err) {
// 		res.status(500).json({ message: err });
// 	}
// };

const handleGetMaxAmountOfCartLink = async (req: any, res: any) => {
	const offerID = req.query.offerID;
	const userID = req.id;

	try {
		const rows = await getMaxAmountOfCartLinkFromDB(offerID, userID);
		res.status(200).json(rows[0]);
	} catch (err) {
		res.status(500).json({ message: err });
	}
};

const handleIncrementCartLink = async (req: any, res: any) => {
	const offerID = req.query.offerID;
	const userID = req.id;
	console.log(req.query);
	try {
		const amount = await incrementCartLinkFromDB(offerID, userID);
		console.log(amount);
		res.status(202).json(amount);
	} catch (err) {
		res.status(500).json({ message: err });
	}
};

const handleDecrementCartLink = async (req: any, res: any) => {
	const offerID = req.query.offerID;
	const userID = req.id;
	try {
		const amount = await decrementCartLinkFromDB(offerID, userID);
		res.status(202).json(amount);
	} catch (err) {
		res.status(500).json({ message: err });
	}
};

export {
	handleAddCartLink,
	handleDeleteCartLink,
	handleGetCartOffersByUser,
	handleIncrementCartLink,
	handleDecrementCartLink,
	handleGetMaxAmountOfCartLink,
};
