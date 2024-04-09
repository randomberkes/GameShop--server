import { ParsedQs } from "qs";
import connectToDatabase from "../../db";

export const getCategoriesByTypeFromDB = async (
	categoryType: string | ParsedQs | string[] | ParsedQs[] | undefined
) => {
	const response = await connectToDatabase(async (db) => {
		return await db.query(
			`SELECT category_name, categories.id FROM categories 
			JOIN categorytypes ON categories.category_type_id = categorytypes.id
			WHERE categorytypes.category_type_name = $1`,
			[categoryType]
		);
	});
	const allCategories = response.rows;
	return allCategories;
};
