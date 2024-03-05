import express from "express";
import users from "./routes/userRoutes";

const app = express();

app.use("/users", users);

export default app;
