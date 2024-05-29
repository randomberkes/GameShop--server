import 'dotenv/config';
import app from './app/index';

const PORT = process.env.BACKEND_PORT || 3000;

const server = app.listen(PORT, () => {
	console.log(`Server started on port ${PORT}`);
});
export { server };
