import express from "express";
import verifyJWT from "../middleware/verifyJWT";
import verifyRoles from "../middleware/verifyRoles";
import ROLES_LIST from "../config/roles_list";
import { handleAddOrder } from "../controllers/orderControllers";
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
