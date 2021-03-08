<template>
  <div class="wrapper">
    <div class="search">
      <div class="search__back iconfont" @click="handlBack">&#xe602;</div>
      <div class="search__ipt">
        <span class="search__ipt__icon iconfont">&#xe601;</span>
        <input
          type="text"
          class="search__ipt__content"
          placeholder="请输入商品名称搜索"
        />
      </div>
    </div>
    <Product :list="item" class="shop" :isShow="false" v-if="item.imgUrl" />
    <Content />
    <Cart />
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";
import { useRoute, useRouter } from "vue-router";
import { get } from "../../utils/request";
import Product from "../../components/shop/Product";
import Content from "./Content";
import Cart from "./Cart";
// 获取页面头部信息
const useShopInfo = () => {
  const route = useRoute();
  const date = reactive({ item: {} });
  const getShopItem = async () => {
    try {
      const { data } = await get(`/api/shop/${route.params.id}`);
      if (data.errno === 0 && data.data.length !== 0) {
        date.item = data.data;
      }
    } catch (e) {
      console.log(e);
    }
  };
  // 获取左侧列表信息

  const { item } = toRefs(date);
  return { item, getShopItem };
};
// 点击返回上一页
const getBack = () => {
  const router = useRouter();
  const handlBack = () => {
    router.back();
  };
  return { handlBack };
};

export default {
  setup() {
    const { item, getShopItem } = useShopInfo();
    const { handlBack } = getBack();
    getShopItem();
    return { item, handlBack };
  },
  components: {
    Product,
    Content,
    Cart,
  },
};
</script>

<style lang="scss" scope>
.wrapper {
  padding-right: 0.18rem;
}
.shop {
  margin: 0.16rem 0 0 0.18rem;
}
.search {
  display: flex;
  margin-top: 0.16rem;
  line-height: 0.3rem;
  &__back {
    margin-left: 0.18rem;
    width: 0.2rem;
    font-size: 0.2rem;
    color: #b6b6b6;
  }
  &__ipt {
    flex: 1;
    display: flex;
    margin-left: 0.12rem;
    font-size: 0.14rem;
    line-height: 0.3rem;
    background: #f5f5f5;
    border-radius: 0.16rem;
    &__icon {
      margin-left: 0.14rem;
      color: #b7b7b7;
      font-size: 0.16rem;
    }
    &__content {
      flex: 1;
      margin-left: 0.1rem;
      padding-right: 0.1rem;
      border: none;
      outline: none;
      background: none;
    }
  }
}
</style>