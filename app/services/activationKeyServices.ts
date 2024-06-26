import connectToDatabase from "../../db";

const getActivationKeysByOwnerLinkFromDB = async (ownerID: any) => {
	const response = await connectToDatabase(async (db) => {
		return await db.query(
			"SELECT id, activation_key FROM activation_keys WHERE owner_id = $1;",
			[ownerID]
		);
	});
	const activationKeys = response.rows.map((row: any) => {
		return { id: row.id, activationKey: row.activation_key };
	});
	return activationKeys;
};

const getActivationKeysByOfferLinkFromDB = async (offerID: any) => {
	const response = await connectToDatabase(async (db) => {
		return await db.query(
			"SELECT id, activation_key FROM activation_keys WHERE offer_id = $1;",
			[offerID]
		);
	});
	const activationKeys = response.rows.map((row: any) => {
		return { id: row.id, activationKey: row.activation_key };
	});
	return activationKeys;
};

const getOwnerLinksFromDB = async (userID: number) => {
	const response = await connectToDatabase(async (db) => {
		return await db.query(
			"SELECT DISTINCT owners.id, product_id FROM owners JOIN activation_keys ON activation_keys.owner_id = owners.id WHERE user_id = $1;",
			[userID]
		);
	});
	const ownerLink = response.rows.map(
		(ownerLink: { id: any; product_id: any }) => {
			return { id: ownerLink.id, productID: ownerLink.product_id };
		}
	);
	return ownerLink;
};

const addActivationKeyToOfferInDB = async (
	offerID: number,
	activationKeyID: number
) => {
	const response = await connectToDatabase(async (db) => {
		return await db.query(
			"UPDATE activation_keys SET offer_id=$1, owner_id=null WHERE id=$2;",
			[offerID, activationKeyID]
		);
	});
};

const addNewActivationKeyToOfferInDB = async (
	offerID: number,
	activationKey: number
) => {
	const response = await connectToDatabase(async (db) => {
		return await db.query(
			"INSERT INTO activation_keys (offer_id, activation_key) VALUES ($1, $2);",
			[offerID, activationKey]
		);
	});
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

export {
	getActivationKeysByOwnerLinkFromDB,
	getOwnerLinksFromDB,
	getActivationKeysByOfferLinkFromDB,
	addActivationKeyToOfferInDB,
	transferActivationTokenOwnership,
	addNewActivationKeyToOfferInDB,
};
