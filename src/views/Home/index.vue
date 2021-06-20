<template>
  <div class="index">
    <page-nav>
      <template v-slot:default>推荐</template>
    </page-nav>

    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="i in slides" :key="i.id">
        <img :src="i.img_url" alt="" />
      </van-swipe-item>
    </van-swipe>

    <div class="goods">
      <div v-for="(i, index) in goods.splice(0, 4)" :key="index">
        <img :src="i.cover_url" alt="" />
        <p>{{ i.title }}</p>
      </div>
    </div>

    <van-tabs sticky offset-top="45px">
      <van-tab title="畅销">
        <goods-list></goods-list>
      </van-tab>
      <van-tab title="精选"><goods-list></goods-list></van-tab>
      <van-tab title="新书"><goods-list></goods-list></van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { Axios } from "../../utils/axios.js";
import { onMounted, ref } from "vue";

import PageNav from "@/components/pageNav";
import GoodsList from "@/components/goodslist";
export default {
  components: {
    PageNav,
    GoodsList,
  },
  beforeRouteLeave(to, from, next) {
    to.meta.keepAlive = true;
    next(0);
  },
  setup() {
    const slides = ref([]);
    const goods = ref([]);
    onMounted(async () => {
      const data = await Axios({ key: "getIndex", type: 2 });
      slides.value = data.data.slides;
      goods.value = data.data.goods.data;
      // console.log(goods)
    });

    return {
      slides,
      goods,
    };
  },
};
</script>

<style lang="less" scoped>
.index {
  > .goods {
    display: flex;
    > div {
      flex: 1;
      padding: 10px 0;
      > img {
        width: 80px;
      }
      > p {
        margin: 0;
        font-size: 12px;
      }
    }
  }
}
.my-swipe .van-swipe-item {
  > img {
    width: 100%;
  }
}
</style>
