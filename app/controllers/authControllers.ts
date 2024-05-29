import bcrypt from 'bcrypt';
import 'dotenv/config';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import {
	addNewUserToDB,
	getUserByEmailFromDB,
	getUserByRefreshTokenFromDB,
	setUserRefreshToken,
} from '../services/userServices';

const handleRefresToken = async (req: Request, res: Response) => {
	const cookies = req.cookies;
	if (!cookies?.jwt) return res.sendStatus(401);
	const refreshToken = cookies.jwt;

	const rows = await getUserByRefreshTokenFromDB(refreshToken);
	if (rows.length < 1) return res.sendStatus(403);
	const foundUser = rows[0];

	jwt.verify(
		refreshToken,
		process.env.REFRESH_TOKEN_SECRET!,
		(err: any, decoded: any) => {
			if (err) return res.sendStatus(403);
			const accessToken = jwt.sign(
				{
					UserInfo: {
						name: decoded.name,
						roles: foundUser.roles,
						id: foundUser.id,
					},
				},
				process.env.ACCESS_TOKEN_SECRET!,
				{ expiresIn: '5m' }
			);
			res.json({
				accessToken,
				roles: foundUser.roles,
				name: foundUser.name,
				email: foundUser.email,
			});
		}
	);
};

const handleLogout = async (req: Request, res: Response) => {
	const cookies = req.cookies;
	if (!cookies?.jwt) return res.sendStatus(404);
	const refreshToken = cookies.jwt;

	const rows = await getUserByRefreshTokenFromDB(refreshToken);
	if (rows.length < 0) {
		res.clearCookie('jwt', { httpOnly: true, sameSite: 'none', secure: true });
		return res.sendStatus(404);
	}

	const foundUser = rows[0];
	await setUserRefreshToken(foundUser.email, null);
	res.clearCookie('jwt', { httpOnly: true });
	res.sendStatus(204);
};

const handleRegister = async (req: Request, res: Response) => {
	const { name, email, password, roles } = req.body;
	if (!email || !password || !email)
		return res
			.status(400)
			.json({ message: 'Email, Password and Username are required. ' });

	const saltRounds = 10;

	try {
		const hashedPassword = await bcrypt.hash(password, saltRounds);
		const userToSave = {
			name: name,
			email: email,
			roles: roles,
			hashedPassword: hashedPassword,
		};
		await addNewUserToDB(userToSave);
		res.status(201).json({ success: `New user ${userToSave.name} created!` });
	} catch (err: any) {
		res.status(500).json({ message: err.message });
	}
};

const handleLogin = async (req: Request, res: Response) => {
	const { email, password } = req.body;
	if (!email || !password)
		return res
			.status(400)
			.json({ message: 'Email and Password are required. ' });
	const rows = await getUserByEmailFromDB(email);
	if (rows.length < 1) return res.sendStatus(401);
	const foundUser = rows[0];

	const match = await bcrypt.compare(password, foundUser.password);
	if (match) {
		const accessToken = jwt.sign(
			{
				UserInfo: {
					name: foundUser.name,
					roles: foundUser.roles,
					id: foundUser.id,
				},
			},
			process.env.ACCESS_TOKEN_SECRET!,
			{ expiresIn: '5m' }
		);
		const refreshToken = jwt.sign(
			{ name: foundUser.name },
			process.env.REFRESH_TOKEN_SECRET!,
			{ expiresIn: '30m' }
		);
		await setUserRefreshToken(foundUser.email, refreshToken);
		res.cookie('jwt', refreshToken, {
			httpOnly: true,
			maxAge: 24 * 60 * 60 * 1000,
		});
		res.json({ accessToken, roles: foundUser.roles, name: foundUser.name });
	} else {
		res.sendStatus(401);
	}
};

export { handleLogin, handleLogout, handleRefresToken, handleRegister };
