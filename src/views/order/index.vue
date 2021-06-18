<template>
  <div>
    <page-nav>
      <template v-slot:left><van-icon name="arrow-left" /></template>
      <template v-slot:default>我的订单</template>
    </page-nav>
  </div>
</template>

<script>
import axios from "axios";
import PageNav from "@/components/pageNav";
import { Axios } from "../../utils/axios";
export default {
  components: { PageNav },
  setup() {
    Axios({ key: "getOrders" }).then((res) => {
      console.log(res.data.data[0].id);
      axios
        .get(`/api/orders/${res.data.data[0].id}/pay?type=aliyun`)
        .then((res) => {
          console.log(res);
        });
    });
  },
};
</script>
