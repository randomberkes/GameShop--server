import express from "express";
import verifyJWT from "../middleware/verifyJWT";
import verifyRoles from "../middleware/verifyRoles";
import {
	handleAddActivationKeyToOffer,
	handleAddActivationKeyToOwner,
	handleGetActivationKeysByOfferLink,
	handleGetActivationKeysByOwnerLink,
	handleGetOwnerLinks,
} from "../controllers/activationKeyController";
import ROLES_LIST from "../config/roles_list";

const activationKeyRouter = express.Router();

activationKeyRouter
	.get(
		"/byUser",
		verifyJWT,
		verifyRoles(ROLES_LIST.Buyer, ROLES_LIST.Seller),
		handleGetActivationKeysByOfferLink
	)
	.get(
		"/",
		verifyJWT,
		verifyRoles(ROLES_LIST.Buyer, ROLES_LIST.Seller),
		handleGetActivationKeysByOwnerLink
	)
	.post(
		"/addToOffer",
		verifyJWT,
		verifyRoles(ROLES_LIST.Buyer, ROLES_LIST.Seller),
		handleAddActivationKeyToOffer
	)
	.post(
		"/addToOwner",
		verifyJWT,
		verifyRoles(ROLES_LIST.Buyer, ROLES_LIST.Seller),
		handleAddActivationKeyToOwner
	)
	.route("/OwnerLinnk")
	.get(
		verifyJWT,
		verifyRoles(ROLES_LIST.Buyer, ROLES_LIST.Seller),
		handleGetOwnerLinks
	);

export { activationKeyRouter };
