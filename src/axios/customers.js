import axios from "axios";
import header from "./header";
require("dotenv").config();

export const getCustomers = async (token) =>
  axios.get(`${process.env.REACT_APP_API_URL}/customers`, header(token));
