import connectToDatabase from "../../db";

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
	if (respone.rows.length === 0) {
		return false;
	}
	const onerLinkID = respone.rows[0].id;
	return onerLinkID;
};

const addNewOnerLinkToDB = async (productID: number, userID: number) => {
	await connectToDatabase(async (db) => {
		return await db.query(
			"INSERT INTO owners (product_id, user_id) VALUES ($1, $2);",
			[productID, userID]
		);
	});
};

export { getOnerLinkByUserAndProduct, addNewOnerLinkToDB };
