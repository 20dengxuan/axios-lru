import axios from "axios";

export default (params) => ({
  getIndex: () => axios.get("/api/index", { params }),

  postRegister: () => axios.post("/api/auth/register", params),

  Login: () => axios.post("api/auth/login", params),

  getGoods: () => axios.get("/api/goods", { params }),

  getUser: () => axios.get("/api/user"),

  logout: () => axios.post("/api/auth/logout"),

  newToken: () => axios.post("/api/auth/refresh"),

  getDetail: () => axios.get(`/api/goods/${params.id}`),
  //购物车
  getCarts: () => axios.get("/api/carts", { params }),

  //地址
  getAddress: () => axios.get("/api/address"),

  //添加地址
  addAddress: () =>
    axios({ method: "post", url: "/api/address", data: params }),
});
