import db from "../../db";

export const getAllUsersFromDB = async () => {
	const allUsers = await (await db).query("SELECT * FROM users");
	(await db).end();
	return allUsers;
};
