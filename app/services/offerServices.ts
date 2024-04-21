import connectToDatabase from "../../db";

const getOffersFromDB = async (productID: number) => {
	const response = await connectToDatabase(async (db) => {
		return await db.query(
			"SELECT  DISTINCT users.name, activation_keys.price FROM activation_keys JOIN users ON users.id = activation_keys.user_id WHERE activation_keys.product_id = $1;",
			[productID]
		);
	});

	return response;
};

export { getOffersFromDB };
