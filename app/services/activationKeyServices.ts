import connectToDatabase from "../../db";

const getActivationKeysByUserFromDB = async (
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

const getOwnerLinksFromDB = async (userID: number) => {
	const response = await connectToDatabase(async (db) => {
		return await db.query(
			"SELECT id, product_id FROM owners WHERE user_id = $1;",
			[userID]
		);
	});
	const ownerLink = response.rows.map(
		(ownerLink: { id: any; productID: any }) => {
			return { id: ownerLink.id, productID: ownerLink.productID };
		}
	);
	return ownerLink;
};

export { getActivationKeysByUserFromDB, getOwnerLinksFromDB };
