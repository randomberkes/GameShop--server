import connectToDatabase from "../../db";

export const getAllUsersFromDB = async () => {
	const response = await connectToDatabase(async (db) => {
		return await db.query("SELECT * FROM users");
	});
	const allUsers = response.rows;
	return allUsers;
};
