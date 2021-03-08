<template>
  <div class="docker">
    <div
      v-for="(item, index) in dockList"
      :class="{ docker__item: true, active: pathin === item.to }"
      :key="index"
    >
      <router-link :to="item.to">
        <div class="iconfont" v-html="item.icon"></div>
        <div class="docker__title">{{ item.title }}</div>
      </router-link>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRoute } from "vue-router";
export default {
  setup() {
    const route = useRoute();
    const dockList = [
      { icon: "&#xe663;", title: "首页", to: "/" },
      { icon: "&#xe62c;", title: "购物车", to: "/shopcart" },
      { icon: "&#xe600;", title: "订单", to: "/order" },
      { icon: "&#xe603;", title: "我的", to: "/mine" },
    ];
    let pathin = ref(route.path);
    console.log(pathin);
    return { dockList, pathin };
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/css/variable.scss";
.active {
  color: deeppink;
}
.docker {
  display: flex;
  box-sizing: border-box;
  position: absolute;
  left: 0;
  bottom: 0;
  padding: 7px;
  width: 100%;
  height: 49px;
  background-color: #ffffff;
  box-shadow: 0 -1px 1px 0 #f1f1f1;
  &__item {
    flex: 1;
    text-align: center;
    .iconfont {
      font-size: 20px;
    }
    a {
      color: #333333;
      text-decoration: none;
    }
  }
  &__title {
    margin-top: 0.04rem;
    font-size: 20px;
    transform: scale(0.5, 0.5);
    transform-origin: center top;
  }
}
</style>