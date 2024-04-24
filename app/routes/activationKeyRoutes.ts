import express from "express";
import verifyJWT from "../middleware/verifyJWT";
import verifyRoles from "../middleware/verifyRoles";
import { handleGetOwnerLinks } from "../controllers/activationKeyController";
import ROLES_LIST from "../config/roles_list";

const activationKeyRouter = express.Router();

activationKeyRouter
	.route("/")
	.get(
		verifyJWT,
		verifyRoles(ROLES_LIST.Buyer, ROLES_LIST.Seller),
		handleGetOwnerLinks
	);

export { activationKeyRouter };
