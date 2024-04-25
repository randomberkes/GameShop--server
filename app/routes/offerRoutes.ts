import express from "express";
import {
	handleGetOfferActivatinKeyNumber,
	handleGetOffersByUser,
	handlegetOffers,
} from "../controllers/offerControllers";
import verifyJWT from "../middleware/verifyJWT";
import verifyRoles from "../middleware/verifyRoles";
import ROLES_LIST from "../config/roles_list";

const offerRouter = express.Router();

offerRouter
	.get("/amount", handleGetOfferActivatinKeyNumber)
	.get(
		"/byUser",
		verifyJWT,
		verifyRoles(ROLES_LIST.Buyer, ROLES_LIST.Seller),
		handleGetOffersByUser
	)
	.route("/")
	.get(handlegetOffers);

export { offerRouter };
