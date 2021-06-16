<template>
  <div>
    <page-nav>
      <template v-slot:left>返回</template>
      <template v-slot:default>注册</template>
    </page-nav>
    {{ register }}
    <van-form @submit="onSubmit">
      <van-field
        v-model="register.name"
        name="name"
        label="用户名"
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="register.email"
        name="email"
        label="邮箱"
        placeholder="邮箱"
        :rules="[{ required: true, message: '请填写邮箱' }]"
      />

      <van-field
        v-model="register.password"
        type="password"
        name="password"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请设置密码' }]"
      />

      <van-field
        v-model="register.password_confirmation"
        type="password"
        name="password_confirmation"
        label="确认密码"
        placeholder="确认密码"
        :rules="[{ required: true, message: '请设置密码' }]"
      />

      <van-button round block native-type="submit">注册</van-button>
    </van-form>
  </div>
</template>

<script>
import PageNav from "@/components/pageNav";
import { reactive } from "vue";
import { useRouter } from "vue-router";
import api from "../../utils/api";
import { Toast } from "vant";
export default {
  components: { PageNav },
  setup() {
    const router = useRouter();
    //注册表单
    const register = reactive({
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
    });

    //提交注册信息
    const onSubmit = async (values) => {
      let reg = await api(values).postRegister();
      if (reg.status === 201) {
        Toast("注册成功");
        router.push("/login");
      }
    };

    return {
      register,
      onSubmit,
    };
  },
};
</script>
