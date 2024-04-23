import connectToDatabase from "../../db";

const addFavoritesLinkToDB = async (offerID: number, userID: number) => {
	const response = await connectToDatabase(async (db) => {
		return await db.query("INSERT INTO favorites VALUES ($1, $2)", [
			userID,
			offerID,
		]);
	});
	const allUsers = response.rows;
	return allUsers;
};

const deleteFavoritesLinkFromDB = async (offerID: number, userID: number) => {
	const response = await connectToDatabase(async (db) => {
		return await db.query(
			"DELETE FROM favorites WHERE offer_id = $1 AND user_id = $2;",
			[offerID, userID]
		);
	});
	const allUsers = response.rows;
	return allUsers;
};

const getFavoritesProductsByUserFromDB = async (userID: number) => {
	const response = await connectToDatabase(async (db) => {
		return await db.query(
			"SELECT users.name as username, products.*, offers.price, offers.id as offerID FROM favorites JOIN offers ON offers.id = favorites.offer_id JOIN users ON users.id = offers.user_id JOIN products ON products.id = offers.product_id WHERE favorites.user_id = $1",
			[userID]
		);
	});
	const allUsers = response.rows;
	return allUsers;
};

export {
	addFavoritesLinkToDB,
	deleteFavoritesLinkFromDB,
	getFavoritesProductsByUserFromDB,
};
