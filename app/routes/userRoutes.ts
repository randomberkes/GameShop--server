import express from "express";
import {
	getUserByEmail,
	getUsers,
	postUser,
} from "../controllers/userControllers";

const router = express.Router();

export const usersGetAll = router.get("/api", getUsers);
export const usersGetByEmail = router.get("/email", getUserByEmail);
export const usersPost = router.post("/register", postUser);
