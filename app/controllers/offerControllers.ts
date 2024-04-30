import {
	getOfferActivatinKeyNumberFromDB,
	getOffersByUserFromDB,
	getOffersFromDB,
} from "../services/offerServices";

// export async function filterOffersWithOfferIDAsync(offers: any[]) {
// 	const offerPromises = offers.map(async (offer) => {
// 		const activationKeyNumber = await getOfferActivatinKeyNumberFromDB(
// 			offer.offerID
// 		);
// 		return {
// 			offer,
// 			isValid: activationKeyNumber.count != 0,
// 		};
// 	});
// 	const results = await Promise.all(offerPromises);
// 	return results
// 		.filter((result) => result.isValid)
// 		.map((result) => result.offer);
// }

const handlegetOffers = async (req: any, res: any) => {
	const orderID = req.query.productID;
	console.log();
	try {
		const offers = await getOffersFromDB(orderID);
		// const filteredOffers = await filterOffersAsync(offers);
		res.status(200).json(offers);
	} catch (err) {
		res.status(500).json({ message: err });
	}
};

const handleGetOffersByUser = async (req: any, res: any) => {
	const userID = req.id;
	console.log();
	try {
		const offers = await getOffersByUserFromDB(userID);
		// const filteredOffers = await filterOffersWithOfferIDAsync(offers);
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

export {
	handlegetOffers,
	handleGetOfferActivatinKeyNumber,
	handleGetOffersByUser,
};
