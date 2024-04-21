import { getOffersFromDB } from "../services/offerServices";

const handlegetOffers = async (req: any, res: any) => {
	const orderID = req.query.productID;
	console.log();
	try {
		const response = await getOffersFromDB(orderID);
		const offers = response.rows;
		res.status(200).json(offers);
	} catch (err) {
		res.status(500).json({ message: err });
	}
};

export { handlegetOffers };
