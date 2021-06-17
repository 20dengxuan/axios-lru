<template>
  <div>
    <page-nav>
      <template v-slot:left><van-icon name="arrow-left" /></template>
      <template v-slot:default>编辑地址</template>
    </page-nav>
  </div>
</template>

<script>
import PageNav from "@/components/pageNav";
import { Axios } from "../../utils/axios";
export default {
  components: { PageNav },
  setup() {
    Axios(
      { key: "addAddress" },
      {
        name: "dx",
        address: "hhhh",
        phone: "15272634941",
        province: "hhh",
        city: "hhhhh",
        county: "hhhh",
      }
    ).then((res) => {
      console.log(res);
    });
  },
};
</script>
