import express from "express";
import { getUsers } from "../controllers/userControllers";

const router = express.Router();

export default router.get("/api", getUsers);
