import pg from "pg";
import "dotenv/config";

const dbConfig = {
	user: process.env.USER,
	password: process.env.PASSWORD,
	host: process.env.HOST,
	database: process.env.DATABASE,
	port: Number(process.env.DATABASE_PORT),
};

const connectToDatabase = async () => {
	const db = new pg.Client(dbConfig);
	await db.connect();
	return db;
};

export default connectToDatabase();
