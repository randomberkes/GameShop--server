import express from "express";
import {
	getProducts,
	getProductsByName,
	getProductsByFilter,
	handleGetProductByID,
} from "../controllers/productController";

const productsRouter = express.Router();

productsRouter
	.get("/asdsadasd", getProducts)
	.get("/search", getProductsByName)
	.get(":productID?", handleGetProductByID)
	.get("/filter", getProductsByFilter);

export { productsRouter };
