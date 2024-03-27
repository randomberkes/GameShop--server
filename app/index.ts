import express from "express";
import users from "./routes/userRoutes";
import { getAll, getByName } from "./routes/productRoutes";
import { getCategoryTypes } from "./routes/categoryTypeRoutes";
import { getCategoriesByTypeRouter } from "./routes/categoryRoutes";

const app = express();

app.use("/users", users);

app.use("/products", getAll);
app.use("/products", getByName);

app.use("/categoryTypes", getCategoryTypes);

app.use("/categories", getCategoriesByTypeRouter);

export default app;
