import {
	getAllUsersFromDB,
	getUserByEmailFromDB,
	postUserToDB,
} from "../services/userServices";
import { Request, Response } from "express";

export const getUsers = async (req: Request, res: Response) => {
	const users = await getAllUsersFromDB();
	res.json(users);
};

export const getUserByEmail = async (req: Request, res: Response) => {
	const user = await getUserByEmailFromDB(req.query.email);
	res.json(user);
};

export const postUser = async (req: Request, res: Response) => {
	const user = await postUserToDB(req.body);
	res.status(201).json(user);
};
