import {
	addActivationKeyToOfferInDB,
	addNewActivationKeyToOfferInDB,
	getActivationKeysByOfferLinkFromDB,
	getActivationKeysByOwnerLinkFromDB,
	getOwnerLinksFromDB,
	transferActivationTokenOwnership,
} from '../services/activationKeyServices';
import {
	addNewOfferLinkToDB,
	getOfferLinkByUserAndProduct,
} from '../services/offerServices';
import {
	addNewOnerLinkToDB,
	getOnerLinkByUserAndProduct,
} from '../services/ownerServices';

const handleGetOwnerLinks = async (req: any, res: any) => {
	const userID = req.id;
	try {
		const ownerLinks = await getOwnerLinksFromDB(userID);
		res.status(200).json(ownerLinks);
	} catch (err) {
		res.status(500).json({ message: err });
	}
};

const handleGetActivationKeysByOwnerLink = async (req: any, res: any) => {
	const ownerID = req.query.ownerID;
	try {
		const activationKeys = await getActivationKeysByOwnerLinkFromDB(ownerID);
		res.status(200).json(activationKeys);
	} catch (err) {
		res.status(500).json({ message: err });
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
	}
};

const handleNewAddActivationKeyToOffer = async (req: any, res: any) => {
	const userID = req.id;
	const activationKey = req.body.activationKey;
	const productID = req.body.productID;
	try {
		let offerID = await getOfferLinkByUserAndProduct(userID, productID);
		if (!offerID) offerID = await addNewOfferLinkToDB(productID, userID, 0);
		await addNewActivationKeyToOfferInDB(offerID, activationKey);
		res.sendStatus(201);
	} catch (err) {
		res.status(500).json({ message: err });
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
	} catch (err: any) {
		res.status(500).json({ message: err.message });
	}
};

const handleGetActivationKeysByOfferLink = async (req: any, res: any) => {
	const offerID = req.query.offerID;
	try {
		const activationKeys = await getActivationKeysByOfferLinkFromDB(offerID);
		res.status(200).json(activationKeys);
	} catch (err) {
		res.status(500).json({ message: err });
	}
};

export {
	handleAddActivationKeyToOffer,
	handleAddActivationKeyToOwner,
	handleGetActivationKeysByOfferLink,
	handleGetActivationKeysByOwnerLink,
	handleGetOwnerLinks,
	handleNewAddActivationKeyToOffer,
};
