<template>
  <div>
    <page-nav>
      <template v-slot:default> 我的 </template>
    </page-nav>
    user

    <van-button @click="logout()">退出登录</van-button>
  </div>
</template>

<script>
import { Axios } from "../..//utils/axios";
import PageNav from "@/components/pageNav";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
export default {
  components: {
    PageNav,
  },
  setup() {
    const router = useRouter();
    const store = useStore();
    const logout = async () => {
      const out = await Axios({ key: "logout" });
      console.log(out);
      if (out && out.status === 204) {
        store.dispatch("USERMESSAGE", "");
        console.log(store);
        router.push("/login");
      }
    };

    return {
      logout,
    };
  },
};
</script>
