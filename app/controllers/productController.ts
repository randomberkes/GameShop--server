import {
	getOfferActivatinKeyNumberFromDB,
	getOffersFromDB,
} from "../services/offerServices";
import {
	getAllProductsFromDB,
	getProductsByNameFromDB,
	getProductsByFilterFromDB,
	getProductByIDFromDB,
} from "../services/productServices";
import { Request, Response } from "express";

async function filterOffersAsync(offers: any[]) {
	const offerPromises = offers.map(async (offer) => {
		const activationKeyNumber = await getOfferActivatinKeyNumberFromDB(
			offer.id
		);
		return {
			offer,
			isValid: activationKeyNumber.count != 0,
		};
	});
	const results = await Promise.all(offerPromises);
	return results
		.filter((result) => result.isValid)
		.map((result) => result.offer);
}

async function filterProductsAsync(products: any[]) {
	// Map each product to a promise that resolves to whether the product should be kept
	const productPromises = products.map(async (product) => {
		const offers = await getOffersFromDB(product.id);
		const filteredOffers = await filterOffersAsync(offers);
		// Return both the product and whether it has valid offers
		return {
			product,
			hasValidOffers: filteredOffers.length > 0,
		};
	});

	// Await all the promises
	const results = await Promise.all(productPromises);

	// Filter to get only products that have valid offers
	return results
		.filter((result) => result.hasValidOffers)
		.map((result) => result.product);
}

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
		res.status(200).json(product);
	} catch (err) {
		res.status(500).json({ message: err });
	}
};

export const getProductsByFilter = async (req: Request, res: Response) => {
	let products;
	let filteredProducts1;

	if (!req.query.filter) {
		products = await getAllProductsFromDB();
		await filterProductsAsync(products).then((filteredProducts) => {
			console.log(filteredProducts);
			filteredProducts1 = filteredProducts; // This will log the filtered products
		});
	} else {
		products = await getProductsByFilterFromDB(req.query.filter);
		await filterProductsAsync(products).then((filteredProducts) => {
			console.log(filteredProducts);
			filteredProducts1 = filteredProducts; // This will log the filtered products
		});
	}
	console.log(filteredProducts1);
	res.json(filteredProducts1);
};

export { handleGetProductByID };
