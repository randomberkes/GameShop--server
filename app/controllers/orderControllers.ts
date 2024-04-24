import { deleteAllCartLinksByUserFromDB } from "../services/cartServices";
import {
	addNewOnerLinkToDB,
	addNewOrderToDB,
	addOrderItemLinkToDB,
	getActivationKeyIDsByOfferIDFromDB,
	getOnerLinkByUserAndProduct,
	getOrderIDsByUserFromDB,
	getOrderItemIDsByOrderFromDB,
	transferActivationTokenOwnership,
} from "../services/orderServices";

const handleAddOrder = async (req: any, res: any) => {
	const price = req.body.price;
	const orderItems = req.body.orderItems;
	console.log(orderItems);
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
				} catch (err) {
					console.log(err);
				}
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
				// activationKeyIDs.forEach((activationKeyID: any) => {
				// 	transferActivationTokenOwnership(userID, activationKeyID)
				// });
			}
		);

		await deleteAllCartLinksByUserFromDB(userID);
		res.sendStatus(201);
	} catch (err) {
		res.status(500).json({ message: err });
	}
};
const handleGetOrderIDsByUser = async (req: any, res: any) => {
	const userID = req.id;
	try {
		const orderID = await getOrderIDsByUserFromDB(userID);
		console.log(orderID);
		res.status(200).json(orderID);
	} catch (err) {
		res.status(500).json({ message: err });
	}
};

const handleGetOrderItemIDsByOrder = async (req: any, res: any) => {
	const orderID = req.query.orderID;
	try {
		const orderItems = await getOrderItemIDsByOrderFromDB(orderID);
		res.status(200).json(orderItems);
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: err });
	}
};

export {
	handleAddOrder,
	handleGetOrderItemIDsByOrder,
	handleGetOrderIDsByUser,
};
