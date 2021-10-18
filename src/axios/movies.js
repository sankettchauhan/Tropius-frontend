import axios from "axios";
import header from "./header";
require("dotenv").config();

export const getMovies = (token) =>
  axios.get(`${process.env.REACT_APP_API_URL}/movies`, header(token));

export const createMovie = (data, token) =>
  axios.post(`${process.env.REACT_APP_API_URL}/movies`, data, header(token));

export const getMovieById = (movieId, token) =>
  axios.post(`${process.env.REACT_APP_API_URL}/movies/movieId`, header(token));

export const searchMovie = (query) =>
  axios.request({
    method: "GET",
    url: process.env.REACT_APP_IMDB_API_URL,
    params: { q: query },
    headers: {
      "x-rapidapi-host": process.env.REACT_APP_RAPID_API_HOST_URL,
      "x-rapidapi-key": process.env.REACT_APP_RAPID_API_KEY,
    },
  });
