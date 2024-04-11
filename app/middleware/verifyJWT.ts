import jwt from "jsonwebtoken";
import "dotenv/config";

const verifyJWT = (req: any, res: any, next: any) => {
	const authHeader = req.headers["authorization"];
	if (!authHeader) return res.sendStatus(404);
	console.log(authHeader);
	const token = authHeader.split(" ")[1];
	jwt.verify(
		token,
		process.env.ACCESS_TOKEN_SECRET!,
		(err: any, decoded: any) => {
			if (err) return res.sendStatus(403); //invalid token
			req.user = decoded.name;
			next();
		}
	);
};

export default verifyJWT;
