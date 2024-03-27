import connectToDatabase from "../../db";

export const getAllCategoryTypesFromDB = async () => {
	const response = await connectToDatabase(async (db) => {
		return await db.query("SELECT * FROM categorytypes");
	});
	const allCategoryTypes = response.rows;
	return allCategoryTypes;
};
