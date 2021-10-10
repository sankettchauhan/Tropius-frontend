import axios from "axios";
import header from "./header";
require("dotenv").config();

export const getMovies = async (token) =>
  axios.get(`${process.env.REACT_APP_API_URL}/movies`, header(token));

export const createMovie = async (data, token) =>
  axios.post(`${process.env.REACT_APP_API_URL}/movies`, data, header(token));
