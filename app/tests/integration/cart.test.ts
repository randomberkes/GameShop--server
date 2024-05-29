import { NextFunction } from 'express';
import supertest from 'supertest';
import app from '../../index';
import {
	addCartLinkToDB,
	decrementCartLinkFromDB,
	deleteCartLinkFromDB,
	getCartOffersByUserFromDB,
	incrementCartLinkFromDB,
} from '../../services/cartServices';
jest.mock(
	'../../middleware/verifyJWT',
	() => (req: any, res: any, next: NextFunction) => {
		req.id = 'user123';
		next();
	}
);

jest.mock('../../services/cartServices');

const mockedAddCartLinkToDB = addCartLinkToDB as jest.Mock;
const mockedDeleteCartLinkFromDB = deleteCartLinkFromDB as jest.Mock;
const mockedGetCartOffersByUserFromDB = getCartOffersByUserFromDB as jest.Mock;
const mockedIncrementCartLinkFromDB = incrementCartLinkFromDB as jest.Mock;
const mockedDecrementCartLinkFromDB = decrementCartLinkFromDB as jest.Mock;

describe('cartEndpoints', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	describe('POST /cart', () => {
		it('should add a cart link and return 201 status', async () => {
			mockedAddCartLinkToDB.mockResolvedValue(undefined);

			const response = await supertest(app)
				.post('/cart')
				.send({ offerID: 'offer123' });

			expect(response.status).toEqual(201);
			expect(mockedAddCartLinkToDB).toHaveBeenCalledWith('user123', 'offer123');
		});
		it('should handle errors and return 500 status', async () => {
			const errorMessage = 'Database error';
			mockedAddCartLinkToDB.mockRejectedValue(new Error(errorMessage));

			const response = await supertest(app)
				.post('/cart')
				.send({ offerID: 'offer123' });

			expect(response.status).toEqual(500);
			expect(response.body.message).toEqual(errorMessage);
		});
	});
	describe('DELETE /cart', () => {
		beforeEach(() => {
			jest.clearAllMocks();
		});

		it('should delete a cart link and return 204 status', async () => {
			const offerID = 'offer123';
			const userID = 'user123';
			mockedDeleteCartLinkFromDB.mockResolvedValue(undefined);

			const response = await supertest(app).delete(`/cart?offerID=${offerID}`);

			expect(response.status).toEqual(204);
			expect(mockedDeleteCartLinkFromDB).toHaveBeenCalledWith(offerID, userID);
		});

		it('should handle errors and return 500 status', async () => {
			const offerID = 'offer123';
			const errorMessage = 'Database error';
			mockedDeleteCartLinkFromDB.mockRejectedValue(new Error(errorMessage));

			const response = await supertest(app).delete(`/cart?offerID=${offerID}`);

			expect(response.status).toEqual(500);
			expect(response.body.message).toEqual(errorMessage);
		});
	});
	describe('GET /cart', () => {
		beforeEach(() => {
			jest.clearAllMocks();
		});

		it('should get cart offers by user ID and return 200 status', async () => {
			const userID = 'user123';
			const mockedProducts = [
				{ id: '1', name: 'Product 1' },
				{ id: '2', name: 'Product 2' },
			];
			mockedGetCartOffersByUserFromDB.mockResolvedValue(mockedProducts);

			const response = await supertest(app).get('/cart');

			expect(response.status).toEqual(200);
			expect(response.body).toEqual(mockedProducts);
			expect(mockedGetCartOffersByUserFromDB).toHaveBeenCalledWith(userID);
		});

		it('should handle errors and return 500 status', async () => {
			const userID = 'userID';
			const errorMessage = 'Database error';
			mockedGetCartOffersByUserFromDB.mockRejectedValue(
				new Error(errorMessage)
			);

			const response = await supertest(app).get('/cart');

			expect(response.status).toEqual(500);
			expect(response.body.message).toEqual(errorMessage);
		});
	});
	describe('GET /cart/inctrement', () => {
		beforeEach(() => {
			jest.clearAllMocks();
		});

		it('should increment cart link by offer ID and user ID and return 202 status', async () => {
			const offerID = 'offer123';
			const userID = 'user123';
			const mockedAmount = 5;
			mockedIncrementCartLinkFromDB.mockResolvedValue(mockedAmount);

			const response = await supertest(app).get(
				`/cart/increment?offerID=${offerID}`
			);

			expect(response.status).toEqual(202);
			expect(response.body).toEqual(mockedAmount);
			expect(mockedIncrementCartLinkFromDB).toHaveBeenCalledWith(
				offerID,
				userID
			);
		});

		it('should handle errors and return 500 status', async () => {
			const offerID = 'offer123';
			const errorMessage = 'Database error';
			mockedIncrementCartLinkFromDB.mockRejectedValue(new Error(errorMessage));

			const response = await supertest(app).get(
				`/cart/increment?offerID=${offerID}`
			);

			expect(response.status).toEqual(500);
			expect(response.body.message).toEqual(errorMessage);
		});
	});
	describe('GET /cart/decrement', () => {
		beforeEach(() => {
			jest.clearAllMocks();
		});

		it('should decrement cart link by offer ID and user ID and return 202 status', async () => {
			const offerID = 'offer123';
			const userID = 'user123';
			const mockedAmount = 3;
			mockedDecrementCartLinkFromDB.mockResolvedValue(mockedAmount);

			const response = await supertest(app).get(
				`/cart/decrement?offerID=${offerID}`
			);

			expect(response.status).toEqual(202);
			expect(response.body).toEqual(mockedAmount);
			expect(mockedDecrementCartLinkFromDB).toHaveBeenCalledWith(
				offerID,
				userID
			);
		});

		it('should handle errors and return 500 status', async () => {
			const offerID = 'offer123';

			const errorMessage = 'Database error';
			mockedDecrementCartLinkFromDB.mockRejectedValue(new Error(errorMessage));

			const response = await supertest(app).get(
				`/cart/decrement?offerID=${offerID}`
			);

			expect(response.status).toEqual(500);
			expect(response.body.message).toEqual(errorMessage);
		});
	});
});
