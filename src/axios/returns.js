import axios from "axios";
import header from "./header";
require("dotenv").config();

export const postReturn = async (data, token) =>
  axios.post(`${process.env.REACT_APP_API_URL}/returns`, data, header(token));
