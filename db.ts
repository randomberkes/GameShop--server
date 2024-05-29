import 'dotenv/config';
import pg from 'pg';

const dbConfig = {
	user: process.env.USER,
	password: process.env.PASSWORD,
	host: process.env.HOST,
	database: process.env.DATABASE,
	port: Number(process.env.DATABASE_PORT),
};

const connectToDatabase = async (query: (db: pg.Client) => any) => {
	const db = new pg.Client(dbConfig);
	await db.connect();
	const value = await query(db);
	await db.end();
	return value;
};

export default connectToDatabase;
