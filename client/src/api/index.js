import axios from "axios";

const url = "http://localhost:5000/movies";

export const fetchMovies = () => axios.get(url);
export const createNewMovie = (newPost) => axios.post(url, newPost);
export const likeMovie = (id) => axios.patch(`${url}/${id}/likeMovie`);
export const updateMovieById = (id, updatedPost) => axios.patch(`${url}/${id}`, updatedPost);
export const deleteMovie = (id) => axios.delete(`${url}/${id}`);
