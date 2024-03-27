import express from "express";
import { getAllCategoryTypes } from "../controllers/categoryTypeController";

const router = express.Router();

export const getCategoryTypes = router.get("/", getAllCategoryTypes);
