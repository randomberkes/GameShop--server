import {
	getOfferActivatinKeyNumberFromDB,
	getOffersByUserFromDB,
	getOffersFromDB,
	updateOfferPriceInDB,
} from '../services/offerServices';

const handlegetOffers = async (req: any, res: any) => {
	const orderID = req.query.productID;
	try {
		const offers = await getOffersFromDB(orderID);
		res.status(200).json(offers);
	} catch (err) {
		res.status(500).json({ message: err });
	}
};

const handleGetOffersByUser = async (req: any, res: any) => {
	const userID = req.id;
	try {
		const offers = await getOffersByUserFromDB(userID);
		res.status(200).json(offers);
	} catch (err) {
		res.status(500).json({ message: err });
	}
};

const handleGetOfferActivatinKeyNumber = async (req: any, res: any) => {
	const offerID = req.query.offerID;

	try {
		const activationKeyNumber = await getOfferActivatinKeyNumberFromDB(offerID);
		res.status(200).json(activationKeyNumber);
	} catch (err) {
		res.status(500).json({ message: err });
	}
};

const handleUpdateOfferPrice = async (req: any, res: any) => {
	const offerID = req.body.offerID;
	const newPrice = req.body.newPrice;
	try {
		await updateOfferPriceInDB(offerID, newPrice);
		res.sendStatus(200);
	} catch (err) {
		res.status(500).json({ message: err });
	}
};

export {
	handleGetOfferActivatinKeyNumber,
	handleGetOffersByUser,
	handleUpdateOfferPrice,
	handlegetOffers,
};
