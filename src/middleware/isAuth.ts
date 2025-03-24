import { Request, Response, NextFunction, RequestHandler } from "express";
import jwt from "jsonwebtoken";

interface AuthRequest extends Request {
	user?: any; // Add user property to Request
}

const isAuth: RequestHandler = (
	req: AuthRequest,
	res: Response,
	next: NextFunction
): void => {
	try {
		const authHeader = req.headers.authorization;

		if (!authHeader || !authHeader.startsWith("Bearer ")) {
			res.status(401).json({ message: "Unauthorized: No token provided" });
			return;
		}

		const token = authHeader.split(" ")[1]; // Extract token
		const secretKey = process.env.JWT_SECRET || "your_secret_key"; // Use environment variable

		jwt.verify(
			token,
			secretKey,
			(err: jwt.VerifyErrors | null, decoded: any) => {
				if (err) {
					res
						.status(403)
						.json({ message: "Forbidden: Invalid or expired token" });
					return;
				}

				(req as AuthRequest).user = decoded; // Attach user data to request
				next(); // Proceed to next middleware
			}
		);
	} catch (error) {
		res.status(500).json({ message: "Internal Server Error" });
	}
};

export default isAuth;
