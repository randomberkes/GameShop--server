import { Request, Response } from 'express';
import {
	getAllProductsCountFromDB,
	getAllProductsForNewOfferFromDB,
	getAllProductsFromDB,
	getProductByIDFromDB,
	getProductsByFilterFromDB,
	getProductsByNameFromDB,
	getProductsCountByFilterFromDB,
} from '../services/productServices';

const getProducts = async (req: Request, res: Response) => {
	const limit = req.query.limit;
	const offset = req.query.offset;
	try {
		const products = await getAllProductsFromDB(limit, offset);
		res.status(200).json(products);
	} catch (err: any) {
		res.status(500).json({ message: err.message });
	}
};

const getProductsForNewOffer = async (req: any, res: any) => {
	try {
		const products = await getAllProductsForNewOfferFromDB();
		res.status(200).json(products);
	} catch (err: any) {
		res.status(500).json({ message: err.message });
	}
};

const getProductsByName = async (req: Request, res: Response) => {
	const productName = req.query.name;
	try {
		const products = await getProductsByNameFromDB(productName);
		res.status(200).json(products);
	} catch (err: any) {
		res.status(500).json({ message: err.message });
	}
};

const handleGetProductByID = async (req: Request, res: Response) => {
	const productID = req.query.productID;
	try {
		const response = await getProductByIDFromDB(productID);
		const product = response.rows[0];
		res.status(200).json(product);
	} catch (err: any) {
		res.status(500).json({ message: err.message });
	}
};

export const getProductsByFilter = async (req: Request, res: Response) => {
	let products;
	let productsNumber;
	let totalPageNumber;
	const { limit, page, filter } = req.query;
	const offset = (Number(page) - 1) * Number(limit);

	try {
		if (!filter) {
			products = await getAllProductsFromDB(limit, offset);

			productsNumber = await getAllProductsCountFromDB();
			totalPageNumber = Math.ceil(productsNumber / Number(limit));
		} else {
			products = await getProductsByFilterFromDB(filter, limit, offset);
			productsNumber = await getProductsCountByFilterFromDB(filter);
			totalPageNumber = Math.ceil(productsNumber / Number(limit));
		}
		res.status(200).json({ totalPageNumber, products });
	} catch (err: any) {
		res.status(500).json({ message: err.message });
	}
};

export {
	getProducts,
	getProductsByName,
	getProductsForNewOffer,
	handleGetProductByID,
};
