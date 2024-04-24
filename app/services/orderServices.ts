import connectToDatabase from "../../db";

const addNewOrderToDB = async (price: number, userID: number) => {
	const response = await connectToDatabase(async (db) => {
		return await db.query(
			"INSERT INTO orders (price, user_id) VALUES ($1, $2) RETURNING id;",
			[price, userID]
		);
	});
	console.log(response.rows);
	const orderID = response.rows[0].id;
	return orderID;
};

const addNewOnerLinkToDB = async (productID: number, userID: number) => {
	const response = await connectToDatabase(async (db) => {
		return await db.query(
			"INSERT INTO owners (product_id, user_id) VALUES ($1, $2);",
			[productID, userID]
		);
	});
};

const getActivationKeyIDsByOfferIDFromDB = async (offerID: number) => {
	const response = await connectToDatabase(async (db) => {
		return await db.query(
			"SELECT id from activation_keys WHERE offer_id=$1; ",
			[offerID]
		);
	});
	const activationKeyIDs = response.rows;
	return activationKeyIDs;
};

const transferActivationTokenOwnership = async (
	userID: number,
	activationKeyID: number
) => {
	const response = await connectToDatabase(async (db) => {
		return await db.query(
			"UPDATE activation_keys SET offer_id=null, owner_id=$1 WHERE id=$2;",
			[userID, activationKeyID]
		);
	});
	const orderIDs = response;
	return orderIDs;
};

const getOnerLinkByUserAndProduct = async (
	userID: number,
	productID: number
) => {
	const respone = await connectToDatabase(async (db) => {
		return await db.query(
			"SELECT id FROM owners WHERE user_id = $1 AND product_id = $2;",
			[userID, productID]
		);
	});
	const onerLinkID = respone.rows[0].id;
	return onerLinkID;
};

const addOrderItemLinkToDB = async (
	offerID: number,
	orderID: number,
	amount: number
) => {
	await connectToDatabase(async (db) => {
		return await db.query(
			"INSERT INTO order_items (offer_id, order_id, amount) VALUES ($1, $2, $3);",
			[offerID, orderID, amount]
		);
	});
};

export {
	addNewOrderToDB,
	addOrderItemLinkToDB,
	getActivationKeyIDsByOfferIDFromDB,
	transferActivationTokenOwnership,
	addNewOnerLinkToDB,
	getOnerLinkByUserAndProduct,
};
