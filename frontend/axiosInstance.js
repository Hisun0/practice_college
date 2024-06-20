import axios from "axios";

export default axios.create({
  baseURL: 'https://backend:3000/',
  headers: {'Content-Type': 'application/json'},
  withCredentials: false
});