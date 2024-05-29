import express from "express";
import {
	handleGetUserByEmail,
	handleUpdateUser,
} from "../controllers/userControllers";
import verifyJWT from "../middleware/verifyJWT";

const userRouter = express.Router();

userRouter
	.put("/", verifyJWT, handleUpdateUser)
	.get("/email", handleGetUserByEmail);

export { userRouter };
