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
	const products = await getProductsByFilterFromDB(req.body);
	console.log(products);
	res.json(products);
};
