import {
	addActivationKeyToOfferInDB,
	getActivationKeysByOfferLinkFromDB,
	getActivationKeysByOwnerLinkFromDB,
	getOwnerLinksFromDB,
	transferActivationTokenOwnership,
} from "../services/activationKeyServices";
import {
	addNewOfferLinkToDB,
	getOfferLinkByUserAndProduct,
} from "../services/offerServices";
import {
	addNewOnerLinkToDB,
	getOnerLinkByUserAndProduct,
	getOwnerActivatinKeyNumberFromDB,
} from "../services/ownerServices";
// export async function filterOwnersAsync(owners: any[]) {
// 	const ownerPromises = owners.map(async (owner) => {
// 		const activationKeyNumber = await getOwnerActivatinKeyNumberFromDB(
// 			owner.id
// 		);
// 		return {
// 			owner,
// 			isValid: activationKeyNumber.count != 0,
// 		};
// 	});
// 	const results = await Promise.all(ownerPromises);
// 	return results
// 		.filter((result) => result.isValid)
// 		.map((result) => result.owner);
// }

const handleGetOwnerLinks = async (req: any, res: any) => {
	const userID = req.id;
	try {
		const ownerLinks = await getOwnerLinksFromDB(userID);
		// const filteredOwners = await filterOwnersAsync(ownerLinks);
		res.status(200).json(ownerLinks);
	} catch (err) {
		res.status(500).json({ message: err });
		console.log(err);
	}
};

const handleGetActivationKeysByOwnerLink = async (req: any, res: any) => {
	const ownerID = req.query.ownerID;
	try {
		const activationKeys = await getActivationKeysByOwnerLinkFromDB(ownerID);
		res.status(200).json(activationKeys);
	} catch (err) {
		res.status(500).json({ message: err });
		console.log(err);
	}
};

const handleAddActivationKeyToOffer = async (req: any, res: any) => {
	const userID = req.id;
	const activationKeyID = req.body.activationKeyID;
	const productID = req.body.productID;

	try {
		let offerID = await getOfferLinkByUserAndProduct(userID, productID);
		if (!offerID) offerID = await addNewOfferLinkToDB(productID, userID, 0);
		await addActivationKeyToOfferInDB(offerID, activationKeyID);
		res.sendStatus(201);
	} catch (err) {
		res.status(500).json({ message: err });
		console.log(err);
	}
};

const handleAddActivationKeyToOwner = async (req: any, res: any) => {
	const userID = req.id;
	const activationKeyID = req.body.activationKeyID;
	const productID = req.body.productID;

	try {
		let ownerID = await getOnerLinkByUserAndProduct(userID, productID);
		if (!ownerID) ownerID = await addNewOnerLinkToDB(productID, userID);
		await transferActivationTokenOwnership(ownerID, activationKeyID);
		res.sendStatus(201);
	} catch (err) {
		res.status(500).json({ message: err });
		console.log(err);
	}
};

const handleGetActivationKeysByOfferLink = async (req: any, res: any) => {
	const offerID = req.query.offerID;
	console.log(offerID);
	try {
		const activationKeys = await getActivationKeysByOfferLinkFromDB(offerID);
		console.log(activationKeys);
		res.status(200).json(activationKeys);
	} catch (err) {
		res.status(500).json({ message: err });
		console.log(err);
	}
};

export {
	handleGetOwnerLinks,
	handleGetActivationKeysByOwnerLink,
	handleGetActivationKeysByOfferLink,
	handleAddActivationKeyToOffer,
	handleAddActivationKeyToOwner,
};
