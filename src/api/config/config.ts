import dotenv from "dotenv";

// process.env.NODE_ENV = process.env.NODE_ENV || "development";

const envFound = dotenv.config();
if (envFound.error) {
	throw new Error("⚠️  Couldn't find .env file  ⚠️");
}
export default {
	port: process.env.PORT,
	api: {
		prefix: "/api",
	},
	jwtSecret: process.env.JWT_SECRET,
	jwtAlgorithm: process.env.JWT_ALGO,
};
