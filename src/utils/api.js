import axios from "axios";

export default (parmas) => ({
  getIndex: () => axios.get("/api/index", parmas),

  postRegister: () => axios.post("/api/auth/register", parmas),

  Login: () => axios.post("api/auth/login", parmas),

  getGoods: () => axios.get("/api/goods", parmas),

  getUser: () => axios.get("/api/user"),

  logout: () => axios.post("/api/auth/logout"),

  newToken: () => axios.post("/api/auth/refresh"),
});
