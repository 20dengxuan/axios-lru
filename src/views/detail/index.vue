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
        <van-button @click="show = true">加入购物车</van-button>
      </p>
    </div>

    <van-action-sheet v-model:show="show">
      <div class="content">
        <div>
          <img :src="detail.cover_url" alt="" />
          <div>
            <p>{{ detail.title }}</p>
            <p>￥{{ detail.price }}</p>
            <p>
              <van-stepper v-model="value" :max="detail.stock" />
              <span>库存{{ detail.stock }}</span>
            </p>
            {{ value }}
          </div>
        </div>

        <div>
          <van-button :disabled="isClick" @click="addGood(detail.id, value)"
            >加入购物车</van-button
          >
          <van-button>立即购买</van-button>
        </div>
      </div>
    </van-action-sheet>

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
import { Toast } from "vant";
import axios from "axios";
export default {
  components: {
    PageNav,
  },
  setup() {
    const route = useRoute();
    const show = ref(false);
    const detail = ref([]);
    const value = ref(1);
    const isClick = ref(false);
    onMounted(async () => {
      detail.value = await Axios({ key: "getDetail" }, { id: route.query?.id });
      detail.value = detail.value.data.goods;
      console.log(detail);
    });

    const addGood = async (id, num) => {
      Toast.loading({
        message: "加载中...",
        forbidClick: true,
      });
      isClick.value = true;
      await axios({
        method: "post",
        url: "/api/carts",
        data: {
          goods_id: id,
          num: num,
        },
      }).then((res) => {
        console.log(res);
      });
      Toast.clear();
      show.value = false;
      isClick.value = false;
      Toast("商品添加成功");
    };

    return {
      detail,
      show,
      value,
      addGood,
      isClick,
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
.content {
  > div:nth-of-type(1) {
    display: flex;
    > img {
      flex: 1;
      height: 150px;
    }
    > div {
      flex: 2;
      text-align: left;
    }
  }
}
</style>
