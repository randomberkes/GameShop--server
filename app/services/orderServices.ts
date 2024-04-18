import connectToDatabase from "../../db";

const addNewOrderToDB = async (price: number, userID: number) => {
	const response = await connectToDatabase(async (db) => {
		return await db.query(
			"INSERT INTO orders (price, user_id) VALUES ($1, $2) RETURNING id;",
			[price, userID]
		);
	});
	const orderID = response.rows[0].id;
	return orderID;
};

const addOrderItemLinkToDB = async (
	orderID: number,
	amount: number,
	productID: number
) => {
	await connectToDatabase(async (db) => {
		return await db.query("INSERT INTO order_items VALUES ($1, $2, $3);", [
			orderID,
			amount,
			productID,
		]);
	});
};

export { addNewOrderToDB, addOrderItemLinkToDB };
