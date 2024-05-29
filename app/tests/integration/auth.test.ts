import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import supertest from 'supertest';
import { server } from '../../../server';
import app from '../../index';
import {
	addNewUserToDB,
	getUserByEmailFromDB,
	getUserByRefreshTokenFromDB,
	setUserRefreshToken,
} from '../../services/userServices';
jest.mock('../../services/userServices');
jest.mock('bcrypt');
jest.mock('jsonwebtoken');
const mockedAddNewUserToDB = addNewUserToDB as jest.Mock;
const mockedGetUserByEmailFromDB = getUserByEmailFromDB as jest.Mock;
const mockedJwtSign = jwt.sign as jest.Mock;
const mockedJwtVerify = jwt.verify as jest.Mock;
const mockedBcryptCompare = bcrypt.compare as jest.Mock;
const mockedGetUserByRefreshTokenFromDB =
	getUserByRefreshTokenFromDB as jest.Mock;
const mockedSetUserRefreshToken = setUserRefreshToken as jest.Mock;

describe('authEndpoints', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	describe('POST /auth/register', () => {
		beforeEach(() => {
			jest.clearAllMocks();
		});

		it('should register a new user and return 201 status when all input fields are provided', async () => {
			const userData = {
				name: 'Test User',
				email: 'test@example.com',
				password: 'password123',
				roles: ['user'],
			};

			const hashedPassword = 'hashedPassword123';
			mockedAddNewUserToDB.mockResolvedValue(undefined);
			(bcrypt.hash as jest.Mock).mockResolvedValue(hashedPassword);

			const response = await supertest(app)
				.post('/auth/register')
				.send(userData)
				.expect(201);

			expect(response.body).toEqual({
				success: `New user ${userData.name} created!`,
			});
		});

		it('should handle missing fields and return 400 status missing fields', async () => {
			const userData = {
				name: 'Test User',
				password: 'password123',
				roles: ['user'],
			};

			const response = await supertest(app)
				.post('/auth/register')
				.send(userData)
				.expect(400);

			expect(response.body).toEqual({
				message: 'Email, Password and Username are required. ',
			});
		});

		it('should handle errors and return 500 status when databe error emerges', async () => {
			const userData = {
				name: 'Test User',
				email: 'test@example.com',
				password: 'password123',
				roles: ['user'],
			};

			const errorMessage = 'Database error';
			mockedAddNewUserToDB.mockRejectedValue(new Error(errorMessage));
			(bcrypt.hash as jest.Mock).mockResolvedValue('hashedPassword123');

			const response = await supertest(app)
				.post('/auth/register')
				.send(userData)
				.expect(500);

			expect(response.body).toEqual({
				message: errorMessage,
			});
		});
	});
	describe('POST /auth/login', () => {
		beforeEach(() => {
			jest.clearAllMocks();
		});

		it('should handle missing fields and return 400 status when missing fields', async () => {
			const userData = {
				password: 'password123',
			};

			const response = await supertest(app)
				.post('/auth/login')
				.send(userData)
				.expect(400);

			expect(response.body).toEqual({
				message: 'Email and Password are required. ',
			});
		});

		it('should handle unknown user and return 401 status when user not found in DB', async () => {
			const userData = {
				email: 'unknown@example.com',
				password: 'password123',
			};

			mockedGetUserByEmailFromDB.mockResolvedValue([]);

			const response = await supertest(app)
				.post('/auth/login')
				.send(userData)
				.expect(401);

			expect(getUserByEmailFromDB).toHaveBeenCalledWith(userData.email);
		});

		it('should handle invalid password and return 401 status when wrong password is provided', async () => {
			const userData = {
				email: 'test@example.com',
				password: 'password123',
			};

			const foundUser = {
				name: 'Test User',
				roles: ['user'],
				id: 'user123',
				password: 'invalidPassword',
			};

			mockedGetUserByEmailFromDB.mockResolvedValue([foundUser]);
			mockedBcryptCompare.mockResolvedValue(false);

			const response = await supertest(app)
				.post('/auth/login')
				.send(userData)
				.expect(401);

			expect(bcrypt.compare).toHaveBeenCalledWith(
				userData.password,
				foundUser.password
			);
		});

		it('should login user and return access token when right credentials are provided', async () => {
			const userData = {
				email: 'test@example.com',
				password: 'password123',
			};

			const foundUser = {
				name: 'Test User',
				roles: ['user'],
				id: 'user123',
				password: 'hashedPassword123',
			};

			const accessToken = 'fakeAccessToken';
			const refreshToken = 'fakeRefreshToken';

			mockedGetUserByEmailFromDB.mockResolvedValue([foundUser]);
			mockedBcryptCompare.mockResolvedValue(true);
			mockedJwtSign
				.mockReturnValueOnce(accessToken)
				.mockReturnValueOnce(refreshToken);

			const response = await supertest(app)
				.post('/auth/login')
				.send(userData)
				.expect(200);

			expect(response.body).toEqual({
				accessToken,
				roles: foundUser.roles,
				name: foundUser.name,
			});
		});
	});
	describe('GET /auth/logout', () => {
		beforeEach(() => {
			jest.clearAllMocks();
		});

		it('should clear cookie and return 204 status when refresh token is found in DB', async () => {
			mockedGetUserByRefreshTokenFromDB.mockResolvedValue([
				{ email: 'test@example.com' },
			]);
			mockedSetUserRefreshToken.mockResolvedValue(undefined);

			const response = await supertest(app)
				.get('/auth/logout')
				.set('Cookie', 'jwt=mockedRefreshToken')
				.expect(204);

			expect(response.header['set-cookie'][0]).toContain(
				'jwt=; Path=/; Expires='
			);
		});

		it('should return 404 status when no refresh token is provided in the cookie', async () => {
			const response = await supertest(app).get('/auth/logout').expect(404);

			expect(response.header['set-cookie']).toBeUndefined();
		});
	});
	describe('GET /auth/refresh', () => {
		beforeEach(() => {
			jest.clearAllMocks();
		});

		afterAll((done) => {
			server.close(done); // Close the server after all tests
		});

		it('should return a new access token when provided with a valid refresh token', async () => {
			const refreshToken = 'valid_refresh_token';
			const accessToken = 'new_access_token';

			mockedGetUserByRefreshTokenFromDB.mockResolvedValue([
				{
					id: 123,
					name: 'Test User',
					roles: ['user'],
				},
			]);

			mockedJwtVerify.mockImplementation((token, secret, callback) => {
				callback(null, { name: 'Test User' });
			});

			mockedJwtSign.mockReturnValue(accessToken);

			const response = await supertest(app)
				.get('/auth/refresh')
				.set('Cookie', `jwt=${refreshToken}`)
				.expect(200);

			expect(response.body.accessToken).toBe(accessToken);
			expect(response.body.name).toBe('Test User');
			expect(response.body.roles).toEqual(['user']);
		});

		it('should return a 401 error when no refresh token is provided', async () => {
			const response = await supertest(app).get('/auth/refresh').expect(401);

			expect(response.body).toEqual({});
		});

		it('should return a 403 error when the refresh token is not found in the database', async () => {
			const refreshToken = 'non_existent_refresh_token';

			mockedGetUserByRefreshTokenFromDB.mockResolvedValue([]);

			const response = await supertest(app)
				.get('/auth/refresh')
				.set('Cookie', `jwt=${refreshToken}`)
				.expect(403);

			expect(response.body).toEqual({});
		});

		it('should return a 403 error when JWT verification fails', async () => {
			const refreshToken = 'invalid_refresh_token';

			mockedGetUserByRefreshTokenFromDB.mockResolvedValue([
				{
					id: 123,
					name: 'Test User',
					roles: ['user'],
				},
			]);

			mockedJwtVerify.mockImplementation((token, secret, callback) => {
				callback(new Error('Token verification failed'), null);
			});

			const response = await supertest(app)
				.get('/auth/refresh')
				.set('Cookie', `jwt=${refreshToken}`)
				.expect(403);

			expect(response.body).toEqual({});
		});
	});
});
