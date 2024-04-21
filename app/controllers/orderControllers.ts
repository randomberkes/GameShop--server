import {
	deleteAllCartLinksByUserFromDB,
	getCartProductsByUserFromDB,
} from "../services/cartServices";
import {
	addNewOrderToDB,
	addOrderItemLinkToDB,
} from "../services/orderServices";

const handleAddOrder = async (req: any, res: any) => {
	const price = req.body.price;
	const orderItems = req.body.orderItems;
	console.log(orderItems);
	const userID = req.id;
	try {
		const orderID = await addNewOrderToDB(price, userID);
		orderItems.forEach(
			async (orderItem: { amount: number; productID: number }) => {
				await addOrderItemLinkToDB(
					orderID,
					orderItem.amount,
					orderItem.productID
				);
			}
		);
		await deleteAllCartLinksByUserFromDB(userID);
		res.sendStatus(201);
	} catch (err) {
		res.status(500).json({ message: err });
	}
};

export { handleAddOrder };
