import axios from "axios";

const api = axios.create({
  baseURL: "https://api.yageun.pro/api",
});

export default api;
