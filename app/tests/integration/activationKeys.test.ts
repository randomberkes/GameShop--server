import { NextFunction } from 'express';
import supertest from 'supertest';
import app from '../../index';
import {
	addActivationKeyToOfferInDB,
	getActivationKeysByOwnerLinkFromDB,
	getOwnerLinksFromDB,
	transferActivationTokenOwnership,
} from '../../services/activationKeyServices';
import {
	addNewOfferLinkToDB,
	getOfferLinkByUserAndProduct,
} from '../../services/offerServices';
import {
	addNewOnerLinkToDB,
	getOnerLinkByUserAndProduct,
} from '../../services/ownerServices';
jest.mock(
	'../../middleware/verifyJWT',
	() => (req: any, res: any, next: NextFunction) => {
		req.id = 'userID';
		next();
	}
);
jest.mock('../../services/activationKeyServices');
jest.mock('../../services/offerServices');
jest.mock('../../services/ownerServices');

const mockedGetOwnerLinksFromDB = getOwnerLinksFromDB as jest.Mock;
const mockedGetActivationKeysByOwnerLinkFromDB =
	getActivationKeysByOwnerLinkFromDB as jest.Mock;
const mockedGetOfferLinkByUserAndProduct =
	getOfferLinkByUserAndProduct as jest.Mock;
const mockedAddActivationKeyToOfferInDB =
	addActivationKeyToOfferInDB as jest.Mock;
const mockedAddNewOfferLinkToDB = addNewOfferLinkToDB as jest.Mock;
const mockedGetOnerLinkByUserAndProduct =
	getOnerLinkByUserAndProduct as jest.Mock;
const mockedTransferActivationTokenOwnership =
	transferActivationTokenOwnership as jest.Mock;
const mockedAddNewOnerLinkToDB = addNewOnerLinkToDB as jest.Mock;

