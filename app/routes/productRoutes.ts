import express from "express";
import {
	getProducts,
	getProductsByName,
} from "../controllers/productController";

const router = express.Router();

export const getAll = router.get("/", getProducts);
export const getByName = router.get("/search", getProductsByName);
