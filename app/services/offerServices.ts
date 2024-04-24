import connectToDatabase from "../../db";

const getOffersFromDB = async (productID: number) => {
	const response = await connectToDatabase(async (db) => {
		return await db.query(
			"SELECT users.name,offers.price, offers.id FROM users JOIN offers ON offers.user_id = users.id WHERE offers.product_id = $1;",
			[productID]
		);
	});
	const offers = response.rows;
	return offers;
};

const getOfferActivatinKeyNumberFromDB = async (offerID: number) => {
	const response = await connectToDatabase(async (db) => {
		return await db.query(
			"SELECT COUNT(*)  FROM offers JOIN activation_keys ON activation_keys.offer_id = offers.id WHERE offers.id = $1;",
			[offerID]
		);
	});
	const activationKeyNumber = response.rows[0];
	return activationKeyNumber;
};
export { getOffersFromDB, getOfferActivatinKeyNumberFromDB };
