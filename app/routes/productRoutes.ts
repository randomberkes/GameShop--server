import express from "express";
import {
	getProducts,
	getProductsByFilter,
	getProductsByName,
	getProductsForNewOffer,
	handleGetProductByID,
} from "../controllers/productController";
import verifyJWT from "../middleware/verifyJWT";

const productsRouter = express.Router();

productsRouter
	.get("/all", getProducts)
	.get("/productsForNewOffer", verifyJWT, getProductsForNewOffer)
	.get("/search", getProductsByName)
	.get(":productID?", handleGetProductByID)
	.get("/filter", getProductsByFilter);

export { productsRouter };
