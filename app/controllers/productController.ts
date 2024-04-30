import {
	getOfferActivatinKeyNumberFromDB,
	getOffersFromDB,
} from "../services/offerServices";
import {
	getAllProductsFromDB,
	getProductsByNameFromDB,
	getProductsByFilterFromDB,
	getProductByIDFromDB,
	getProductsCountByFilterFromDB,
	getAllProductsCountFromDB,
} from "../services/productServices";
import { Request, Response } from "express";

export const getProducts = async (req: Request, res: Response) => {
	const limit = req.query.limit;
	const offset = req.query.offset;
	const products = await getAllProductsFromDB(limit, offset);
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
		res.status(200).json(product);
	} catch (err) {
		res.status(500).json({ message: err });
	}
};

export const getProductsByFilter = async (req: Request, res: Response) => {
	let products;
	let productsNumber;
	let totalPageNumber;
	const { limit, page, filter } = req.query;
	const offset = (Number(page) - 1) * Number(limit);

	console.log(filter);

	if (!filter) {
		products = await getAllProductsFromDB(limit, offset);

		productsNumber = await getAllProductsCountFromDB();
		totalPageNumber = Math.ceil(productsNumber / Number(limit));
	} else {
		products = await getProductsByFilterFromDB(filter, limit, offset);
		productsNumber = await getProductsCountByFilterFromDB(filter);
		totalPageNumber = Math.ceil(productsNumber / Number(limit));
	}

	console.log({ totalPageNumber, products });
	res.status(200).json({ totalPageNumber, products });
};

export { handleGetProductByID };
