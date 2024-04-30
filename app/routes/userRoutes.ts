import express from "express";
import verifyJWT from "../middleware/verifyJWT";
import {
	handleGetUsers,
	handleGetUserByEmail,
	handleUpdateUser,
} from "../controllers/userControllers";

const userRouter = express.Router();
const router = express.Router();

userRouter
	.route("/")
	.get(verifyJWT, handleGetUsers)
	.put(verifyJWT, handleUpdateUser);

const getUsersByEmail = router.get("/email", handleGetUserByEmail);

export { userRouter, getUsersByEmail };
