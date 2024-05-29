import { NextFunction } from 'express';
import supertest from 'supertest';
import app from '../../index';
import {
	addFavoritesLinkToDB,
	deleteFavoritesLinkFromDB,
	getFavoritesProductsByUserFromDB,
} from '../../services/favoriteServices';
jest.mock(
	'../../middleware/verifyJWT',
	() => (req: any, res: any, next: NextFunction) => {
		req.id = 'user123';
		next();
	}
);

jest.mock('../../services/favoriteServices');

const mockedAddFavoritesLinkToDB = addFavoritesLinkToDB as jest.Mock;
const mockedDeleteFavoritesLinkFromDB = deleteFavoritesLinkFromDB as jest.Mock;
const mockedGetFavoritesProductsByUserFromDB =
	getFavoritesProductsByUserFromDB as jest.Mock;

describe('favoriteEndpoints', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	describe('POST /favorite', () => {
		beforeEach(() => {
			jest.clearAllMocks();
		});

		it('should add a favorites link by offer ID and user ID and return 201 status when valid userID and offerID is provided', async () => {
			const offerID = 'offer123';
			const userID = 'user123';
			mockedAddFavoritesLinkToDB.mockResolvedValue(undefined);

			const response = await supertest(app).post('/favorite').send({ offerID });

			expect(response.status).toEqual(201);
			expect(mockedAddFavoritesLinkToDB).toHaveBeenCalledWith(offerID, userID);
		});

		it('should handle errors and return 500 status when a database error emerges', async () => {
			const offerID = 'offer123';
			const errorMessage = 'Database error';
			mockedAddFavoritesLinkToDB.mockRejectedValue(new Error(errorMessage));

			const response = await supertest(app).post('/favorite').send({ offerID });

			expect(response.status).toEqual(500);
			expect(response.body.message).toEqual(errorMessage);
		});
	});
	describe('DELETE /favorite', () => {
		beforeEach(() => {
			jest.clearAllMocks();
		});

		it('should delete a favorites link by offer ID and user ID and return 204 status when valid userID and offerID is provided', async () => {
			const offerID = 'offer123';
			const userID = 'user123';
			mockedDeleteFavoritesLinkFromDB.mockResolvedValue(undefined);

			const response = await supertest(app).delete(
				`/favorite?offerID=${offerID}`
			);

			expect(response.status).toEqual(204);
			expect(mockedDeleteFavoritesLinkFromDB).toHaveBeenCalledWith(
				offerID,
				userID
			);
		});

		it('should handle errors and return 500 status when a database error emerges', async () => {
			const offerID = 'offer123';
			const errorMessage = 'Database error';
			mockedDeleteFavoritesLinkFromDB.mockRejectedValue(
				new Error(errorMessage)
			);

			const response = await supertest(app).delete(
				`/favorite?offerID=${offerID}`
			);

			expect(response.status).toEqual(500);
			expect(response.body.message).toEqual(errorMessage);
		});
	});
	describe('GET /favorite', () => {
		const userID = 'user123';

		beforeEach(() => {
			jest.clearAllMocks();
		});

		it('should get favorites offers by user ID and return 200 status when valid userID is provided', async () => {
			const products = [
				{ id: 1, name: 'Product A' },
				{ id: 2, name: 'Product B' },
			];
			mockedGetFavoritesProductsByUserFromDB.mockResolvedValue(products);

			const response = await supertest(app).get('/favorite');

			expect(response.status).toEqual(200);
			expect(response.body).toEqual(products);
			expect(mockedGetFavoritesProductsByUserFromDB).toHaveBeenCalledWith(
				userID
			);
		});

		it('should handle errors and return 500 status when a database error emerges', async () => {
			const errorMessage = 'Database error';
			mockedGetFavoritesProductsByUserFromDB.mockRejectedValue(
				new Error(errorMessage)
			);

			const response = await supertest(app).get('/favorite');

			expect(response.status).toEqual(500);
			expect(response.body.message).toEqual(errorMessage);
		});
	});
});
