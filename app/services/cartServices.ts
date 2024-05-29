import connectToDatabase from "../../db";

const addCartLinkToDB = async (userID: number, offerID: number) => {
	const response = await connectToDatabase(async (db) => {
		return await db.query("INSERT INTO cart VALUES ($1, $2, 1)", [
			userID,
			offerID,
		]);
	});
	const allUsers = response.rows;
	return allUsers;
};

const deleteCartLinkFromDB = async (offerID: number, userID: number) => {
	const response = await connectToDatabase(async (db) => {
		return await db.query(
			"DELETE FROM cart WHERE offer_id = $1 AND user_id = $2;",
			[offerID, userID]
		);
	});
	const allUsers = response.rows;
	return allUsers;
};

const getCartOffersByUserFromDB = async (userID: number) => {
	const response = await connectToDatabase(async (db) => {
		return await db.query(
			"SELECT users.name as username, offers.price, products.*, cart.amount, offers.id as offerID  FROM cart JOIN offers ON offers.id = cart.offer_id JOIN users ON users.id = offers.user_id JOIN products ON products.id = offers.product_id WHERE cart.user_id = $1",
			[userID]
		);
	});
	const allUsers = response.rows;
	return allUsers;
};

const deleteAllCartLinksByUserFromDB = async (userID: number) => {
	const response = await connectToDatabase(async (db) => {
		return await db.query("DELETE FROM cart WHERE user_id = $1;", [userID]);
	});
	const allUsers = response.rows;
	return allUsers;
};

const getMaxAmountOfCartLinkFromDB = async (
	offerID: number,
	userID: number
) => {
	const response = await connectToDatabase(async (db) => {
		return await db.query(
			"SELECT COUNT(*)  FROM cart JOIN offers ON cart.offer_id = offers.id JOIN activation_keys ON activation_keys.offer_id = offers.id WHERE cart.user_id = $1 AND offers.id = $2;",
			[userID, offerID]
		);
	});
	const allUsers = response.rows;
	return allUsers;
};

const incrementCartLinkFromDB = async (offerID: number, userID: number) => {
	const response = await connectToDatabase(async (db) => {
		return await db.query(
			"UPDATE cart SET amount=amount+1 WHERE offer_id = $1 AND user_id = $2 RETURNING amount;",
			[offerID, userID]
		);
	});
	const amount = response.rows[0];
	return amount;
};

const decrementCartLinkFromDB = async (offerID: number, userID: number) => {
	const response = await connectToDatabase(async (db) => {
		return await db.query(
			"UPDATE cart SET amount=amount-1 WHERE offer_id = $1 AND user_id = $2 RETURNING amount;",
			[offerID, userID]
		);
	});
	const amount = response.rows[0];
	return amount;
};

export {
	addCartLinkToDB,
	deleteCartLinkFromDB,
	getCartOffersByUserFromDB,
	incrementCartLinkFromDB,
	decrementCartLinkFromDB,
	getMaxAmountOfCartLinkFromDB,
	deleteAllCartLinksByUserFromDB,
};
