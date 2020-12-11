import express from "express";
import mongoose from "mongoose";

import Movies from "../models/Movies.model.js";

const router = express.Router();

export const getMovies = async (req, res) => {
  try {
    const getMovies = await Movies.find();

    res.status(200).json(getMovies);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getMovieById = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Movies.findById(id);

    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createNewMovie = async (req, res) => {
  const { category, description, movieImage, name, actors } = req.body;

  const newMovie = new Movies({ category, description, movieImage, name, actors });

  try {
    await newMovie.save();

    res.status(201).json(newMovie);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updateMovieById = async (req, res) => {
  const { id } = req.params;
  const { category, description, name, movieImage, actors } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No Movie with id: ${id}`);

  const updatedMovie = { name, category, description, actors, movieImage, _id: id };

  await Movies.findByIdAndUpdate(id, updatedMovie, { new: true });

  res.json(updatedMovie);
};

export const deleteMovie = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No Movie with id: ${id}`);

  await Movies.findByIdAndRemove(id);

  res.json({ message: "Movie deleted successfully." });
};

export const likeMovie = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No Movie with id: ${id}`);

  const movie = await Movies.findById(id);

  const updatedMovie = await Movies.findByIdAndUpdate(id, { likeCount: movie.likeCount + 1 }, { new: true });

  res.json(updatedMovie);
};

export default router;
