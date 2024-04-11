import {
	getUserByEmailFromDB,
	getUserByRefreshTokenFromDB,
	addNewUserToDB,
	setUserRefreshToken,
} from "../services/userServices";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";

const handleRefresToken = async (req: Request, res: Response) => {
	const cookies = req.cookies;
	if (!cookies?.jwt) return res.sendStatus(401);
	console.log(cookies.jwt);
	const refreshToken = cookies.jwt;

	const rows = await getUserByRefreshTokenFromDB(refreshToken);
	if (rows.length < 0) return res.sendStatus(403);
	const foundUser = rows[0];
	console.log(foundUser);

	jwt.verify(
		refreshToken,
		process.env.REFRESH_TOKEN_SECRET!,
		(err: any, decoded: any) => {
			if (err || foundUser.name !== decoded.name) return res.sendStatus(403);
			const accessToken = jwt.sign(
				{ name: decoded.name },
				process.env.ACCESS_TOKEN_SECRET!,
				{ expiresIn: "5m" }
			);
			res.json({ accessToken });
		}
	);
};

const handleLogout = async (req: Request, res: Response) => {
	const cookies = req.cookies;
	if (!cookies?.jwt) return res.sendStatus(404); //OK, no content
	const refreshToken = cookies.jwt;

	// Is refreshToken in db ?
	const rows = await getUserByRefreshTokenFromDB(refreshToken);
	if (rows.length < 0) {
		res.clearCookie("jwt", { httpOnly: true });
		return res.sendStatus(404); //OK, no content
	}

	// Delete refreshToken from db
	const foundUser = rows[0];
	await setUserRefreshToken(foundUser.email, null);
	res.clearCookie("jwt", { httpOnly: true });
	res.sendStatus(204);
};

const handleRegister = async (req: Request, res: Response) => {
	const { name, email, password } = req.body;
	if (!email || !password || !email)
		return res
			.status(400)
			.json({ message: "Email, Password and Username are required. " });

	const saltRounds = 10;

	try {
		const hashedPassword = await bcrypt.hash(password, saltRounds);
		const userToSave = {
			name: name,
			email: email,
			hashedPassword: hashedPassword,
		};
		await addNewUserToDB(userToSave);
		res.status(201).json({ succes: `New user ${userToSave.name} created!` });
	} catch (err) {
		res.status(500).json({ message: err });
	}
};

const handleLogin = async (req: Request, res: Response) => {
	const { email, password } = req.body;
	if (!email || !password)
		return res
			.status(400)
			.json({ message: "Email and Password are required. " });
	const rows = await getUserByEmailFromDB(email);
	if (rows.length < 0) return res.sendStatus(401);
	const foundUser = rows[0];
	console.log(foundUser);
	const match = await bcrypt.compare(password, foundUser.password);
	if (match) {
		const accesToken = jwt.sign(
			{ name: foundUser.name },
			process.env.ACCESS_TOKEN_SECRET!,
			{ expiresIn: "5m" }
		);
		const refreshToken = jwt.sign(
			{ name: foundUser.name },
			process.env.REFRESH_TOKEN_SECRET!,
			{ expiresIn: "1d" }
		);
		await setUserRefreshToken(foundUser.email, refreshToken);
		res.cookie("jwt", refreshToken, {
			httpOnly: true,
			maxAge: 24 * 60 * 60 * 1000,
		});
		res.json({ accesToken });
	} else {
		res.sendStatus(401);
	}
};

export { handleLogin, handleLogout, handleRegister, handleRefresToken };