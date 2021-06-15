<template>
  <div>
    <button @click="reg()">注册</button>
    <button @click="logout()">退出</button>
    <button @click="newToken()">刷新</button>
    {{ token }}
  </div>
</template>

<script>
import { Axios } from "../../utils/axios";
import { useStore } from "vuex";
import api from "../../utils/api";
export default {
  setup() {
    const store = useStore();
    const reg = () => {
      Axios(
        { key: "postRegister" },
        {
          name: "test",
          email: "5463565@qq.com",
          password: "123123",
          password_confirmation: "123123",
        }
      );
    };

    const logout = async () => {
      const logout = await Axios({ key: "logout" });
      if (logout.status === 204) {
        store.dispatch("USERMESSAGE", "");
      }
    };

    const newToken = async () => {
      const newT = await api().newToken();
      console.log(newT);
    };

    return {
      newToken,
      reg,
      logout,
      token: store.state.user.token,
    };
  },
};
</script>
