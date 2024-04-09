import express from "express";
import { getUserByEmail, getUsers } from "../controllers/userControllers";

const router = express.Router();

export const usersGetAll = router.get("/api", getUsers);
export const usersGetByEmail = router.get("/email", getUserByEmail);
