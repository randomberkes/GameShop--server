import express from "express";
import {
	handleGetOfferActivatinKeyNumber,
	handleGetOffersByUser,
	handlegetOffers,
} from "../controllers/offerControllers";
import verifyJWT from "../middleware/verifyJWT";

const offerRouter = express.Router();

offerRouter
	.get("/amount", handleGetOfferActivatinKeyNumber)
	.get(
		"/byUser",
		verifyJWT,

		handleGetOffersByUser
	)
	.route("/")
	.get(handlegetOffers);

export { offerRouter };
