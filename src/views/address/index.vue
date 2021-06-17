<template>
  <div class="address">
    <page-nav>
      <template v-slot:left><van-icon name="arrow-left" /></template>
      <template v-slot:default>地址</template>
    </page-nav>

    <van-row v-for="(a, index) in address" :key="index">
      <van-col span="20">
        <p>{{ a.name + " " + a.phone }}</p>
        <p>{{ a.province }} {{ a.city }} {{ a.county }} {{ a.address }}</p>
      </van-col>
      <van-col
        span="4"
        style="flex-direction: row-reverse; display: flex; align-items: center"
      >
        <van-icon size="24" name="edit" />
      </van-col>
    </van-row>

    <router-link class="add" to="/addared">
      <van-button block round>新增地址</van-button>
    </router-link>
  </div>
</template>

<script>
import PageNav from "@/components/pageNav";
import { Axios } from "../../utils/axios";
import { onMounted, ref } from "vue";
export default {
  components: { PageNav },
  setup() {
    const address = ref([]);

    onMounted(() => {
      Axios({ key: "getAddress" }).then((res) => {
        address.value = res.data.data;
        console.log(address.value);
      });
    });

    return {
      address,
    };
  },
};
</script>

<style lang="less" scoped>
.address {
  padding: 0 30px;
  .add {
    position: fixed;
    left: 0;
    bottom: 51px;
    width: 100%;
  }
  p {
    text-align: left;
    overflow: hidden;
    white-space: nowrap;
  }
}
</style>
