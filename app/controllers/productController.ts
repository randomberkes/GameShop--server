import {
	getAllProductsFromDB,
	getProductsByNameFromDB,
	getProductsByFilterFromDB,
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

export const getProductsByFilter = async (req: Request, res: Response) => {
	let products;
	if (!req.query.filter) {
		products = await getAllProductsFromDB();
	} else {
		products = await getProductsByFilterFromDB(req.query.filter);
	}
	res.json(products);
};
