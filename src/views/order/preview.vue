<template>
  <div class="preview">
    <page-nav>
      <template v-slot:left><van-icon name="arrow-left" /></template>
      <template v-slot:default>下单</template>
    </page-nav>

    <div class="address">
      <van-contact-card
        v-if="preview.address?.length"
        type="edit"
        :name="currentContact.name"
        :tel="currentContact.tel"
        @click="onEdit"
      />
      <van-contact-card v-else type="add" @click="onAdd" />
    </div>

    <van-card
      v-for="(p, index) in preview.carts"
      :key="index"
      :num="p.num"
      :price="p.goods.price + '.00'"
      :title="p.goods.title"
      :thumb="p.goods.cover_url"
    />

    <van-submit-bar
      :price="sum * 100"
      button-text="生成订单"
      @submit="onSubmit"
    />
  </div>
</template>

<script>
import PageNav from "@/components/pageNav";
import { Axios } from "../../utils/axios";
import { onMounted, ref } from "vue";
import { reactive } from "vue";
// import { Toast } from "vant";
import { useRouter } from "vue-router";
export default {
  components: { PageNav },
  setup() {
    const router = useRouter();
    const preview = ref([]);
    const sum = ref(0);
    const currentContact = reactive({
      name: "",
      tel: "",
    });

    const onEdit = () => {
      router.push("/address");
    };
    const onAdd = () => {
      router.push("/addared");
    };
    onMounted(async () => {
      preview.value = (await Axios({ key: "getPreview" })).data;

      if (preview.value.address.length) {
        currentContact.name = preview.value.address[0].name.substring(6);
        currentContact.tel = preview.value.address[0].phone;
        console.log(preview.value);
      }
      if (preview.value.carts.length) {
        preview.value.carts.map((item) => {
          sum.value += item.num * item.goods.price;
        });
      }
    });

    const onSubmit = async () => {
      const order = await Axios(
        { key: "postOrder" },
        { address_id: preview.value.address[0].id }
      );
      console.log(order);
    };

    return {
      preview,
      onSubmit,
      onEdit,
      currentContact,
      onAdd,
      sum,
    };
  },
};
</script>
