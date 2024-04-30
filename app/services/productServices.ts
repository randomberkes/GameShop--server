import { ParsedQs } from "qs";
import connectToDatabase from "../../db";

export const getAllProductsFromDB = async (limit: any, offset: any) => {
	const response = await connectToDatabase(async (db) => {
		return await db.query(
			"SELECT DISTINCT products.* FROM products JOIN offers ON offers.product_id = products.id JOIN activation_keys ON activation_keys.offer_id = offers.id LIMIT $1 OFFSET $2",
			[limit, offset]
		);
	});
	const allProducts = response.rows;
	return allProducts;
};

export const getAllProductsCountFromDB = async () => {
	const response = await connectToDatabase(async (db) => {
		return await db.query(
			"SELECT COUNT(DISTINCT products.*) FROM products JOIN offers ON offers.product_id = products.id JOIN activation_keys ON activation_keys.offer_id = offers.id;"
		);
	});
	const productsCount = response.rows[0].count;
	return productsCount;
};

const getProductByIDFromDB = async (productID: any) => {
	const response = await connectToDatabase(async (db) => {
		return await db.query("SELECT * FROM products WHERE id = $1;", [productID]);
	});
	return response;
};

export const getProductsByNameFromDB = async (
	productName: string | ParsedQs | string[] | ParsedQs[] | undefined
) => {
	const response = await connectToDatabase(async (db) => {
		//prepare satemant
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

type Filter = {
	game_device_compatibility?: string[];
	game_type?: string[];
	rating_pegi?: string[];
	number_of_players?: string[];
};

export const getProductsByFilterFromDB = async (
	filter: any,
	limit: any,
	offset: any
) => {
	let fullFilter = "";
	let count = 0;
	for (let key in filter) {
		let oneColumnFilter = "";
		for (let i = 0; i < filter[key].length; i++) {
			const oneFilter = ` ${key} = '${
				filter[key as keyof typeof filter]![i]
			}' `;
			oneColumnFilter += oneFilter;
			if (i < filter[key as keyof typeof filter]!.length - 1) {
				oneColumnFilter += "OR";
			}
		}
		oneColumnFilter = `(${oneColumnFilter})`;
		if (count > 0) fullFilter += "AND";
		fullFilter += oneColumnFilter;
		oneColumnFilter = "";
		count++;
	}

	const select =
		"SELECT DISTINCT products.* FROM products JOIN offers ON offers.product_id = products.id JOIN activation_keys ON activation_keys.offer_id = offers.id WHERE " +
		fullFilter +
		` LIMIT ${limit} OFFSET ${offset}`;
	console.log(select);
	const response = await connectToDatabase(async (db) => {
		//prepare satemant
		return await db.query(select);
	});
	console.log(response.rows);
	const allProducts = response.rows;
	return allProducts;
};

export const getProductsCountByFilterFromDB = async (filter: any) => {
	let fullFilter = "";
	let count = 0;
	for (let key in filter) {
		let oneColumnFilter = "";
		for (let i = 0; i < filter[key].length; i++) {
			const oneFilter = ` ${key} = '${
				filter[key as keyof typeof filter]![i]
			}' `;
			oneColumnFilter += oneFilter;
			if (i < filter[key as keyof typeof filter]!.length - 1) {
				oneColumnFilter += "OR";
			}
		}
		oneColumnFilter = `(${oneColumnFilter})`;
		if (count > 0) fullFilter += "AND";
		fullFilter += oneColumnFilter;
		oneColumnFilter = "";
		count++;
	}

	const select =
		"SELECT  COUNT( DISTINCT products.*) FROM products JOIN offers ON offers.product_id = products.id JOIN activation_keys ON activation_keys.offer_id = offers.id WHERE " +
		fullFilter;
	console.log(select);
	const response = await connectToDatabase(async (db) => {
		//prepare satemant
		return await db.query(select);
	});
	console.log(response.rows);
	const productsCount = response.rows[0].count;
	return productsCount;
};

export { getProductByIDFromDB };
