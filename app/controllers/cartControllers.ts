import {
	addCartLinkToDB,
	decrementCartLinkFromDB,
	deleteCartLinkFromDB,
	getAmountOfCartLinkFromDB,
	getCartProductsByUserFromDB,
	incrementCartLinkFromDB,
} from "../services/cartServices";

const handleAddCartLink = async (req: any, res: any) => {
	const productID = req.body.productID;
	const userID = req.id;
	try {
		await addCartLinkToDB(productID, userID);
		res.sendStatus(201);
	} catch (err) {
		res.status(500).json({ message: err });
	}
};

const handleDeleteCartLink = async (req: any, res: any) => {
	const productID = req.query.productID;
	const userID = req.id;

	try {
		await deleteCartLinkFromDB(productID, userID);
		res.sendStatus(204);
	} catch (err) {
		res.status(500).json({ message: err });
	}
};

const handleGetAmountOfCartLink = async (req: any, res: any) => {
	const productID = req.query.productID;
	const userID = req.id;

	try {
		const rows = await getAmountOfCartLinkFromDB(productID, userID);
		res.status(200).json(rows[0]);
	} catch (err) {
		res.status(500).json({ message: err });
	}
};

const handleIncrementCartLink = async (req: any, res: any) => {
	const productID = req.query.productID;
	const userID = req.id;
	console.log(req.query);
	try {
		console.log("HIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII");

		await incrementCartLinkFromDB(productID, userID);
		res.sendStatus(204);
	} catch (err) {
		res.status(500).json({ message: err });
	}
};

const handleDecrementCartLink = async (req: any, res: any) => {
	const productID = req.query.productID;
	const userID = req.id;

	try {
		await decrementCartLinkFromDB(productID, userID);
		res.sendStatus(204);
	} catch (err) {
		res.status(500).json({ message: err });
	}
};

const handleGetCartProductsByUser = async (req: any, res: any) => {
	const userID = req.id;
	try {
		const products = await getCartProductsByUserFromDB(userID);
		res.status(200).json(products);
	} catch (err) {
		res.status(500).json({ message: err });
	}
};

export {
	handleAddCartLink,
	handleDeleteCartLink,
	handleGetCartProductsByUser,
	handleIncrementCartLink,
	handleDecrementCartLink,
	handleGetAmountOfCartLink,
};
