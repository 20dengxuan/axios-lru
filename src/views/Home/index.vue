<template>
  <div>index</div>
</template>

<script>
// import {Axios} from '../../utils/axios.js'
import { onMounted } from "vue";
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["user"]),
  },
  setup() {
    //  const store = useStore()
    onMounted(async () => {
      //  const data = await Axios({key:'getUser'})
      //  console.log(data)
    });

    return {};
  },
};
</script>
