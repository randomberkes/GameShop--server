import express from "express";
import {
	getProducts,
	getProductsByName,
	getProductsByFilter,
	handleGetProductByID,
} from "../controllers/productController";

const router = express.Router();

const getProductByID = router.get("/:productID?", handleGetProductByID);

export const getAll = router.get("/", getProducts);
export const getByName = router.get("/search", getProductsByName);
export const getProductsByFilterRouter = router.get(
	"/filter",
	getProductsByFilter
);

export { getProductByID };