describe('activationKeyEndpoints', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});
	describe('GET /activationKey/OwnerLinnk', () => {
		it('should return owner links when valid userID is provided', async () => {
			const ownerLinks = [{ id: 'linkID', userID: 'userID' }];
			mockedGetOwnerLinksFromDB.mockResolvedValue(ownerLinks);

			const response = await supertest(app).get('/activationKey/OwnerLinnk');

			expect(mockedGetOwnerLinksFromDB).toHaveBeenCalledWith('userID');

			expect(response.status).toEqual(200);
			expect(response.body).toEqual(ownerLinks);
		});

		it('should handle errors and return 500 status when a database error emerges', async () => {
			const errorMessage = 'Database error';
			mockedGetOwnerLinksFromDB.mockRejectedValue(new Error(errorMessage));

			const response = await supertest(app).get('/activationKey/OwnerLinnk');

			expect(response.status).toEqual(500);
			expect(response.body.message).toEqual(errorMessage);
		});
	});
	describe('GET /activationKeybyOwner', () => {
		it('should return activation keys when ownerID is valid', async () => {
			const activationKeys = [{ id: 'key1', ownerID: 'owner123' }];
			mockedGetActivationKeysByOwnerLinkFromDB.mockResolvedValue(
				activationKeys
			);

			const response = await supertest(app)
				.get('/activationKey/byOwner')
				.query({ ownerID: 'owner123' });

			expect(mockedGetActivationKeysByOwnerLinkFromDB).toHaveBeenCalledWith(
				'owner123'
			);

			expect(response.status).toEqual(200);
			expect(response.body).toEqual(activationKeys);
		});

		it('should return 500 and error message when database error emerges', async () => {
			const errorMessage = 'Database error';
			mockedGetActivationKeysByOwnerLinkFromDB.mockRejectedValue(
				new Error(errorMessage)
			);

			const response = await supertest(app)
				.get('/activationKey/byOwner')
				.query({ ownerID: 'owner123' });

			expect(response.status).toEqual(500);
			expect(response.body.message).toEqual(errorMessage);
		});
	});
	describe('POST /activationKey/addToOffer', () => {
		beforeEach(() => {
			jest.clearAllMocks();
		});

		it('should add activation key to offer and return 201 when offer link is present', async () => {
			mockedGetOfferLinkByUserAndProduct.mockResolvedValue('offer123');
			mockedAddActivationKeyToOfferInDB.mockResolvedValue({});

			const response = await supertest(app)
				.post('/activationKey/addToOffer')
				.send({ activationKeyID: 'key1', productID: 'prod123' });

			expect(mockedGetOfferLinkByUserAndProduct).toHaveBeenCalledWith(
				'userID',
				'prod123'
			);
			expect(mockedAddActivationKeyToOfferInDB).toHaveBeenCalledWith(
				'offer123',
				'key1'
			);
			expect(response.status).toEqual(201);
		});

		it('should add new offer link and activation key to offer and return 201 when no offer link', async () => {
			mockedGetOfferLinkByUserAndProduct.mockResolvedValue(null);
			mockedAddNewOfferLinkToDB.mockResolvedValue('newOffer123');
			mockedAddActivationKeyToOfferInDB.mockResolvedValue({});

			const response = await supertest(app)
				.post('/activationKey/addToOffer')
				.send({ activationKeyID: 'key1', productID: 'prod123' });

			expect(mockedGetOfferLinkByUserAndProduct).toHaveBeenCalledWith(
				'userID',
				'prod123'
			);
			expect(mockedAddNewOfferLinkToDB).toHaveBeenCalledWith(
				'prod123',
				'userID',
				0
			);
			expect(mockedAddActivationKeyToOfferInDB).toHaveBeenCalledWith(
				'newOffer123',
				'key1'
			);
			expect(response.status).toEqual(201);
		});

		it('should handle errors and return 500 status when a database error emerges', async () => {
			const errorMessage = 'Database error';
			mockedGetOfferLinkByUserAndProduct.mockRejectedValue(
				new Error(errorMessage)
			);

			const response = await supertest(app)
				.post('/activationKey/addToOffer')
				.send({ activationKeyID: 'key1', productID: 'prod123' });

			expect(response.status).toEqual(500);
			expect(response.body.message).toEqual(errorMessage);
		});
	});
	describe('POST /activationKey/addToOwner', () => {
		it('should transfer activation token ownership and return 201', async () => {
			mockedGetOnerLinkByUserAndProduct.mockResolvedValue('owner123');
			mockedTransferActivationTokenOwnership.mockResolvedValue({});

			const response = await supertest(app)
				.post('/activationKey/addToOwner')
				.send({ activationKeyID: 'key1', productID: 'prod123' });

			expect(mockedGetOnerLinkByUserAndProduct).toHaveBeenCalledWith(
				'userID',
				'prod123'
			);
			expect(mockedTransferActivationTokenOwnership).toHaveBeenCalledWith(
				'owner123',
				'key1'
			);
			expect(response.status).toEqual(201);
		});

		it('should add new owner link and transfer activation token ownership and return 201', async () => {
			mockedGetOnerLinkByUserAndProduct.mockResolvedValue(null);
			mockedAddNewOnerLinkToDB.mockResolvedValue('newOwner123');
			mockedTransferActivationTokenOwnership.mockResolvedValue({});

			const response = await supertest(app)
				.post('/activationKey/addToOwner')
				.send({ activationKeyID: 'key1', productID: 'prod123' });

			expect(mockedGetOnerLinkByUserAndProduct).toHaveBeenCalledWith(
				'userID',
				'prod123'
			);
			expect(mockedAddNewOnerLinkToDB).toHaveBeenCalledWith(
				'prod123',
				'userID'
			);
			expect(mockedTransferActivationTokenOwnership).toHaveBeenCalledWith(
				'newOwner123',
				'key1'
			);
			expect(response.status).toEqual(201);
		});

		it('should handle errors and return 500 status when a database error emerges', async () => {
			const errorMessage = 'Database error';
			mockedGetOnerLinkByUserAndProduct.mockRejectedValue(
				new Error(errorMessage)
			);
			const response = await supertest(app)
				.post('/activationKey/addToOwner')
				.send({ activationKeyID: 'key1', productID: 'prod123' });

			expect(response.status).toEqual(500);
			expect(response.body.message).toEqual(errorMessage);
		});
	});
});
