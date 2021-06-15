import axios from "axios";
import api from "./api";
import lruCache from "lru-cache";
import { getSessionStorage, setSessionStorage } from "../utils/storage";

// 请求拦截
axios.interceptors.request.use(
  (config) => {
    if (getSessionStorage("LOGIN")) {
      config.headers.Authorization =
        getSessionStorage("LOGIN").data.token_type +
        " " +
        getSessionStorage("LOGIN").data.access_token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截
axios.interceptors.response.use((response) => {
  return response;
});

const cacheObj = new lruCache({
  max: 10000, //缓存队列长度
  maxAge: 1000 * 60 * 30, //缓存时间
});

//type === 1 缓存到sessionStorage  type ===2 缓存到队列  其他不缓存
const setLocalCahce = (key, data, type) => {
  if (type === 1) {
    setSessionStorage(key, data);
  } else if (!type) {
    cacheObj.set(key, JSON.stringify(data));
  }
};

//type = 1 从sessionStorage获取数据  其他从队列获取数据
const getLocalCahce = (key, type) => {
  let data = null;
  if (type === 1) {
    data = getSessionStorage(key);
  } else if (cacheObj.has(key)) {
    console.log("数据是从lru队列中来的");
    data = JSON.parse(cacheObj.get(key)) || null;
  }
  return data;
};

const Axios = async (config, parmas) => {
  const key = config.key,
    cacheType = config.type;

  const caches = getLocalCahce(key.toUpperCase(), cacheType);
  if (caches) {
    console.log("数据是sessionStorage中来的");
    return caches;
  }

  const result = await api(parmas)[key]();

  if (result) {
    setLocalCahce(key.toUpperCase(), result, cacheType);
  }

  return result;
};

export { Axios };
