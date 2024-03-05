import app from "./app/index";
import "dotenv/config";

const PORT = process.env.BACKEND_PORT || 3000;

app.listen(PORT, () => {
	console.log(`Server started on port ${PORT}`);
});
