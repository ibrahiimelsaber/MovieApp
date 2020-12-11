import { FETCH_ALL, CREATE, UPDATE, DELETE, LIKE } from "../constants/actionTypes";

import * as api from "../api/index.js";

export const getMovies = () => async (dispatch) => {
  try {
    const { data } = await api.fetchMovies();

    dispatch({ type: FETCH_ALL, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const createNewMovie = (post) => async (dispatch) => {
  try {
    const { data } = await api.createNewMovie(post);

    dispatch({ type: CREATE, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const updateMovieById = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updateMovieById(id, post);

    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const likeMovie = (id) => async (dispatch) => {
  try {
    const { data } = await api.likeMovie(id);

    dispatch({ type: LIKE, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteMovie = (id) => async (dispatch) => {
  try {
    await await api.deleteMovie(id);

    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log(error.message);
  }
};
