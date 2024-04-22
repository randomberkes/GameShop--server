import express from "express";
import cors from "cors";
import { userRouter } from "./routes/userRoutes";
import { productsRouter } from "./routes/productRoutes";
import { getCategoryTypes } from "./routes/categoryTypeRoutes";
import { getCategoriesByTypeRouter } from "./routes/categoryRoutes";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

import { login, logout, register, getAccessToken } from "./routes/authRoutes";
import { favoriteRouter } from "./routes/favoriteRoutes";
import { cartRouter, decrement, increment } from "./routes/cartRoutes";
import { orderRouter } from "./routes/orderRoutes";
import { offerRouter } from "./routes/offerRoutes";

const app = express();

const corsOptions = {
	credentials: true,
	origin: "http://localhost:3000",
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

//middleware for cookies
app.use(cookieParser());

app.use("/offer", offerRouter);
app.use("/order", orderRouter);

app.use("/cart", cartRouter);
app.use("/cart", increment);
app.use("/cart", decrement);
app.use("/favorite", favoriteRouter);

app.use("/auth", getAccessToken);
app.use("/auth", login);
app.use("/auth", logout);
app.use("/auth", register);

app.use("/user", userRouter);

app.use("/products", productsRouter);

app.use("/categoryTypes", getCategoryTypes);

app.use("/categories", getCategoriesByTypeRouter);

export default app;
