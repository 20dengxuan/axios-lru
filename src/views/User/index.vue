<template>
  <div class="user">
    <page-nav>
      <template v-slot:default> 我的 </template>
    </page-nav>
    <header>
      <div>
        <img :src="getUser.value?.data?.avatar_url" alt="" />
      </div>
      <div>
        <p>{{ getUser.value?.data?.name }}</p>
        <p>{{ getUser.value?.data?.email }}</p>
      </div>
    </header>
    <router-link to="/"
      ><span>我的收藏</span><van-icon color="black" name="arrow"
    /></router-link>
    <router-link to="/"
      ><span>我的订单</span><van-icon color="black" name="arrow"
    /></router-link>
    <router-link to="/"
      ><span>账号管理</span><van-icon color="black" name="arrow"
    /></router-link>
    <router-link to="/"
      ><span>地址管理</span><van-icon color="black" name="arrow"
    /></router-link>
    <router-link to="/"
      ><span>关于我们</span><van-icon color="black" name="arrow"
    /></router-link>
    <van-button block round color="skyblue" @click="logout()"
      >退出登录</van-button
    >
  </div>
</template>

<script>
import { Axios } from "../..//utils/axios";
import PageNav from "@/components/pageNav";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { onMounted, reactive } from "vue";
export default {
  components: {
    PageNav,
  },
  setup() {
    const router = useRouter();
    const store = useStore();

    const getUser = reactive({});
    onMounted(async () => {
      getUser.value = await Axios({ key: "getUser" });
      console.log(getUser.value);
    });
    // getUser.value = toRefs(getUser)

    //退出登录
    const logout = async () => {
      const out = await Axios({ key: "logout" });
      if (out && out.status === 204) {
        store.dispatch("USERMESSAGE", "");
        window.sessionStorage.token = "";
        console.log(store);
        router.push("/login");
      }
    };

    return {
      logout,
      getUser: getUser,
    };
  },
};
</script>

<style lang="less" scoped>
.user {
  padding: 20px 10px;
  header {
    border-radius: 5px;
    padding: 20px;
    width: 100%;
    display: flex;
    justify-content: space-around;
    background: linear-gradient(90deg, #31c7a7, #a1c7c7);
    > div:nth-of-type(1) {
      width: 100px;
      text-align: left;
      img {
        height: 80px;
      }
    }
    > div:nth-of-type(2) {
      width: calc(100% - 120px);
      p {
        text-align: left;
      }
    }
  }
  a {
    padding: 20px 3px;
    color: black;
    display: flex;
    justify-content: space-between;
    // line-height:90px;
  }
}
</style>
