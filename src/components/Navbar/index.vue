<template>
  <div>
    <router-link to="/" tag="a">首页</router-link><br />
    <router-link to="/" tag="a">分类</router-link><br />
    <router-link to="/" tag="a">购物车</router-link><br />
    <router-link to="/user" tag="a">我的</router-link>
  </div>
</template>

<style lang="less" scoped>
div {
  background: skyblue;
  height: 50px;
  display: flex;
  width: 100%;
  text-align: center;
  position: fixed;
  bottom: 0;
  left: 0;
  > a {
    flex: 1;
    line-height: 50px;
  }
}
</style>
