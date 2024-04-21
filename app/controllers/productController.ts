import {
	getAllProductsFromDB,
	getProductsByNameFromDB,
	getProductsByFilterFromDB,
	getProductByIDFromDB,
} from "../services/productServices";
import { Request, Response } from "express";

export const getProducts = async (req: Request, res: Response) => {
	const products = await getAllProductsFromDB();
	res.json(products);
};

export const getProductsByName = async (req: Request, res: Response) => {
	const products = await getProductsByNameFromDB(req.query.name);
	res.json(products);
};

const handleGetProductByID = async (req: Request, res: Response) => {
	const productID = req.query.productID;
	try {
		const response = await getProductByIDFromDB(productID);
		const product = response.rows[0];
		res.status(200).json({ product });
	} catch (err) {
		res.status(500).json({ message: err });
	}
};

export const getProductsByFilter = async (req: Request, res: Response) => {
	let products;
	if (!req.query.filter) {
		products = await getAllProductsFromDB();
	} else {
		products = await getProductsByFilterFromDB(req.query.filter);
	}
	res.json(products);
};

export { handleGetProductByID };
