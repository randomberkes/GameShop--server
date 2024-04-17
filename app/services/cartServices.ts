import connectToDatabase from "../../db";

const addCartLinkToDB = async (productID: number, userID: number) => {
	const response = await connectToDatabase(async (db) => {
		return await db.query("INSERT INTO cart VALUES ($1, $2)", [
			productID,
			userID,
		]);
	});
	const allUsers = response.rows;
	return allUsers;
};

const deleteCartLinkFromDB = async (productID: number, userID: number) => {
	const response = await connectToDatabase(async (db) => {
		return await db.query(
			"DELETE FROM cart WHERE product_id = $1 AND user_id = $2;",
			[productID, userID]
		);
	});
	const allUsers = response.rows;
	return allUsers;
};

const getCartProductsByUserFromDB = async (userID: number) => {
	const response = await connectToDatabase(async (db) => {
		return await db.query(
			"SELECT products.* FROM cart JOIN users ON users.id = cart.user_id JOIN products ON products.id = cart.product_id WHERE user_id = $1;",
			[userID]
		);
	});
	const allUsers = response.rows;
	return allUsers;
};

export { addCartLinkToDB, deleteCartLinkFromDB, getCartProductsByUserFromDB };
