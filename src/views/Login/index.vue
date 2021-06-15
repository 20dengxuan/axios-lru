<template>
  <div>
    <page-nav>
      <template v-slot:default>登入</template>
    </page-nav>
    {{ user }}
    <van-form validate-first validate-trigger="onSubmit" @submit="onSubmit">
      <van-field
        v-model="user.email"
        type="email"
        name="email"
        label="邮箱"
        placeholder="请输入邮箱"
        :rules="[{ required: true, message: '邮箱不能为空' }]"
      />
      <van-field
        type="password"
        v-model="user.password"
        name="password"
        label="密码"
        placeholder="请输入6位数密码"
        :rules="[{ pattern, message: '请输入正确内容' }]"
      />
      <van-button round block native-type="submit">提交</van-button>
    </van-form>

    <router-link to="/register">注册</router-link>
  </div>
</template>

<script>
import PageNav from "@/components/pageNav";
import { reactive } from "vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import api from "../../utils/api";
import { Toast } from "vant";
export default {
  components: { PageNav },
  setup() {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    console.log(route.query.redirect);
    //用户登录表单
    const user = reactive({
      email: "",
      password: "",
    });

    //用户登录信息提交
    const onSubmit = async (values) => {
      const login = await api(values).Login();
      console.log(login);
      if (login && login.status === 200) {
        let token = login.data.token_type + " " + login.data.access_token;
        store.dispatch("USERMESSAGE", token);

        Toast("登录成功");
        if (route.query.redirect) {
          router.push(route.query.redirect);
        } else {
          router.push("/");
        }
      }
    };

    return {
      user,
      onSubmit,
      pattern: /\d{6}/,
    };
  },
};
</script>
