<template>
  <div>
    <page-nav><template v-slot:default>购物车</template></page-nav>
    <div v-if="carts.data?.length">
      <van-checkbox-group v-model="checked">
        <div v-for="(c, index) in carts.data" :key="index">
          <van-swipe-cell :disabled="checked.length ? true : false">
            <van-checkbox :name="c" class="card">
              {{ c.goods.title }}</van-checkbox
            >

            <van-card
              :num="c.num"
              :price="c.num * c.goods.price + '.00'"
              :title="'￥' + c.goods?.price"
              :thumb="c.goods.cover_url"
              style="text-align: left; background: white"
            >
              <template v-slot:price-top>
                <p>
                  <van-stepper
                    disable-input
                    @click="updataNum(c.id, c.num)"
                    v-model="c.num"
                    :max="c.goods.stock"
                  />
                </p>
              </template>
            </van-card>
            <template #right>
              <van-button
                @click="deleteGood(c.id)"
                square
                text="删除"
                type="danger"
                class="delete-button"
              />
            </template>
          </van-swipe-cell>
          <van-divider />
        </div>
      </van-checkbox-group>
      <div style="height: 50px"></div>
      <van-submit-bar class="submit" :price="sum * 100" button-text="提交订单">
        <template v-slot:default>
          <van-radio @click="upChecked()" :checked="isChecked">全选</van-radio>
        </template>
      </van-submit-bar>
    </div>
    <div v-else>
      购物车空空如也
      <van-button>前往选购</van-button>
    </div>
  </div>
</template>

<script>
import PageNav from "@/components/pageNav";
import { Axios } from "../../utils/axios";
import { ref, onMounted, watch } from "vue";
import axios from "axios";
import { Toast } from "vant";
export default {
  components: {
    PageNav,
  },
  setup() {
    const carts = ref([]);
    const checked = ref([]);
    const sum = ref(0);
    const isChecked = ref(false);

    const upChecked = () => {
      if (checked.value.length === carts.value.data.length) {
        isChecked.value = false;
        checked.value = [];
      } else {
        isChecked.value = true;
        checked.value = carts.value.data;
      }
    };

    watch(checked, (newVal) => {
      if (newVal.length === carts.value.data.length) {
        isChecked.value = true;
      } else {
        isChecked.value = false;
      }
      updataSum();
    });

    const updataSum = () => {
      let s = 0;
      checked.value.map((item) => {
        s += item.num * item.goods.price;
      });
      sum.value = s;
      console.log(sum.value);
    };

    onMounted(async () => {
      getCarts();
    });
    const getCarts = async () => {
      carts.value = await Axios({ key: "getCarts" }, { include: "goods" });
      carts.value = carts.value.data;
      console.log(carts);
    };

    const updataNum = (id, num) => {
      axios({
        method: "put",
        url: `/api/carts/${id}`,
        data: {
          num: num,
        },
      }).then((res) => {
        console.log(res);
      });
      console.log(id, num);
      updataSum();
    };

    const deleteGood = async (id) => {
      Toast.loading({
        message: "加载中...",
        forbidClick: true,
      });
      await axios({
        method: "delete",
        url: `/api/carts/${id}`,
      }).then(() => {
        getCarts();
      });
      Toast.clear();
      Toast("删除成功");
    };

    return {
      carts,
      checked,
      updataNum,
      deleteGood,
      sum,
      isChecked,
      upChecked,
    };
  },
};
</script>

<style lang="less" scoped>
.card {
  padding: 10px;
  // display:inline-block;
  text-align: right;
  // background:#fafafa;
}
.delete-button {
  height: 100%;
}
.submit {
  bottom: 50px !important;
}
</style>
