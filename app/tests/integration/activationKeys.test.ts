import { describe, it } from '@jest/globals';
import { NextFunction } from 'express';
import supertest from 'supertest';
import app from '../../index';

// Mock the verifyJwt middleware
jest.mock(
	'../../middleware/verifyJWT',
	() => (req: any, res: any, next: NextFunction) => {
		req.id = 50;
		next();
	}
);

describe('activationKeyEndpoints', () => {
	describe('GET /activationKey/byOffer', () => {
		it('should return the activation key', async () => {
			const response = await supertest(app)
				.get('/activationKey/byOffer')
				.query({ offerID: 50 });

			expect(response.status).toEqual(200);
			expect(response.body[0].activationKey).toEqual('5050-5050-5050-5050');
		});
	});
	describe('GET /activationKey/byOwner', () => {
		it('should return the activation key', async () => {
			const response = await supertest(app)
				.get('/activationKey/byOwner')
				.query({ ownerID: 50 });

			expect(response.status).toEqual(200);
			expect(response.body[0].activationKey).toEqual('0505-0505-0505-0505');
		});
	});

	describe('GET /activationKey/byOwner', () => {
		it('should return the activation key', async () => {
			const response = await supertest(app)
				.get('/activationKey/byOwner')
				.query({ ownerID: 50 });

			expect(response.status).toEqual(200);
			expect(response.body[0].activationKey).toEqual('0505-0505-0505-0505');
		});
	});
});
