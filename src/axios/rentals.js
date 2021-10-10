import axios from "axios";
import header from "./header";
require("dotenv").config();

export const getRental = async (token) =>
  axios.get(`${process.env.REACT_APP_API_URL}/rentals`, header(token));

export const createRental = async (data, token) =>
  axios.post(`${process.env.REACT_APP_API_URL}/rentals`, data, header(token));
