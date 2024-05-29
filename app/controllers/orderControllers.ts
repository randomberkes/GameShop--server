import { transferActivationTokenOwnership } from '../services/activationKeyServices';
import { deleteAllCartLinksByUserFromDB } from '../services/cartServices';
import {
	addNewOrderToDB,
	addOrderItemLinkToDB,
	getActivationKeyIDsByOfferIDFromDB,
	getOrderIDsByUserFromDB,
	getOrderItemIDsByOrderFromDB,
} from '../services/orderServices';
import {
	addNewOnerLinkToDB,
	getOnerLinkByUserAndProduct,
} from '../services/ownerServices';

const handleAddOrder = async (req: any, res: any) => {
	const price = req.body.price;
	const orderItems = req.body.orderItems;
	const userID = req.id;
	try {
		const orderID = await addNewOrderToDB(price, userID);
		orderItems.forEach(
			async (orderItem: {
				amount: number;
				offerID: number;
				productID: number;
			}) => {
				try {
					await addNewOnerLinkToDB(orderItem.productID, userID);
				} catch (err) {}
			}
		);

		orderItems.forEach(
			async (orderItem: {
				amount: number;
				offerID: number;
				productID: number;
			}) => {
				await addOrderItemLinkToDB(
					orderItem.offerID,
					orderID,
					orderItem.amount
				);
				const activationKeyIDs = await getActivationKeyIDsByOfferIDFromDB(
					orderItem.offerID
				);
				let index = 0;
				const OnerLinkID = await getOnerLinkByUserAndProduct(
					userID,
					orderItem.productID
				);
				while (index < orderItem.amount) {
					transferActivationTokenOwnership(
						OnerLinkID,
						activationKeyIDs[index].id
					);
					index++;
				}
			}
		);

		await deleteAllCartLinksByUserFromDB(userID);
		res.sendStatus(201);
	} catch (err: any) {
		res.status(500).json({ message: err.message });
	}
};
const handleGetOrderIDsByUser = async (req: any, res: any) => {
	const userID = req.id;
	try {
		const orderID = await getOrderIDsByUserFromDB(userID);
		res.status(200).json(orderID);
	} catch (err: any) {
		res.status(500).json({ message: err.message });
	}
};

const handleGetOrderItemIDsByOrder = async (req: any, res: any) => {
	const orderID = req.query.orderID;
	try {
		const orderItems = await getOrderItemIDsByOrderFromDB(orderID);
		res.status(200).json(orderItems);
	} catch (err: any) {
		res.status(500).json({ message: err.message });
	}
};

export {
	handleAddOrder,
	handleGetOrderIDsByUser,
	handleGetOrderItemIDsByOrder,
};
