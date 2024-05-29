import { NextFunction } from 'express';
import supertest from 'supertest';
import app from '../../index';
import {
	getAllProductsCountFromDB,
	getAllProductsForNewOfferFromDB,
	getAllProductsFromDB,
	getProductByIDFromDB,
	getProductsByFilterFromDB,
	getProductsByNameFromDB,
	getProductsCountByFilterFromDB,
} from '../../services/productServices';
jest.mock('../../services/productServices');
jest.mock(
	'../../middleware/verifyJWT',
	() => (req: any, res: any, next: NextFunction) => {
		req.id = 'user123';
		next();
	}
);

const mockedGetAllProductsFromDB = getAllProductsFromDB as jest.Mock;
const mockedGetAllProductsForNewOfferFromDB =
	getAllProductsForNewOfferFromDB as jest.Mock;
const mockedGetProductsByNameFromDB = getProductsByNameFromDB as jest.Mock;
const mockedGetProductByIDFromDB = getProductByIDFromDB as jest.Mock;
const mockedGetAllProductsCountFromDB = getAllProductsCountFromDB as jest.Mock;
const mockedGetProductsByFilterFromDB = getProductsByFilterFromDB as jest.Mock;
const mockedGetProductsCountByFilterFromDB =
	getProductsCountByFilterFromDB as jest.Mock;

describe('productsEndpoints', () => {
	describe('GET /products/all', () => {
		beforeEach(() => {
			jest.clearAllMocks();
		});

		it('should get products from DB with limit and offset and return 200 status', async () => {
			const products = [
				{ id: 1, name: 'Product A' },
				{ id: 2, name: 'Product B' },
			];
			const limit = '10';
			const offset = '0';
			mockedGetAllProductsFromDB.mockResolvedValue(products);

			const response = await supertest(app)
				.get('/products/all')
				.query({ limit: limit, offset: offset });

			expect(response.status).toEqual(200);
			expect(response.body).toEqual(products);
			expect(mockedGetAllProductsFromDB).toHaveBeenCalledWith(limit, offset);
		});

		it('should handle errors and return 500 status', async () => {
			const errorMessage = 'Database error';
			const limit = 10;
			const offset = 0;
			mockedGetAllProductsFromDB.mockRejectedValue(new Error(errorMessage));

			const response = await supertest(app)
				.get('/products/all')
				.query({ limit: limit, offset: offset });

			expect(response.status).toEqual(500);
			expect(response.body.message).toEqual(errorMessage);
		});
	});
	describe('GET /products/productsForNewOffer', () => {
		beforeEach(() => {
			jest.clearAllMocks();
		});

		it('should get products for new offer from DB and return 200 status', async () => {
			const products = [
				{ id: 1, name: 'Product A' },
				{ id: 2, name: 'Product B' },
			];
			mockedGetAllProductsForNewOfferFromDB.mockResolvedValue(products);

			const response = await supertest(app).get(
				'/products/productsForNewOffer'
			);

			expect(response.status).toEqual(200);
			expect(response.body).toEqual(products);
			expect(mockedGetAllProductsForNewOfferFromDB).toHaveBeenCalled();
		});

		it('should handle errors and return 500 status', async () => {
			const errorMessage = 'Database error';
			mockedGetAllProductsForNewOfferFromDB.mockRejectedValue(
				new Error(errorMessage)
			);

			const response = await supertest(app).get(
				'/products/productsForNewOffer'
			);

			expect(response.status).toEqual(500);
			expect(response.body.message).toEqual(errorMessage);
		});
	});
	describe('GET /products/search', () => {
		beforeEach(() => {
			jest.clearAllMocks();
		});

		it('should get products by name from DB and return 200 status', async () => {
			const name = 'TestProduct';
			const products = [{ id: 1, name: name }];
			mockedGetProductsByNameFromDB.mockResolvedValue(products);

			const response = await supertest(app)
				.get('/products/search')
				.query({ name: name });

			expect(response.status).toEqual(200);
			expect(response.body).toEqual(products);
			expect(mockedGetProductsByNameFromDB).toHaveBeenCalledWith(name);
		});

		it('should handle errors and return 500 status', async () => {
			const errorMessage = 'Database error';
			const name = 'TestProduct';
			mockedGetProductsByNameFromDB.mockRejectedValue(new Error(errorMessage));

			const response = await supertest(app)
				.get('/products/search')
				.query({ name: name });

			expect(response.status).toEqual(500);
			expect(response.body.message).toEqual(errorMessage);
		});
	});
	describe('GET /products?productID', () => {
		beforeEach(() => {
			jest.clearAllMocks();
		});

		it('should get product by ID from DB and return 200 status', async () => {
			const productID = '123';
			const product = { id: productID, name: 'TestProduct' };
			mockedGetProductByIDFromDB.mockResolvedValue({ rows: [product] });

			const response = await supertest(app)
				.get('/products')
				.query({ productID: productID });

			expect(response.status).toEqual(200);
			expect(response.body).toEqual(product);
			expect(mockedGetProductByIDFromDB).toHaveBeenCalledWith(productID);
		});

		it('should handle errors and return 500 status', async () => {
			const errorMessage = 'Database error';
			const productID = '123';
			mockedGetProductByIDFromDB.mockRejectedValue(new Error(errorMessage));

			const response = await supertest(app)
				.get('/products')
				.query({ productID: productID });

			expect(response.status).toEqual(500);
			expect(response.body.message).toEqual(errorMessage);
		});
	});
	describe('GET /products/filter', () => {
		beforeEach(() => {
			jest.clearAllMocks();
		});

		it('should get all products and return 200 status when no filter provided', async () => {
			const limit = '10';
			const page = '1';
			const products = [
				{ id: '1', name: 'Product1' },
				{ id: '2', name: 'Product2' },
			];
			const productsNumber = 20;
			const totalPageNumber = Math.ceil(productsNumber / Number(limit));
			mockedGetAllProductsFromDB.mockResolvedValue(products);
			mockedGetAllProductsCountFromDB.mockResolvedValue(productsNumber);

			const response = await supertest(app)
				.get('/products/filter')
				.query({ limit: limit, page: page });

			expect(response.status).toEqual(200);
			expect(response.body.products).toEqual(products);
			expect(response.body.totalPageNumber).toEqual(totalPageNumber);
		});

		it('should get filtered products and return 200 status when filter provided', async () => {
			const limit = '10';
			const page = '1';
			const filter = 'category:electronics';
			const products = [
				{ id: '3', name: 'Product3' },
				{ id: '4', name: 'Product4' },
			];
			const productsNumber = 15;
			const totalPageNumber = Math.ceil(productsNumber / Number(limit));
			mockedGetProductsByFilterFromDB.mockResolvedValue(products);
			mockedGetProductsCountByFilterFromDB.mockResolvedValue(productsNumber);

			const response = await supertest(app)
				.get('/products/filter')
				.query({ limit: limit, page: page, filter: filter });

			expect(response.status).toEqual(200);
			expect(response.body.products).toEqual(products);
			expect(response.body.totalPageNumber).toEqual(totalPageNumber);
		});

		it('should handle errors and return 500 status', async () => {
			const errorMessage = 'Database error';
			const limit = '10';
			const page = '1';
			mockedGetAllProductsFromDB.mockRejectedValue(new Error(errorMessage));

			const response = await supertest(app)
				.get('/products/filter')
				.query({ limit: limit, page: page });

			expect(response.status).toEqual(500);
			expect(response.body.message).toEqual(errorMessage);
		});
	});
});
