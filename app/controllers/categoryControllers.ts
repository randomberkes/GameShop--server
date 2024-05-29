import { Request, Response } from 'express';
import { getCategoriesByTypeFromDB } from '../services/categoryServices';

//TODO: joi

const getCategoriesByType = async (req: Request, res: Response) => {
	const categoryType = req.query.categoryType;
	try {
		const categories = await getCategoriesByTypeFromDB(categoryType);
		res.status(200).json(categories);
	} catch (err: any) {
		res.status(500).json({ message: err.message });
	}
};

export { getCategoriesByType };
