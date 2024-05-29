import { describe, it } from '@jest/globals';
import supertest from 'supertest';
import app from '../../index';

describe('userEndpoints', () => {
	describe('GET /user/email', () => {
		it('should return its user information', async () => {
			const response = await supertest(app)
				.get('/user/email')
				.query({ email: 'naruto-uzumaki@gmail.com' });

			expect(response.status).toEqual(200);
			expect(response.body.email).toEqual('naruto-uzumaki@gmail.com');
		});

		it('should return 401', async () => {
			const response = await supertest(app)
				.get('/user/email')
				.query({ email: 'inexisting-email@gmail.com' });

			expect(response.status).toEqual(401);
		});
	});
});
