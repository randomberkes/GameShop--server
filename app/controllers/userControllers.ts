import bcrypt from "bcrypt";
import { Request, Response } from "express";
import {
	getUserByEmailFromDB,
	getUserByIdFromDB,
	updateUserFromDB,
} from "../services/userServices";

import "dotenv/config";

const handleUpdateUser = async (req: any, res: any) => {
	const userID = req.id;
	const name = req.body.name;
	const email = req.body.email;
	const password = req.body.pwd;
	const saltRounds = 10;
	const hashedPassword = await bcrypt.hash(password, saltRounds);

	try {
		const response = await getUserByIdFromDB(userID);

		const user = response.rows[0];

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

const handleGetUserByEmail = async (req: Request, res: Response) => {
	const email = req.query.email;
	try {
		const rows = await getUserByEmailFromDB(email);
		if (rows.length === 0) {
			return res.sendStatus(401);
		}
		const foundUser = rows[0];
		res.status(200).json(foundUser);
	} catch (err) {
		res.status(500).json({ message: err });
	}
};

export { handleGetUserByEmail, handleUpdateUser };
