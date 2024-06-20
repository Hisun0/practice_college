import axios from "axios";

export default axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? 'http://158.160.89.12:3000/' : 'http://localhost:3000/',
  headers: {'Content-Type': 'application/json'},
  withCredentials: false
});
