import express from 'express';
import verifyJWT from '../middleware/verifyJWT';

import {
	handleAddActivationKeyToOffer,
	handleAddActivationKeyToOwner,
	handleGetActivationKeysByOfferLink,
	handleGetActivationKeysByOwnerLink,
	handleGetOwnerLinks,
	handleNewAddActivationKeyToOffer,
} from '../controllers/activationKeyController';

const activationKeyRouter = express.Router();

activationKeyRouter
	.get('/byOffer', verifyJWT, handleGetActivationKeysByOfferLink)
	.get('/byOwner', verifyJWT, handleGetActivationKeysByOwnerLink)
	.post('/addToOffer', verifyJWT, handleAddActivationKeyToOffer)
	.post('/addNewToOffer', verifyJWT, handleNewAddActivationKeyToOffer)
	.post('/addToOwner', verifyJWT, handleAddActivationKeyToOwner)
	.route('/OwnerLinnk')
	.get(verifyJWT, handleGetOwnerLinks);

export { activationKeyRouter };
