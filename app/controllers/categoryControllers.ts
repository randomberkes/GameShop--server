import { getCategoriesByTypeFromDB } from "../services/categoryServices";
import { Request, Response } from "express";

export const getCategoriesByType = async (req: Request, res: Response) => {
	const categories = await getCategoriesByTypeFromDB(req.query.categoryType);
	res.json(categories);
};
