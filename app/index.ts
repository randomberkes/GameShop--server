import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import { categoryRouter } from './routes/categoryRoutes';
import { categoryTypeRouter } from './routes/categoryTypeRoutes';
import { productsRouter } from './routes/productRoutes';
import { userRouter } from './routes/userRoutes';

import { activationKeyRouter } from './routes/activationKeyRoutes';
import { getAccessToken, login, logout, register } from './routes/authRoutes';
import { cartRouter, decrement, increment } from './routes/cartRoutes';
import { favoriteRouter } from './routes/favoriteRoutes';
import { offerRouter } from './routes/offerRoutes';
import { orderRouter } from './routes/orderRoutes';

const app = express();

const corsOptions = {
	credentials: true,
	origin: 'http://localhost:3000',
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

//middleware for cookies
app.use(cookieParser());

app.use('/activationKey', activationKeyRouter);

app.use('/offer', offerRouter);

app.use('/order', orderRouter);

app.use('/cart', cartRouter);
app.use('/cart', increment);
app.use('/cart', decrement);

app.use('/favorite', favoriteRouter);

app.use('/auth', getAccessToken);
app.use('/auth', login);
app.use('/auth', logout);
app.use('/auth', register);

app.use('/user', userRouter);

app.use('/products', productsRouter);

app.use('/categoryTypes', categoryTypeRouter);

app.use('/categories', categoryRouter);

export default app;
