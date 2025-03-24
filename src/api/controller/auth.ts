import { Request, Response, NextFunction } from "express";
import authService from "../service/auth";

class authController {
	createUser = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const students = await authService.createUser(req);
			res.status(200).json({
				code: 200,
				message: "success",
				data: students,
			});
		} catch (error) {
			console.error("Error fetching students:", error);
			res.status(500).json({
				code: 500,
				message: "Internal Server Error",
				error: error instanceof Error ? error.message : error,
			});
		}
	};
	loginUser = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const students = await authService.loginUser(req);
			res.status(200).json({
				code: 200,
				message: "success",
				data: students,
			});
		} catch (error) {
			console.error("Error fetching students:", error);
			res.status(500).json({
				code: 500,
				message: "Internal Server Error",
				error: error instanceof Error ? error.message : error,
			});
		}
	};
	getUsers = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const students = await authService.getUsers(req);
			res.status(200).json({
				code: 200,
				message: "success",
				data: students,
			});
		} catch (error) {
			console.error("Error fetching students:", error);
			res.status(500).json({
				code: 500,
				message: "Internal Server Error",
				error: error instanceof Error ? error.message : error,
			});
		}
	};
}
export default new authController();
