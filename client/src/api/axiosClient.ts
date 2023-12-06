import { baseURL } from "./urls";
import axios from "axios";

const axiosConfig = {
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  timeout: 10000,
  withCredentials: true,
};

export const axiosClient = axios.create(axiosConfig);
