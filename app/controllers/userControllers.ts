import {
	getAllUsersFromDB,
	getUserByEmailFromDB,
} from "../services/userServices";
import { Request, Response } from "express";

import "dotenv/config";

const handleGetUsers = async (req: Request, res: Response) => {
	const users = await getAllUsersFromDB();
	res.json(users);
};

const handleGetUserByEmail = async (req: Request, res: Response) => {
	const rows = await getUserByEmailFromDB(req.query.email);

	if (rows.length === 0) {
		return res.sendStatus(401);
	}
	const foundUser = rows[0];
	res.json(foundUser);
};

export { handleGetUsers, handleGetUserByEmail };
