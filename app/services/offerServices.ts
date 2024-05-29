import connectToDatabase from "../../db";
export const mapDataToProduct = (data: any) => {
	return {
		id: data.id,
		name: data.name,
		platform: data.platform,
		gameDeviceCompatibility: data.game_device_compatibility,
		gameType: data.game_type,
		ratingPegi: data.rating_pegi,
		numberOfPlayers: data.number_of_players,
		descriptions: data.description,
		price: data.price,
		imgPath: data.img_path,
	};
};

const getOffersFromDB = async (productID: number) => {
	const response = await connectToDatabase(async (db) => {
		return await db.query(
			"SELECT DISTINCT users.name,offers.price, offers.id FROM users JOIN offers ON offers.user_id = users.id JOIN activation_keys ON activation_keys.offer_id = offers.id WHERE offers.product_id = $1 AND offers.price != 0;",
			[productID]
		);
	});
	const offers = response.rows;
	return offers;
};

const updateOfferPriceInDB = async (offerID: number, newPrice: number) => {
	await connectToDatabase(async (db) => {
		return await db.query("UPDATE offers SET price = $1 WHERE id = $2;", [
			newPrice,
			offerID,
		]);
	});
};

const getOffersByUserFromDB = async (userID: number) => {
	const response = await connectToDatabase(async (db) => {
		return await db.query(
			"SELECT DISTINCT offers.id as offerID, offers.price, products.* FROM offers JOIN products ON offers.product_id = products.id JOIN activation_keys ON activation_keys.offer_id = offers.id WHERE offers.user_id = $1;",
			[userID]
		);
	});
	const offers = response.rows
		.map(mapDataToProduct)
		.map((product: any, index: any) => {
			return {
				offerID: response.rows[index].offerid,
				price: response.rows[index].price,
				...product,
			};
		});
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

const addNewOfferLinkToDB = async (
	productID: number,
	userID: number,
	price: number
) => {
	const response = await connectToDatabase(async (db) => {
		return await db.query(
			"INSERT INTO offers (product_id, user_id, price) VALUES ($1, $2, $3) RETURNING id;",
			[productID, userID, price]
		);
	});
	const offerLinkID = response.rows[0].id;
	return offerLinkID;
};

const getOfferLinkByUserAndProduct = async (
	userID: number,
	productID: number
) => {
	const respone = await connectToDatabase(async (db) => {
		return await db.query(
			"SELECT id FROM offers WHERE user_id = $1 AND product_id = $2;",
			[userID, productID]
		);
	});
	if (respone.rows.length === 0) {
		return false;
	}
	const offerLinkID = respone.rows[0].id;
	return offerLinkID;
};
export {
	getOffersFromDB,
	getOfferActivatinKeyNumberFromDB,
	getOffersByUserFromDB,
	addNewOfferLinkToDB,
	getOfferLinkByUserAndProduct,
	updateOfferPriceInDB,
};
