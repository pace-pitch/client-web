import axios from "axios";

const api = axios.create({
  baseURL: "https://api.yageun.pro",
});

export default api;
