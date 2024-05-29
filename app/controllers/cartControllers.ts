import {
	addCartLinkToDB,
	decrementCartLinkFromDB,
	deleteCartLinkFromDB,
	getCartOffersByUserFromDB,
	getMaxAmountOfCartLinkFromDB,
	incrementCartLinkFromDB,
} from '../services/cartServices';

const handleAddCartLink = async (req: any, res: any) => {
	const offerID = req.body.offerID;
	const userID = req.id;
	try {
		await addCartLinkToDB(userID, offerID);
		res.sendStatus(201);
	} catch (err: any) {
		res.status(500).json({ message: err.message });
	}
};

const handleDeleteCartLink = async (req: any, res: any) => {
	const offerID = req.query.offerID;
	const userID = req.id;

	try {
		await deleteCartLinkFromDB(offerID, userID);
		res.sendStatus(204);
	} catch (err: any) {
		res.status(500).json({ message: err.message });
	}
};

const handleGetCartOffersByUser = async (req: any, res: any) => {
	const userID = req.id;
	try {
		const products = await getCartOffersByUserFromDB(userID);
		res.status(200).json(products);
	} catch (err: any) {
		res.status(500).json({ message: err.message });
	}
};

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
	try {
		const amount = await incrementCartLinkFromDB(offerID, userID);
		res.status(202).json(amount);
	} catch (err: any) {
		res.status(500).json({ message: err.message });
	}
};

const handleDecrementCartLink = async (req: any, res: any) => {
	const offerID = req.query.offerID;
	const userID = req.id;
	try {
		const amount = await decrementCartLinkFromDB(offerID, userID);
		res.status(202).json(amount);
	} catch (err: any) {
		res.status(500).json({ message: err.message });
	}
};

export {
	handleAddCartLink,
	handleDecrementCartLink,
	handleDeleteCartLink,
	handleGetCartOffersByUser,
	handleGetMaxAmountOfCartLink,
	handleIncrementCartLink,
};
