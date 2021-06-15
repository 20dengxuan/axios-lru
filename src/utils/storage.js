// 存储sessionStorage
const setSessionStorage = (name, obj) => {
  const type = obj.toString() === "[object Object]";
  obj = type ? JSON.stringify(obj) : obj;
  window.sessionStorage.setItem(name, obj);
};

//获取sessionStorage
const getSessionStorage = (name) => {
  const result = window.sessionStorage.getItem(name) || "";
  try {
    return JSON.parse(result);
  } catch (err) {
    return result;
  }
};

export { setSessionStorage, getSessionStorage };
