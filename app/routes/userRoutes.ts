import express from "express";
import verifyJWT from "../middleware/verifyJWT";
import verifyRole from "../middleware/verifyRoles";
import ROLES_LIST from "../config/roles_list";
import {
	handleGetUsers,
	handleGetUserByEmail,
	handleUpdateUser,
} from "../controllers/userControllers";

const userRouter = express.Router();
// const router = express.Router();

userRouter
	.get(":email?", handleGetUserByEmail)
	.route("/")
	.get(verifyJWT, verifyRole(ROLES_LIST.Buyer), handleGetUsers)
	.put(verifyJWT, verifyRole(ROLES_LIST.Buyer), handleUpdateUser);

export { userRouter };
