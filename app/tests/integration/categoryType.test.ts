import supertest from 'supertest';
import app from '../../index';
import { getAllCategoryTypesFromDB } from '../../services/categoryTypeServices';
jest.mock('../../services/categoryTypeServices');

const mockedGetAllCategoryTypesFromDB = getAllCategoryTypesFromDB as jest.Mock;

describe('categoryTypeEndpoints', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	describe('GET /categoryTypes', () => {
		beforeEach(() => {
			jest.clearAllMocks();
		});

		it('should get all category types from DB and return 200 status', async () => {
			const categoryTypes = ['Type A', 'Type B'];
			mockedGetAllCategoryTypesFromDB.mockResolvedValue(categoryTypes);

			const response = await supertest(app).get('/categoryTypes');

			expect(response.status).toEqual(200);
			expect(response.body).toEqual(categoryTypes);
			expect(mockedGetAllCategoryTypesFromDB).toHaveBeenCalled();
		});

		it('should handle errors and return 500 status when database error emerges', async () => {
			const errorMessage = 'Database error';
			mockedGetAllCategoryTypesFromDB.mockRejectedValue(
				new Error(errorMessage)
			);

			const response = await supertest(app).get('/categoryTypes');

			expect(response.status).toEqual(500);
			expect(response.body.message).toEqual(errorMessage);
		});
	});
});
