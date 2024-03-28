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

export const getProductsByFilterFromDB = async (filter: Filter) => {
	let fullFilter = "";
	let count = 0;
	for (let key in filter) {
		let oneColumnFilter = "";
		for (let i = 0; i < filter[key as keyof typeof filter]!.length; i++) {
			const oneFilter = ` ${key} = '${
				filter[key as keyof typeof filter]![i]
			}' `;
			oneColumnFilter += oneFilter;
			if (i < filter[key as keyof typeof filter]!.length - 1) {
				oneColumnFilter += "OR";
			}
		}
		if (count > 0) fullFilter += "AND";
		fullFilter += oneColumnFilter;
		oneColumnFilter = "";
		count++;
	}

	const select = "SELECT * FROM products WHERE" + fullFilter;

	const response = await connectToDatabase(async (db) => {
		//prepare satemant
		return await db.query(select);
	});
	const allProducts = response.rows;
	return allProducts;
};
