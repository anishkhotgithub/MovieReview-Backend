import prisma from "../config/prisma";
class movieService {
	async createMovie(request: any): Promise<{ data: Object }> {
		let record = {};
		try {
			let user = await prisma.user.findUnique({
				where: {
					email: request.body.email,
					type: "admin",
				},
			});
			console.log(user, "xsxs");
			if (user) {
				let data = await prisma.movie.create({
					data: {
						title: request.body.title,
						description: request.body.description,
						releaseDate: new Date(request.body.releaseDate),
						image: request.body.image,
					},
				});
				if (data) {
					record = "Successfully created";
				}
			} else {
				record = "User Not found or user is not Admin";
			}
		} catch (error) {
			console.log(error, "error");
			throw new Error();
		}
		return { data: record };
	}
	async updateMovie(request: any): Promise<{ data: Object }> {
		let record = {};
		try {
			let user = await prisma.user.findUnique({
				where: {
					email: request.body.email,
					type: "admin",
				},
			});
			if (user) {
				let data = await prisma.movie.update({
					where: {
						id: request.body.id,
					},
					data: {
						title: request.body.title,
						description: request.body.description,
						releaseDate: new Date(request.body.releaseDate),
						image: request.body.image,
					},
				});
			} else {
				record = "User Not found or user is not Admin";
			}
		} catch (error) {
			console.log(error, "error");
			throw new Error();
		}
		return { data: record };
	}
	async deleteMovie(request: any): Promise<{ data: Object | string }> {
		try {
			let user = await prisma.user.findUnique({
				where: { email: request.body.email },
			});

			if (!user || user.type !== "admin") {
				return { data: "User not found or user is not an admin" };
			}

			const deletedMovie = await prisma.movie.delete({
				where: { id: parseInt(request.body.id) },
			});

			return { data: deletedMovie };
		} catch (error) {
			console.error("Error deleting movie:", error);
			return { data: "An error occurred while deleting the movie" };
		}
	}
	async getMovies(request: any): Promise<{ data: Object }> {
		let record = {};
		let total = {};
		const page = request.body.page;
		const pageSize = request.body.pageSize;
		try {
			let searchQuery = request.body.searchQuery
				? request.body.searchQuery
				: "";
			total = await prisma.movie.count({
				where: { title: { contains: searchQuery, mode: "insensitive" } },
			});
			record = await prisma.movie.findMany({
				where: { title: { contains: searchQuery, mode: "insensitive" } },
				include: {
					reviews: {
						include: {
							user: { select: { name: true, email: true } },
						},
					},
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
	async getMoviesReviews(request: any): Promise<{ data: Object }> {
		let record = {};
		let total = {};
		const page = request.body.page;
		const pageSize = request.body.pageSize;
		try {
			let searchQuery = request.body.searchQuery
				? request.body.searchQuery
				: "";
			total = await prisma.review.count({
				where: { movieId: request.body.movieId },
			});
			record = await prisma.review.findMany({
				where: { movieId: request.body.movieId },
				include: {
					user: { select: { name: true, email: true } },
				},
				skip: (page - 1) * pageSize,
				take: pageSize,
				orderBy: { createdAt: request.body.sort },
			});
		} catch (error) {
			console.log(error, "error");
			throw new Error();
		}
		return { data: { record: record, totalData: total } };
	}
	async AddMovieReviews(request: any): Promise<{ data: Object }> {
		let record = {};
		try {
			const movie = await prisma.movie.findUnique({
				where: { id: request.body.movieId },
			});
			if (!movie) return { data: "Movie not found" };

			// Create review
			const review = await prisma.review.create({
				data: {
					userId: request.body.userId,
					movieId: request.body.movieId,
					rating: request.body.rating,
					comment: request.body.comment,
				},
			});
		} catch (error) {
			console.log(error, "error");
			throw new Error();
		}
		return { data: record };
	}
	async UpdateMovieReviews(request: any): Promise<{ data: Object }> {
		let record = {};
		try {
			const movie = await prisma.movie.findUnique({
				where: { id: request.body.movieId },
			});
			if (!movie) return { data: "Movie not found" };

			// Create review
			const review = await prisma.review.update({
				where: {
					id: request.body.id,
				},
				data: {
					rating: request.body.rating,
					comment: request.body.comment,
				},
			});
			if (review) {
				record = "Updated Successfully";
			}
		} catch (error) {
			console.log(error, "error");
			throw new Error();
		}
		return { data: record };
	}
	async DeleteMovieReviews(request: any): Promise<{ data: Object }> {
		let record = {};
		let review = {};
		try {
			const movie = await prisma.movie.findUnique({
				where: { id: request.body.movieId },
			});
			if (!movie) return { data: "Movie not found" };
			let user = await prisma.user.findUnique({
				where: {
					email: request.body.email,
				},
			});
			if (!user) return { data: "User not found" };
			// Create review
			if (user && user?.type === "admin") {
				review = await prisma.review.delete({
					where: {
						id: request.body.id,
					},
				});
			} else {
				review = await prisma.review.delete({
					where: {
						id: request.body.id,
						userId: user.id,
						movieId: request.body.movieId,
					},
				});
			}
		} catch (error) {
			console.log(error, "error");
			throw new Error();
		}
		return { data: record };
	}
}
export default new movieService();
