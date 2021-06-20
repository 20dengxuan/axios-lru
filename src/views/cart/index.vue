<template>
  <div>
    <page-nav><template v-slot:default>购物车</template></page-nav>
    <div v-if="carts.data?.length">
      <van-checkbox-group v-model="checked">
        <div v-for="(c, index) in carts.data" :key="index">
          <van-swipe-cell :disabled="checked.length ? true : false">
            <van-checkbox :disabled="isCheckedBox" :name="c" class="card">
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
      <van-submit-bar
        class="submit"
        @submit="onSubmit"
        :price="sum * 100"
        button-text="提交订单"
      >
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
import { useRouter } from "vue-router";
export default {
  components: {
    PageNav,
  },
  setup() {
    const carts = ref([]);
    const checked = ref([]);
    const sum = ref(0);
    const isChecked = ref(false);
    const isCheckedBox = ref(false);

    //点击全选
    const upChecked = () => {
      if (checked.value.length === carts.value.data.length) {
        isChecked.value = false;
        checked.value = [];
      } else {
        isChecked.value = true;
        checked.value = carts.value.data;
      }
    };

    watch(checked, async (newVal) => {
      if (newVal && newVal !== []) {
        isCheckedBox.value = true;
        let cart_ids = newVal.map((item) => item.id);
        await Axios({ key: "upChecked" }, { cart_ids: cart_ids });
        isCheckedBox.value = false;
      }
      if (newVal.length === carts.value.data.length) {
        isChecked.value = true;
      } else {
        isChecked.value = false;
      }

      await updataSum();
    });

    //更新sum
    const updataSum = () => {
      let s = 0;
      checked.value.map((item) => {
        s += item.num * item.goods.price;
      });
      sum.value = s;
    };

    onMounted(async () => {
      await getCarts();
      //初始默认选中
      if (carts.value.data.length) {
        carts.value.data.map((item) => {
          if (item.is_checked) {
            checked.value.push(item);
          }
        });
      }
      if (checked.value.length === carts.value.data.length) {
        isChecked.value = true;
      } else {
        isChecked.value = false;
      }
      //默认sum
      await updataSum();
    });

    //获取购物车信息
    const getCarts = async () => {
      carts.value = await Axios({ key: "getCarts" }, { include: "goods" });
      carts.value = carts.value.data;
      // updataSum()
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
    const router = useRouter();

    const onSubmit = () => {
      if (checked.value.length) {
        router.push("/preview");
      } else {
        Toast("请选择商品");
      }
    };

    return {
      carts,
      checked,
      updataNum,
      deleteGood,
      sum,
      isChecked,
      upChecked,
      isCheckedBox,
      onSubmit,
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
