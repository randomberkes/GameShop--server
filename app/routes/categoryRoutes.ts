import express from "express";
import { getCategoriesByType } from "../controllers/categoryControllers";

const router = express.Router();

export const getCategoriesByTypeRouter = router.get("/", getCategoriesByType);
