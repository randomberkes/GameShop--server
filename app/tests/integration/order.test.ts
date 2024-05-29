import { NextFunction } from 'express';
import supertest from 'supertest';
import app from '../../index';
import { transferActivationTokenOwnership } from '../../services/activationKeyServices';
import { deleteAllCartLinksByUserFromDB } from '../../services/cartServices';
import {
	addNewOrderToDB,
	addOrderItemLinkToDB,
	getActivationKeyIDsByOfferIDFromDB,
	getOrderIDsByUserFromDB,
	getOrderItemIDsByOrderFromDB,
} from '../../services/orderServices';
import {
	addNewOnerLinkToDB,
	getOnerLinkByUserAndProduct,
} from '../../services/ownerServices';
jest.mock(
	'../../middleware/verifyJWT',
	() => (req: any, res: any, next: NextFunction) => {
		req.id = 'user123';
		next();
	}
);

jest.mock('../../services/ownerServices');
jest.mock('../../services/orderServices');
jest.mock('../../services/cartServices');
jest.mock('../../services/activationKeyServices');

const mockedAddNewOrderToDB = addNewOrderToDB as jest.Mock;
const mockedAddNewOnerLinkToDB = addNewOnerLinkToDB as jest.Mock;
const mockedAddOrderItemLinkToDB = addOrderItemLinkToDB as jest.Mock;
const mockedDeleteAllCartLinksByUserFromDB =
	deleteAllCartLinksByUserFromDB as jest.Mock;
const mockedGetActivationKeyIDsByOfferIDFromDB =
	getActivationKeyIDsByOfferIDFromDB as jest.Mock;
const mockedGetOnerLinkByUserAndProduct =
	getOnerLinkByUserAndProduct as jest.Mock;
const mockedTransferActivationTokenOwnership =
	transferActivationTokenOwnership as jest.Mock;
const mockedGetOrderIDsByUserFromDB = getOrderIDsByUserFromDB as jest.Mock;
const mockedGetOrderItemIDsByOrderFromDB =
	getOrderItemIDsByOrderFromDB as jest.Mock;

describe('orderEndpoints', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});
	describe('POST /order', () => {
		beforeEach(() => {
			jest.clearAllMocks();
		});

		it('should add a new order and return 201 status', async () => {
			const price = 100;
			const orderItems = [
				{ amount: 2, offerID: 1, productID: 1 },
				{ amount: 1, offerID: 2, productID: 2 },
			];
			const orderID = 'order123';
			const OnerLinkID = 'onelink123';
			const activationKeyIDs = [{ id: 'key123' }, { id: 'key456' }];
			mockedAddNewOrderToDB.mockResolvedValue(orderID);
			mockedGetActivationKeyIDsByOfferIDFromDB.mockResolvedValue(
				activationKeyIDs
			);
			mockedGetOnerLinkByUserAndProduct.mockResolvedValue(OnerLinkID);

			const response = await supertest(app)
				.post('/order')
				.send({ price, orderItems });

			expect(response.status).toEqual(201);
			const userID = 'user123';
			expect(mockedAddNewOrderToDB).toHaveBeenCalledWith(price, userID);
			expect(mockedDeleteAllCartLinksByUserFromDB).toHaveBeenCalledWith(userID);
			expect(mockedAddOrderItemLinkToDB).toHaveBeenCalledWith(
				orderItems[0].offerID,
				orderID,
				orderItems[0].amount
			);
			expect(mockedAddOrderItemLinkToDB).toHaveBeenCalledWith(
				orderItems[1].offerID,
				orderID,
				orderItems[1].amount
			);
			expect(mockedAddNewOnerLinkToDB).toHaveBeenCalledWith(
				orderItems[0].productID,
				userID
			);
			expect(mockedAddNewOnerLinkToDB).toHaveBeenCalledWith(
				orderItems[1].productID,
				userID
			);
			expect(mockedTransferActivationTokenOwnership).toHaveBeenCalledWith(
				OnerLinkID,
				activationKeyIDs[0].id
			);
			expect(mockedTransferActivationTokenOwnership).toHaveBeenCalledWith(
				OnerLinkID,
				activationKeyIDs[1].id
			);
		});

		it('should handle errors and return 500 status', async () => {
			const errorMessage = 'Database error';
			const price = 100;
			const orderItems = [
				{ amount: 2, offerID: 1, productID: 1 },
				{ amount: 1, offerID: 2, productID: 2 },
			];
			mockedAddNewOrderToDB.mockRejectedValue(new Error(errorMessage));

			const response = await supertest(app)
				.post('/order')
				.send({ price, orderItems });

			expect(response.status).toEqual(500);
			expect(response.body.message).toEqual(errorMessage);
		});
	});
	describe('GET /order', () => {
		beforeEach(() => {
			jest.clearAllMocks();
		});

		it('should return order IDs and 200 status', async () => {
			const orderIDs = ['order123', 'order456'];
			mockedGetOrderIDsByUserFromDB.mockResolvedValue(orderIDs);

			const response = await supertest(app).get('/order').expect(200);

			expect(response.body).toEqual(orderIDs);
		});

		it('should handle errors and return 500 status', async () => {
			const errorMessage = 'Database error';
			mockedGetOrderIDsByUserFromDB.mockRejectedValue(new Error(errorMessage));

			const response = await supertest(app).get('/order').expect(500);

			expect(response.body.message).toEqual(errorMessage);
		});
	});
	describe('GET /order/orderItem', () => {
		beforeEach(() => {
			jest.clearAllMocks();
		});

		it('should return order item IDs and 200 status', async () => {
			const orderID = 'order123';
			const orderItems = ['item123', 'item456'];
			mockedGetOrderItemIDsByOrderFromDB.mockResolvedValue(orderItems);

			const response = await supertest(app)
				.get(`/order/orderItem`)
				.query({ orderID: orderID })
				.expect(200);

			expect(response.body).toEqual(orderItems);
		});

		it('should handle errors and return 500 status', async () => {
			const orderID = 'order123';
			const errorMessage = 'Database error';
			mockedGetOrderItemIDsByOrderFromDB.mockRejectedValue(
				new Error(errorMessage)
			);

			const response = await supertest(app)
				.get(`/order/orderItem`)
				.query({ orderID: orderID })
				.expect(500);

			expect(response.body.message).toEqual(errorMessage);
		});
	});
});
