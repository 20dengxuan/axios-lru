import axios from "axios";
import api from "./api";
import lruCache from "lru-cache";
import { getSessionStorage, setSessionStorage } from "../utils/storage";
import router from "../router";
import store from "../store";

// 请求拦截
axios.interceptors.request.use(
  (config) => {
    if (store.state.user.token !== "" && store.state.user.token) {
      config.headers.Authorization = store.state.user.token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          router.replace({
            path: "login",
          });
      }
    }
    return Promise.reject(error.response.data);
  }
);

const cacheObj = new lruCache({
  max: 10000, //缓存队列长度
  maxAge: 1000 * 60 * 30, //缓存时间
});

//type === 1 缓存到sessionStorage  type ===2 缓存到队列  其他不缓存
const setLocalCahce = (key, data, type) => {
  if (type === 1) {
    setSessionStorage(key, data);
  } else if (type === 2) {
    cacheObj.set(key, JSON.stringify(data));
  }
};

//type = 1 从sessionStorage获取数据  其他从队列获取数据
const getLocalCahce = (key, type) => {
  let data = null;
  if (type === 1) {
    console.log("数据是sessionStorage中来的");
    data = getSessionStorage(key);
  } else if (type === 2 && cacheObj.has(key)) {
    console.log("数据是从lru队列中来的");
    data = JSON.parse(cacheObj.get(key)) || null;
  }
  return data;
};

const Axios = async (config, params) => {
  const token = getSessionStorage("token");
  console.log(token);
  const key = config.key,
    cacheType = config.type;
  const lruKey = config.key + JSON.stringify(params) + token;
  const caches = getLocalCahce(lruKey.toUpperCase(), cacheType);
  if (caches) {
    return caches;
  }

  const result = await api(params)[key]();

  if (result) {
    setLocalCahce(lruKey.toUpperCase(), result, cacheType);
  }

  return result;
};

export { Axios };
