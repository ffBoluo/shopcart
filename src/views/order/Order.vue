<template>
  <div>
    <div class="order">
      <div class="order__head">我的订单</div>
      <div class="order__item" v-for="item in orderList" :key="item.shopId">
        <h4 class="order__item__title">{{ item.shopName }}</h4>
        <span>已取消</span>
        <div class="order__item__img">
          <img
            v-for="newItem in item.products"
            :key="newItem.orderSales"
            :src="newItem.product.img"
          />
          <div class="order__item__img__count">
            <div style="color: #e93b3b; margin-bottom: 0.04rem">￥66.6</div>
            <div style="font-size: 0.12rem; color: #333333">共六件</div>
          </div>
        </div>
      </div>
    </div>
    <Docker />
  </div>
</template>

<script>
import { ref } from "vue";
import Docker from "../../components/dock/Docker";
import { get } from "../../utils/request";
export default {
  setup() {
    let orderList = ref([]);
    const getOrder = async () => {
      const { data } = await get("/api/order");
      console.log(data.data);
      orderList.value = data.data;
    };
    getOrder();
    return { orderList };
  },
  components: {
    Docker,
  },
};
</script>

<style lang="scss" scoped>
.order {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0.5rem;
  font-size: 0.16rem;
  background-color: rgb(250, 248, 248);
  &__head {
    width: 100%;
    line-height: 0.64rem;
    font-size: 0.2rem;
    background: #ffffff;
    text-align: center;
  }
  &__item {
    overflow: hidden;
    margin: 0.1rem auto;
    width: 3.8rem;
    height: 1.1rem;
    background-color: #fff;
    border-radius: 0.04rem;
    &__title {
      display: inline-block;
      margin: 0.16rem 0 0.16rem 0.16rem;
    }
    span {
      float: right;
      margin: 0.16rem 0.16rem 0 0;
    }
    &__img {
      margin-left: 0.16rem;
      img {
        float: left;
        margin-left: 0.12rem;
        width: 0.4rem;
        height: 0.4rem;
      }
      &__count {
        float: right;
        margin-right: 0.16rem;
        text-align: right;
      }
    }
  }
}
</style>