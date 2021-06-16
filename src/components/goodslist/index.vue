<template>
  <van-list
    offset="-60"
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    loading-text="加载中"
    @load="onLoad"
    class="list"
  >
    <div @click="getdetail(i.id)" v-for="(i, index) in list" :key="index">
      <img :src="i.cover_url" alt="" />
      <div>
        {{ i.title }}
      </div>
    </div>
  </van-list>
</template>

<script>
import { ref } from "vue";
import { Axios } from "../../utils/axios";
// import api from "../../utils/api"
import { useRouter } from "vue-router";
export default {
  setup() {
    const router = useRouter();

    const loading = ref(false);
    const finished = ref(false);
    const page = ref(0);
    const list = ref([]);
    //热销
    const sales = ref([]);

    const getList = async () => {
      if (page.value > 3) {
        finished.value = true;
        return;
      }
      sales.value = await Axios(
        { key: "getIndex" },
        { page: page.value, sales: 1 }
      );
      console.log(sales);
      list.value = list.value.concat(sales.value.data.goods.data);
      loading.value = false;
    };

    const getdetail = (id) => {
      console.log(id);
      router.push(`/detail?id=${id}`);
    };

    const onLoad = ref(() => {
      console.log(page.value);
      page.value++;
      getList();
    });

    return {
      loading,
      finished,
      sales,
      onLoad,
      list,
      getdetail,
    };
  },
};
</script>

<style lang="less" scoped>
.list {
  padding: 10px 20px;
  // display: flex;
  // justify-content: space-between;
  // flex-wrap: wrap;
  > div {
    height: 160px;
    width: 100%;
    border: 1px solid red;
    margin: 10px 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    > img {
      height: 100%;
    }
    > div {
    }
  }
}
</style>
