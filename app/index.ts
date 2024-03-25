import express from "express";
import users from "./routes/userRoutes";
import { getAll, getByName } from "./routes/productRoutes";

const app = express();

app.use("/users", users);
app.use("/products", getAll);
app.use("/products", getByName);

export default app;
