import connectToDatabase from "../../db";

const getAllUsersFromDB = async () => {
	const response = await connectToDatabase(async (db) => {
		return await db.query("SELECT * FROM users");
	});
	const allUsers = response.rows;
	return allUsers;
};

const addNewUserToDB = async (userToSave: any) => {
	const { name, email, hashedPassword, roles } = userToSave;

	await connectToDatabase(async (db) => {
		return await db.query(
			"INSERT INTO users(name, email, password, roles) VALUES ($1, $2, $3, $4)",
			[name, email, hashedPassword, roles]
		);
	});
};
const getUserByEmailFromDB = async (email: any) => {
	const response = await connectToDatabase(async (db) => {
		return await db.query("SELECT * FROM users WHERE email = $1", [email]);
	});

	return response.rows;
};

const getUserByRefreshTokenFromDB = async (refreshToken: string) => {
	const response = await connectToDatabase(async (db) => {
		return await db.query("SELECT * FROM users WHERE refreshToken = $1", [
			refreshToken,
		]);
	});

	return response.rows;
};

const setUserRefreshToken = async (
	email: string,
	refreshToken: string | null
) => {
	const response = await connectToDatabase(async (db) => {
		return await db.query("UPDATE users SET refreshToken=$1 WHERE email = $2", [
			refreshToken,
			email,
		]);
	});

	return response.rows;
};

export {
	setUserRefreshToken,
	getUserByRefreshTokenFromDB,
	getUserByEmailFromDB,
	addNewUserToDB,
	getAllUsersFromDB,
};
