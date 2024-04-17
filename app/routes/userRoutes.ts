import express from "express";
import verifyJWT from "../middleware/verifyJWT";
import verifyRole from "../middleware/verifyRoles";
import ROLES_LIST from "../config/roles_list";
import {
	handleGetUsers,
	handleGetUserByEmail,
} from "../controllers/userControllers";

const router = express.Router();

const getUsers = router.get(
	"/all",
	verifyJWT,
	verifyRole(ROLES_LIST.Buyer),
	handleGetUsers
);
const getUsersByEmail = router.get("/email", handleGetUserByEmail);

export { getUsers, getUsersByEmail };
