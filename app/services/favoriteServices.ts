import connectToDatabase from "../../db";

const addFavoritesLinkToDB = async (productID: number, userID: number) => {
	const response = await connectToDatabase(async (db) => {
		return await db.query("INSERT INTO favorites VALUES ($1, $2)", [
			productID,
			userID,
		]);
	});
	const allUsers = response.rows;
	return allUsers;
};

const deleteFavoritesLinkFromDB = async (productID: number, userID: number) => {
	const response = await connectToDatabase(async (db) => {
		return await db.query(
			"DELETE FROM favorites WHERE product_id = $1 AND user_id = $2;",
			[productID, userID]
		);
	});
	const allUsers = response.rows;
	return allUsers;
};

export { addFavoritesLinkToDB, deleteFavoritesLinkFromDB };
