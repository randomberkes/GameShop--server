import { getOwnerLinksFromDB } from "../services/activationKeyServices";

const handleGetOwnerLinks = async (req: any, res: any) => {
	const userID = req.id;
	try {
		const orderID = await getOwnerLinksFromDB(userID);
		res.status(200).json(orderID);
	} catch (err) {
		res.status(500).json({ message: err });
		console.log(err);
	}
};

export { handleGetOwnerLinks };
