<template>
  <div>
    <page-nav>
      <template v-slot:default>分类</template>
    </page-nav>

    <van-tabs>
      <van-tab v-for="(i, index) in lists" :key="index" :title="i.name">
        <div v-for="(n, index) in i.children" :key="index">
          <p>{{ n.name }}</p>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { Axios } from "../../utils/axios";
import PageNav from "@/components/pageNav";
import { onMounted, ref } from "vue";
export default {
  components: {
    PageNav,
  },
  setup() {
    const lists = ref([]);

    //一级分类
    onMounted(async () => {
      lists.value = await Axios({ key: "getGoods", type: 2 });
      lists.value = lists.value.data.categories;
    });

    return {
      lists,
    };
  },
};
</script>
