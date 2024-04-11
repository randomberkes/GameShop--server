import express from "express";
import cors from "cors";
import { getUsers, getUsersByEmail } from "./routes/userRoutes";
import {
	getAll,
	getByName,
	getProductsByFilterRouter,
} from "./routes/productRoutes";
import { getCategoryTypes } from "./routes/categoryTypeRoutes";
import { getCategoriesByTypeRouter } from "./routes/categoryRoutes";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

import { login, logout, register, getAccessToken } from "./routes/authRoutes";

const app = express();

const corsOptions = {
	origin: "http://localhost:3000",
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

//middleware for cookies
app.use(cookieParser());

app.use("/auth", getAccessToken);
app.use("/auth", login);
app.use("/auth", logout);
app.use("/auth", register);

app.use("/users", getUsers);
app.use("/users", getUsersByEmail);

app.use("/products", getAll);
app.use("/products", getByName);
app.use("/products", getProductsByFilterRouter);

app.use("/categoryTypes", getCategoryTypes);

app.use("/categories", getCategoriesByTypeRouter);

export default app;
