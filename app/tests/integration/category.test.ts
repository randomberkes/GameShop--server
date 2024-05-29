import supertest from 'supertest';
import app from '../../index';
import { getCategoriesByTypeFromDB } from '../../services/categoryServices';
jest.mock('../../services/categoryServices');

const mockedGetCategoriesByTypeFromDB = getCategoriesByTypeFromDB as jest.Mock;

describe('categoryEndpoints', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	describe('GET /categories', () => {
		beforeEach(() => {
			jest.clearAllMocks();
		});

		it('should get categories by type from DB and return 200 status', async () => {
			const categories = ['Category A', 'Category B'];
			const categoryType = 'product';
			mockedGetCategoriesByTypeFromDB.mockResolvedValue(categories);

			const response = await supertest(app)
				.get('/categories')
				.query({ categoryType: categoryType });

			expect(response.status).toEqual(200);
			expect(response.body).toEqual(categories);
			expect(mockedGetCategoriesByTypeFromDB).toHaveBeenCalledWith(
				categoryType
			);
		});

		it('should handle errors and return 500 status when database error emerges', async () => {
			const errorMessage = 'Database error';
			const categoryType = 'product';
			mockedGetCategoriesByTypeFromDB.mockRejectedValue(
				new Error(errorMessage)
			);

			const response = await supertest(app)
				.get('/categories')
				.query({ categoryType: categoryType });

			expect(response.status).toEqual(500);
			expect(response.body.message).toEqual(errorMessage);
		});
	});
});
