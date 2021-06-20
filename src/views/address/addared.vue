<template>
  <div>
    <page-nav>
      <template v-slot:left><van-icon name="arrow-left" /></template>
      <template v-slot:default>编辑地址</template>
    </page-nav>

    <van-address-edit
      :address-info="AddressInfo"
      :area-list="areaList"
      :show-delete="is_detele"
      show-set-default
      show-search-result
      :search-result="searchResult"
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="onSave"
      @delete="onDelete"
      @change-detail="onChangeDetail"
    />
  </div>
</template>

<script>
import PageNav from "@/components/pageNav";
import { ref, onMounted, reactive } from "vue";
import { Toast } from "vant";
import { Axios } from "../../utils/axios";
import { areaList } from "@vant/area-data";
import { useRouter, useRoute } from "vue-router";
export default {
  components: { PageNav },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const searchResult = ref([]);
    const is_detele = ref(false);
    const AddressInfo = reactive({
      name: "",
      tel: "",
      province: "",
      city: "",
      county: "",
      addressDetail: "",
      isDefault: false,
      areaCode: "",
    });
    //保存地址
    const onSave = async (content) => {
      console.log(content);
      let name = content.areaCode + content.name;
      const datas = {
        name: name,
        address: content.addressDetail,
        phone: content.tel,
        province: content.province,
        city: content.city,
        county: content.county,
        is_default: content.isDefault ? 1 : 0,
      };
      if (route.query.id) {
        await Axios(
          { key: "upAddress" },
          {
            address: route.query.id,
            data: datas,
          }
        );
        Toast("修改成功");
      } else {
        console.log("hhhhh");
        await Axios({ key: "addAddress" }, datas);
        Toast("添加成功");
      }
      router.go(-1);
    };

    //删除地址
    const onDelete = async () => {
      if (route.query.id) {
        await Axios({ key: "deleteAddress" }, { address: route.query.id });
        Toast("删除成功");
        router.push("/address");
      }
    };

    const onChangeDetail = (val) => {
      if (val) {
        searchResult.value = [
          {
            name: "黄龙万科中心",
            address: "杭州市西湖区",
          },
        ];
      } else {
        searchResult.value = [];
      }
    };

    onMounted(async () => {
      console.log(router);
      if (route.query.id) {
        is_detele.value = true;
        Toast.loading({
          message: "加载中...",
          forbidClick: true,
        });
        const detail = await Axios(
          { key: "getAddressdetail" },
          { id: route.query.id }
        );
        console.log(detail.data);
        let name = detail.data.name.substring(6);
        let code = detail.data.name.substring(0, 6);
        (AddressInfo.name = name),
          (AddressInfo.tel = detail.data.phone),
          (AddressInfo.province = detail.data.province),
          (AddressInfo.city = detail.data.city),
          (AddressInfo.county = detail.data.county),
          (AddressInfo.addressDetail = detail.data.address),
          (AddressInfo.isDefault = detail.data.is_default ? true : false);
        AddressInfo.areaCode = code;
        Toast.clear();
      }
    });

    return {
      onSave,
      onDelete,
      areaList,
      searchResult,
      onChangeDetail,
      AddressInfo,
      is_detele,
    };
  },
};
</script>
