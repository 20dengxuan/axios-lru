<template>
  <div>
    home
    <button @click="out()">退出</button>
  </div>
</template>

<script>
import { Axios } from "../../utils/axios";
import { useRouter } from "vue-router";
export default {
  setup() {
    const router = useRouter();

    const out = async () => {
      const logout = await Axios({ key: "logout" });
      if (logout.status === 204) {
        window.sessionStorage.setItem("LOGIN", "");
        router.push({ path: "/login" });
      }
    };

    return {
      out,
    };
  },
};
</script>
