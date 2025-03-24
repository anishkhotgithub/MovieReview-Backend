import prisma from "../config/prisma";
import argon2 from "argon2";
import config from "../config/config";
import { randomBytes } from "crypto";
const jwt = require("jsonwebtoken");
class authService {
	async createUser(request: any): Promise<{ data: Object }> {
		let record = {};
		let hashedpassword = "";
		try {
			const salt = randomBytes(32);
			let email = await prisma.user.findUnique({
				where: { email: request.body.email },
			});
			if (email) {
				return { data: "email already exists" };
			}
			if (request.body.password) {
				hashedpassword = await argon2.hash(request.body.password, {
					salt,
				});
			}
			let data = await prisma.user.create({
				data: {
					name: request.body.name,
					email: request.body.email,
					password: hashedpassword,
					type: request.body.type ? request.body.type : "user",
					isActive: true,
					isDelete: false,
					token: "",
				},
			});
			if (data) {
				record = "User Created Successfully";
			}
			console.log(data, "xsxs");
		} catch (error) {
			console.log(error, "error");
			throw new Error();
		}
		return { data: record };
	}
	async loginUser(request: any): Promise<{ data: Object }> {
		let record = {};
		let validpassword, token;
		try {
			let user = await prisma.user.findUnique({
				where: { email: request.body.email },
			});
			if (!user) {
				return { data: "User Not registered" };
			}
			if (user) {
				validpassword = await argon2.verify(
					user.password,
					request.body.password
				);
				if (!validpassword) {
					return { data: "Invalid Password" };
				}
				let secret = config.jwtSecret;
				token = jwt.sign(
					{
						id: user.id,
						userEmail: user.email,
						userName: user.name,
					},
					secret,
					{
						expiresIn: process.env.ExpiresIN,
					}
				);
				let data = await prisma.user.update({
					where: { email: user.email },
					data: {
						token: token,
					},
				});
				if (data) {
					record = data;
				}
			}
		} catch (error) {
			console.log(error, "error");
			throw new Error();
		}
		return { data: record };
	}
	async getUsers(request: any): Promise<{ data: Object }> {
		let record = {};
		let total = {};
		const page = request.body.page;
		const pageSize = request.body.pageSize;
		try {
			let searchQuery = request.body.searchQuery
				? request.body.searchQuery
				: "";
			record = await prisma.user.findMany({
				where: {
					OR: [
						{ name: { contains: searchQuery, mode: "insensitive" } }, // Case-insensitive search
						{ email: { contains: searchQuery, mode: "insensitive" } },
					],
				},
				skip: (page - 1) * pageSize,
				take: pageSize,
				orderBy: { createdAt: "desc" },
			});
		} catch (error) {
			console.log(error, "error");
			throw new Error();
		}
		return { data: { record: record, totalData: total } };
	}
	async updateUsers(request: any): Promise<{ data: Object }> {
		let record = {};
		let hashedpassword = "";
		try {
			const salt = randomBytes(32);
			if (request.body.password) {
				hashedpassword = await argon2.hash(request.body.password, {
					salt,
				});
			}
			record = await prisma.user.update({
				where: {
					id: request.body.id,
				},
				data: {
					name: request.body.name,
					email: request.body.email,
					password: hashedpassword,
					type: request.body.type,
				},
			});
		} catch (error) {
			console.log(error, "error");
			throw new Error();
		}
		return { data: record };
	}
	async deleteUsers(request: any): Promise<{ data: Object }> {
		let record = {};
		try {
			record = await prisma.user.delete({
				where: {
					id: request.body.id,
				},
			});
		} catch (error) {
			console.log(error, "error");
			throw new Error();
		}
		return { data: record };
	}
}
export default new authService();
