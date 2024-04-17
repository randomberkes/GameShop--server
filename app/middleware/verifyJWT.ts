import jwt from "jsonwebtoken";
import "dotenv/config";

const verifyJWT = (req: any, res: any, next: any) => {
	const authHeader = req.headers.authorization || req.headers.Authorization;
	if (!authHeader?.startsWith("Bearer ")) return res.sendStatus(404);
	const token = authHeader.split(" ")[1];
	jwt.verify(
		token,
		process.env.ACCESS_TOKEN_SECRET!,
		(err: any, decoded: any) => {
			if (err) return res.sendStatus(403); //invalid token
			req.user = decoded.UserInfo.name;
			req.roles = decoded.UserInfo.roles;
			next();
		}
	);
};

export default verifyJWT;
