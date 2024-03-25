import {
	getAllProductsFromDB,
	getProductsByNameFromDB,
} from "../services/productServices";
import { Request, Response } from "express";

export const getProducts = async (req: Request, res: Response) => {
	const products = await getAllProductsFromDB();
	console.log(products);
	res.json(products);
};

export const getProductsByName = async (req: Request, res: Response) => {
	const products = await getProductsByNameFromDB(req.query.name);
	console.log(products);
	res.json(products);
};
