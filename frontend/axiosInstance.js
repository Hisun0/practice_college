import axios from "axios";

export default axios.create({
  baseURL: 'http://158.160.89.12:3000/',
  headers: {'Content-Type': 'application/json'},
  withCredentials: false
});
