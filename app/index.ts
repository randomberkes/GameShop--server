import express from "express";
import cors from "cors";
import users from "./routes/userRoutes";
import {
	getAll,
	getByName,
	getProductsByFilterRouter,
} from "./routes/productRoutes";
import { getCategoryTypes } from "./routes/categoryTypeRoutes";
import { getCategoriesByTypeRouter } from "./routes/categoryRoutes";
import bodyParser from "body-parser";

const app = express();

const corsOptions = {
	origin: "http://localhost:3000",
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

app.use("/users", users);

app.use("/products", getAll);
app.use("/products", getByName);
app.use("/products", getProductsByFilterRouter);

app.use("/categoryTypes", getCategoryTypes);

app.use("/categories", getCategoriesByTypeRouter);

export default app;
