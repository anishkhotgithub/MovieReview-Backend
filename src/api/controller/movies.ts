import { Request, Response, NextFunction } from "express";
import movieService from "../service/movies";

class movieController {
	createMovie = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const students = await movieService.createMovie(req);
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
	updateMovie = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const students = await movieService.updateMovie(req);
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
	deleteMovie = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const students = await movieService.deleteMovie(req);
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
	getMovies = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const students = await movieService.getMovies(req);
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
	getMoviesReviews = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		try {
			const students = await movieService.getMoviesReviews(req);
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
	AddMovieReviews = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const students = await movieService.AddMovieReviews(req);
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
	DeleteMovieReviews = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		try {
			const students = await movieService.DeleteMovieReviews(req);
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
	UpdateMovieReviews = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		try {
			const students = await movieService.UpdateMovieReviews(req);
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
export default new movieController();
