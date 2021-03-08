<template>
  <div class="nearby">
    <h2 class="nearby__title">附近店铺</h2>
    <!-- 子项目 -->
    <router-link v-for="item in list" :key="item._id" :to="`/shop/${item._id}`">
      <Product :list="item" />
    </router-link>
  </div>
</template>

<script>
import { ref } from "vue";
import Product from "../../components/shop/Product";
import { get } from "../../utils/request";
export default {
  setup() {
    let list = ref([]);
    const getNearList = async () => {
      try {
        const { data } = await get("/api/shop/hot-list");
        console.log(data);
        if (data.errno === 0 && data.data.length !== 0) {
          list.value = data.data;
        }
      } catch (e) {
        console.log(e);
      }
    };
    getNearList();
    return { list };
  },
  components: {
    Product,
  },
};
</script>

<style lang="scss" scope>
@import "../../assets/css/variable.scss";
a {
  text-decoration: none;
  color: #333333;
}
.nearby {
  &__title {
    font-size: 0.18rem;
    color: #333333;
  }
}
</style>