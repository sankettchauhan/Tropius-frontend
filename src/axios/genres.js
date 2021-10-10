import axios from "axios";
import header from "./header";
require("dotenv").config();

export const getGenres = async (token) =>
  axios.get(`${process.env.REACT_APP_API_URL}/genres`, header(token));

export const createGenre = async (data, token) =>
  axios.post(`${process.env.REACT_APP_API_URL}/genres`, data, header(token));
