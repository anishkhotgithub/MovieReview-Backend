import { Router } from "express";
import movieController from "../controller/movies";
import isAuth from "../../middleware/isAuth";
const router = Router();
export default (app: Router) => {
	app.use("/movie", router);
	router.post("/createMovie", isAuth, movieController.createMovie);
	router.post("/updateMovie", isAuth, movieController.updateMovie);
	router.post("/deleteMovie", isAuth, movieController.deleteMovie);
	router.post("/getMovies", isAuth, movieController.getMovies);
	router.post("/getMoviesReviews", isAuth, movieController.getMoviesReviews);
	router.post("/AddMovieReviews", isAuth, movieController.AddMovieReviews);
	router.post(
		"/DeleteMovieReviews",
		isAuth,
		movieController.DeleteMovieReviews
	);
	router.post(
		"/UpdateMovieReviews",
		isAuth,
		movieController.UpdateMovieReviews
	);
};
