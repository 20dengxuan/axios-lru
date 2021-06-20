<template>
  <div>
    <div class="top"></div>

    <router-view />
    <nav-bar></nav-bar>
  </div>
</template>

<script>
import NavBar from "@/components/Navbar";
export default {
  components: {
    NavBar,
  },
};
</script>
<style lang="less">
* {
  box-sizing: border-box;
  // padding:0;
  // margin:0;
  // text-align: left;
}
.top {
  height: 45px;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding-bottom: 50px;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
