import express from 'express';
import {
	handleLogin,
	handleLogout,
	handleRefresToken,
	handleRegister,
} from '../controllers/authControllers';

const router = express.Router();

const login = router.post('/login', handleLogin);
const logout = router.get('/logout', handleLogout);
const register = router.post('/register', handleRegister);

const getAccessToken = router.get('/refresh', handleRefresToken);

export { getAccessToken, login, logout, register };
