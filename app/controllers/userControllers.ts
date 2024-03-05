import { getAllUsersFromDB } from "../services/userServices";
import { Request, Response } from "express";

export const getUsers = async (req: Request, res: Response) => {
	const users = await getAllUsersFromDB();

	console.log(users.rows);
	res.json(users.rows);
};
