import connectToDatabase from "../../db";

export const getAllUsersFromDB = async () => {
	const response = await connectToDatabase(async (db) => {
		return await db.query("SELECT * FROM users");
	});
	const allUsers = response.rows;
	return allUsers;
};

export const getUserByEmailFromDB = async (email: any) => {
	const response = await connectToDatabase(async (db) => {
		return await db.query("SELECT * FROM users WHERE email=$1", [email]);
	});
	let user = "";
	if (response.rows[0]) {
		user = response.rows[0];
	}

	return user;
};
