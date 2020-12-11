import express from "express";

import { getMovies, getMovieById, createNewMovie, updateMovieById, deleteMovie, likeMovie } from "../controllers/movies.controller.js";

const router = express.Router();

router.get("/", getMovies);
router.post("/", createNewMovie);
router.get("/:id", getMovieById);
router.patch("/:id", updateMovieById);
router.delete("/:id", deleteMovie);
router.patch("/:id/likeMovie", likeMovie);

export default router;
