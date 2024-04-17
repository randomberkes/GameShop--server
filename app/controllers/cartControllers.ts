import {
	addCartLinkToDB,
	deleteCartLinkFromDB,
	getCartProductsByUserFromDB,
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

const handleGetCartProductsByUser = async (req: any, res: any) => {
	const userID = req.id;
	try {
		const products = await getCartProductsByUserFromDB(userID);
		res.status(200).json(products);
	} catch (err) {
		res.status(500).json({ message: err });
	}
};

export { handleAddCartLink, handleDeleteCartLink, handleGetCartProductsByUser };
