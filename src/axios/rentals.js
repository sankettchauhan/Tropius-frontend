import axios from "axios";
import header from "./header";
require("dotenv").config();

export const getRentals = async (token) =>
  axios.get(`${process.env.REACT_APP_API_URL}/rentals`, header(token));

export const createRental = async (data, token) =>
  axios.post(`${process.env.REACT_APP_API_URL}/rentals`, data, header(token));
