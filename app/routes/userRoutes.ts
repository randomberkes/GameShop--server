import express from "express";
import verifyJWT from "../middleware/verifyJWT";
import {
	handleGetUsers,
	handleGetUserByEmail,
} from "../controllers/userControllers";

const router = express.Router();

const getUsers = router.get("/all", verifyJWT, handleGetUsers);
const getUsersByEmail = router.get("/email", handleGetUserByEmail);

export { getUsers, getUsersByEmail };
