import { Request, Response } from 'express';
import { getAllCategoryTypesFromDB } from '../services/categoryTypeServices';

const getAllCategoryTypes = async (req: Request, res: Response) => {
	try {
		const categoryTypes = await getAllCategoryTypesFromDB();

		res.status(200).json(categoryTypes);
	} catch (err: any) {
		res.status(500).json({ message: err.message });
	}
};

export { getAllCategoryTypes };
