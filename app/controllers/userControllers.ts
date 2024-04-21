import {
	getAllUsersFromDB,
	getUserByEmailFromDB,
	getUserByIdFromDB,
	updateUserFromDB,
} from "../services/userServices";
import { Request, Response } from "express";
import bcrypt from "bcrypt";

import "dotenv/config";

const handleGetUsers = async (req: Request, res: Response) => {
	const users = await getAllUsersFromDB();
	console.log(users);
	res.json(users);
};

const handleUpdateUser = async (req: any, res: any) => {
	const userID = req.id;
	const name = req.body.name;
	const email = req.body.email;
	const password = req.body.pwd;
	const saltRounds = 10;
	const hashedPassword = await bcrypt.hash(password, saltRounds);

	try {
		const response = await getUserByIdFromDB(userID);
		// if (response.rows.length < 1) return res.sendStatus(403);
		const user = response.rows[0];
		console.log(user);
		const updateUser = {
			name: name === "" ? user.name : name,
			email: email === "" ? user.email : email,
			password: password === "" ? user.password : hashedPassword,
		};
		await updateUserFromDB(
			userID,
			updateUser.name,
			updateUser.email,
			updateUser.password
		);
		res.sendStatus(200);
	} catch (err) {
		res.status(500).json({ message: err });
	}
};

// updateUserFromDB

const handleGetUserByEmail = async (req: Request, res: Response) => {
	const rows = await getUserByEmailFromDB(req.query.email);

	if (rows.length === 0) {
		return res.sendStatus(401);
	}
	const foundUser = rows[0];
	res.json(foundUser);
};

export { handleGetUsers, handleGetUserByEmail, handleUpdateUser };
