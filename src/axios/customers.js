import axios from "axios";
require("dotenv").config();

export const getCustomers = async () =>
  axios.get(`${process.env.REACT_APP_API_URL}/customers`);
