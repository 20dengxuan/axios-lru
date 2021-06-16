<template>
  <div class="detail">
    <page-nav>
      <template v-slot:left><van-icon name="arrow-left" /></template>
      <template v-slot:default>详情</template>
    </page-nav>
    <img :src="detail.cover_url" alt="" />
    <div class="message">
      <p>
        <span>{{ detail.price }}</span
        ><span>月销{{ detail.sales }}</span>
      </p>
      <p>{{ detail.title }}</p>
      <p>
        <van-button>加入购物车</van-button>
      </p>
    </div>

    <div class="tab">
      <van-tabs>
        <van-tab title="概述">
          <div v-html="detail.details"></div>
        </van-tab>
        <van-tab title="热评">内容 2</van-tab>
        <van-tab title="相关读书">内容 3</van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import { useRoute } from "vue-router";
import { onMounted, ref } from "vue";
import PageNav from "@/components/pageNav";
import { Axios } from "../../utils/axios";
export default {
  components: {
    PageNav,
  },
  setup() {
    const route = useRoute();

    const detail = ref([]);
    onMounted(async () => {
      detail.value = await Axios({ key: "getDetail" }, { id: route.query?.id });
      detail.value = detail.value.data.goods;
      console.log(detail);
    });

    return {
      detail,
    };
  },
};
</script>

<style lang="less" scoped>
.detail {
  > img {
    width: 70%;
  }
  .tab {
    width: 100%;
    overflow: hidden;
    img {
      width: 100% !important;
    }
  }
}
</style>
