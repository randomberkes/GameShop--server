import express from "express";
import {
	handleGetOfferActivatinKeyNumber,
	handleGetOffersByUser,
	handleUpdateOfferPrice,
	handlegetOffers,
} from "../controllers/offerControllers";
import verifyJWT from "../middleware/verifyJWT";

const offerRouter = express.Router();

offerRouter
	.get("/amount", handleGetOfferActivatinKeyNumber)
	.get("/byUser", verifyJWT, handleGetOffersByUser)
	.route("/")
	.patch(verifyJWT, handleUpdateOfferPrice)
	.get(handlegetOffers);

export { offerRouter };
