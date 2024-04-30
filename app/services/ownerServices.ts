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
const getOwnerActivatinKeyNumberFromDB = async (offerID: number) => {
	const response = await connectToDatabase(async (db) => {
		return await db.query(
			"SELECT COUNT(*)  FROM owners JOIN activation_keys ON activation_keys.owner_id = owners.id WHERE owners.id = $1;",
			[offerID]
		);
	});
	const activationKeyNumber = response.rows[0];
	return activationKeyNumber;
};

const addNewOnerLinkToDB = async (productID: number, userID: number) => {
	await connectToDatabase(async (db) => {
		return await db.query(
			"INSERT INTO owners (product_id, user_id) VALUES ($1, $2);",
			[productID, userID]
		);
	});
};

export {
	getOnerLinkByUserAndProduct,
	addNewOnerLinkToDB,
	getOwnerActivatinKeyNumberFromDB,
};
