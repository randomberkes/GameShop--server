import {
	getOfferActivatinKeyNumberFromDB,
	getOffersFromDB,
} from "../services/offerServices";

const handlegetOffers = async (req: any, res: any) => {
	const orderID = req.query.productID;
	console.log();
	try {
		const offers = await getOffersFromDB(orderID);
		// let filteredOffers;
		// filterOffersAsync(offers).then((filteredOffers) => {
		// 	filteredOffers = filteredOffers;
		// });
		// const filteredOffers = offers.filter(async (offer: any) => {
		// 	const activationKeyNumber = await getOfferActivatinKeyNumberFromDB(
		// 		offer.id
		// 	);
		// 	console.log(activationKeyNumber);
		// 	console.log(activationKeyNumber.count != 0);
		// 	return activationKeyNumber.count != 0;
		// });
		// console.log(filteredOffers);
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

export { handlegetOffers, handleGetOfferActivatinKeyNumber };
