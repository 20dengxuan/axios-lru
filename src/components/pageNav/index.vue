<template>
  <div class="nav-bar">
    <div class="left" @click="goback()"><slot name="left"></slot></div>
    <div class="center"><slot>图书商城</slot></div>
    <div class="right"><slot name="right"></slot></div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
export default {
  setup() {
    const router = useRouter();
    const goback = () => {
      router.go(-1);
    };
    return {
      goback,
    };
  },
};
</script>

<style lang="less" scoped>
.nav-bar {
  z-index: 9;
  height: 45px;
  line-height: 45px;
  width: 100%;
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  background: skyblue;
  position: fixed;
  top: 0;
  left: 0;
  padding: 0 10px;
  color: white;
}
</style>
