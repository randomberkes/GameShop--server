import { ParsedQs } from "qs";
import connectToDatabase from "../../db";

export const getAllProductsFromDB = async () => {
	const response = await connectToDatabase(async (db) => {
		return await db.query("SELECT * FROM products");
	});
	const allProducts = response.rows;
	return allProducts;
};

export const getProductsByNameFromDB = async (
	productName: string | ParsedQs | string[] | ParsedQs[] | undefined
) => {
	const response = await connectToDatabase(async (db) => {
		return await db.query(
			`SELECT * FROM products WHERE LOWER(name) ~'.*${
				typeof productName === "string"
					? productName.toLowerCase()
					: productName
			}.*'`
		);
	});
	const allProducts = response.rows;
	return allProducts;
};
