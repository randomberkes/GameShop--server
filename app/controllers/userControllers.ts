import { getAllUsersFromDB } from "../services/userServices";
import { Request, Response } from "express";

export const getUsers = async (req: Request, res: Response) => {
	const users = await getAllUsersFromDB();
	res.json(users);
};
