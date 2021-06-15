<template>
  <div>
    Login
    <button @click="login()">登录</button>

    <router-link to="/">home</router-link>
  </div>
</template>

<script>
import { Axios } from "../../utils/axios";
export default {
  setup() {
    const login = async () => {
      const data = await Axios(
        { key: "Login", type: 1 },
        {
          email: "90754567@qq.com",
          password: "123123",
        }
      );
      console.log(data);
    };

    return {
      login,
    };
  },
};
</script>
