import express from "express";
import verifyJWT from "../middleware/verifyJWT";
import verifyRoles from "../middleware/verifyRoles";
import ROLES_LIST from "../config/roles_list";
import { handleAddOrder } from "../controllers/orderControllers";
import { handlegetOffers } from "../controllers/offerControllers";

const offerRouter = express.Router();

offerRouter.route("/").get(handlegetOffers);

export { offerRouter };
