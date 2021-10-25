import axios from "axios";
import header from "./header";
require("dotenv").config();

export const getCustomers = (token) =>
  axios.get(`${process.env.REACT_APP_API_URL}/customers`, header(token));

export const createCustomer = (data, token) =>
  axios.post(`${process.env.REACT_APP_API_URL}/customers`, data, header(token));

export const getCustomerById = (id, token) =>
  axios.get(`${process.env.REACT_APP_API_URL}/customers/${id}`, header(token));

export const updateCustomer = (customerid, data, token) =>
  axios.put(
    `${process.env.REACT_APP_API_URL}/customers/${customerid}`,
    data,
    header(token)
  );

export const deleteCustomer = (customerid, token) =>
  axios.delete(
    `${process.env.REACT_APP_API_URL}/customers/${customerid}`,
    header(token)
  );
