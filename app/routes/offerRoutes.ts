import express from "express";
import {
	handleGetOfferActivatinKeyNumber,
	handlegetOffers,
} from "../controllers/offerControllers";

const offerRouter = express.Router();

offerRouter
	.get("/amount", handleGetOfferActivatinKeyNumber)
	.route("/")
	.get(handlegetOffers);

export { offerRouter };
