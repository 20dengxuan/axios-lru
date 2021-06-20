<template>
  <div>
    <page-nav>
      <template v-slot:left><van-icon name="arrow-left" /></template>
      <template v-slot:default>我的订单</template>
    </page-nav>
  </div>
</template>

<script>
import PageNav from "@/components/pageNav";
import { Axios } from "../../utils/axios";
export default {
  components: { PageNav },
  setup() {
    Axios({ key: "getOrders" }).then((res) => {
      console.log(res.data);
    });
  },
};
</script>
