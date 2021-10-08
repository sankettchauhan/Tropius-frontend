import axios from "axios";
require("dotenv").config();

export const createUser = (user) =>
  axios.post(`${process.env.REACT_APP_API_URL}/users`, user);

export const getUser = (token) =>
  axios.get(`${process.env.REACT_APP_API_URL}/users/me`, token);

export const authenticateUser = (user) =>
  axios.post(`${process.env.REACT_APP_API_URL}/auth`, user);
