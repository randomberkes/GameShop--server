import { getAllCategoryTypesFromDB } from "../services/categoryTypeServices";
import { Request, Response } from "express";

export const getAllCategoryTypes = async (req: Request, res: Response) => {
	const categoryTypes = await getAllCategoryTypesFromDB();

	res.json(categoryTypes);
};
