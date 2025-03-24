import "reflect-metadata";
import express from "express";
import config from "./api/config/config";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./api/index";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use(config.api.prefix, routes());
// app.get("/routes", (req, res) => {
// 	res.send(app._router.stack);
// });

app.listen(PORT, () => {
	console.log(`
        ##########################################
        🛡️  Server listening on port: ${config.port} 🛡️
        ##########################################
        `);
});
