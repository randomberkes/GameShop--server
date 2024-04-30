import express from "express";
import verifyJWT from "../middleware/verifyJWT";

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

		handleGetActivationKeysByOfferLink
	)
	.get(
		"/",
		verifyJWT,

		handleGetActivationKeysByOwnerLink
	)
	.post(
		"/addToOffer",
		verifyJWT,

		handleAddActivationKeyToOffer
	)
	.post(
		"/addToOwner",
		verifyJWT,

		handleAddActivationKeyToOwner
	)
	.route("/OwnerLinnk")
	.get(
		verifyJWT,

		handleGetOwnerLinks
	);

export { activationKeyRouter };
