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

  //改变选中
  upChecked: () =>
    axios({ method: "PATCH", url: "/api/carts/checked", data: params }),

  //地址
  getAddress: () => axios.get("/api/address"),

  //地址详情
  getAddressdetail: () => axios.get(`/api/address/${params.id}`),

  //添加地址
  addAddress: () =>
    axios({ method: "post", url: "/api/address", data: params }),

  //删除地址
  deleteAddress: () =>
    axios({ method: "delete", url: `/api/address/${params.address}` }),

  //修改地址
  upAddress: () =>
    axios({
      method: "PUT",
      url: `/api/address/${params.address}`,
      data: params.data,
    }),

  //获取省市县数据
  getCity: () => axios.get("/api/city", { params }),

  //订单预览
  getPreview: () => axios.get("/api/orders/preview"),

  //提交订单
  postOrder: () => axios({ method: "post", url: "/api/orders", data: params }),

  //订单列表
  getOrders: () => axios.get("/api/orders", { params }),

  //订单详情
  getOrderDetail: () => axios.get(`/api/orders/${params.order}`),
});
