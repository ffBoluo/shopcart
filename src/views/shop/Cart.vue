<template>
  <div>
    <!-- 底部选中商品 -->
    <div class="mask" v-if="isShow"></div>
    <transition-group name="list">
      <div class="list" v-if="isShow">
        <div class="content__deil">
          <div class="content__deil__head">
            <div
              class="content__deil__head__icon iconfont"
              v-html="allChecked ? '&#xe6a5;' : '&#xe60c;'"
            ></div>
            <span class="content__deil__head__all" @click="checkedAll(shopId)"
              >全选</span
            >
            <span @click="clearCart(shopId)">清空购物车</span>
          </div>
          <div
            v-for="item in productList"
            class="content__deil__item"
            :key="item._id"
          >
            <template v-if="item.count > 0">
              <!-- 选中按钮 -->
              <div
                class="content__deil__item__icon iconfont"
                v-html="item.checked ? '&#xe6a5;' : '&#xe60c;'"
                @click="changeCheck(shopId, item._id)"
              ></div>
              <!-- 图片 -->
              <img :src="item.imgUrl" />
              <div class="content__deil__item__des">
                <h4>{{ item.name }}</h4>
                <p>{{ item.sales }}</p>
                <p class="caculater">
                  ¥{{ item.price }}
                  <span class="caculater__sale">¥{{ item.oldPrice }}</span>
                  <span class="caculater__cacl">
                    <span
                      class="caculater__cacl__sub"
                      @click="
                        item.count > 0 ? subProduct(shopId, item._id, item) : ''
                      "
                      >-</span
                    >
                    {{ item.count || 0 }}
                    <span
                      class="caculater__cacl__add"
                      @click="
                        () => {
                          addProduct(shopId, item._id, item);
                        }
                      "
                      >+</span
                    >
                  </span>
                </p>
              </div>
            </template>
          </div>
        </div>
      </div>
    </transition-group>

    <!-- 底部结算栏 -->
    <div class="cart">
      <div class="cart__img iconfont">
        <img
          src="http://www.dell-lee.com/imgs/vue3/basket.png"
          @click="showList"
        />
        <div class="cart__img__icon">{{ total }}</div>
      </div>
      <div class="cart__totl">
        总计：<span> ￥{{ totalPrice }}</span>
      </div>
      <router-link :to="`/cartconfirm/${shopId}`">
        <div class="cart__settl">去结算</div>
      </router-link>
    </div>
  </div>
</template>

<script>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";

export default {
  setup() {
    // 是否展示购物车列表
    const isShow = ref(false);
    const route = useRoute();
    const store = useStore();
    const shopId = route.params.id;
    const cartList = store.state.cartList;
    const productId = cartList[shopId];

    // 计算个数
    const total = computed(() => {
      const productId = cartList[shopId];
      let result = 0;
      if (!productId) {
        return result;
      }
      for (let k in productId) {
        let product = productId[k];
        result += product.count;
      }
      return result;
    });
    // 计算总金额
    const totalPrice = computed(() => {
      const productId = cartList[shopId];
      let result = 0;
      if (!productId) {
        return result;
      }
      for (let k in productId) {
        let product = productId[k];
        if (product.checked) {
          result += product.price * product.count;
        }
      }
      return result.toFixed(2);
    });

    // 计算是否全选
    const allChecked = computed(() => {
      const productId = cartList[shopId];
      let result = true;
      for (let k in productId) {
        if (!productId[k].checked) {
          result = false;
        }
      }
      return result;
    });

    // 得出选中购物车的结果
    const productList = computed(() => {
      const productId = cartList[shopId] || 0;
      return productId;
    });

    // 点击向vuex发送事件
    const addProduct = (shopId, productID, productInfo) => {
      store.commit({
        type: "addProduct",
        shopId,
        productID,
        productInfo,
      });
    };
    const subProduct = (shopId, productID) => {
      store.commit({
        type: "subProduct",
        shopId,
        productID,
      });
    };
    // 点击购物车展示列表
    const showList = () => {
      isShow.value = !isShow.value;
    };
    // 改变商品选中状态
    const changeCheck = (shopId, productID) => {
      store.commit({
        type: "changeCheck",
        shopId,
        productID,
      });
    };
    // 清空购物车
    const clearCart = (shopId) => {
      store.commit("clearCart", shopId);
    };
    const checkedAll = (shopId, productID) => {
      store.commit("checkedAll", { shopId, productID });
    };

    return {
      shopId,
      total,
      totalPrice,
      productId,
      productList,
      addProduct,
      subProduct,
      cartList,
      isShow,
      showList,
      changeCheck,
      clearCart,
      checkedAll,
      allChecked,
    };
  },
};
</script>

<style lang="scss" scoped>
.list-enter-from {
  opacity: 0;
  height: 0;
}
.list-enter-active {
  transition: all 0.5s;
  opacity: 1;
}
.list-move {
  transition: all 0.4s;
}
.mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
}
.cart {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 0.49rem;
  background-color: #fff;
  box-shadow: 0 -1px 1px 0 #f1f1f1;
  &__img {
    position: relative;
    // margin-left: 0.24rem;
    width: 0.28rem;
    height: 0.26rem;
    font-size: 0.2rem;
    img {
      margin-left: 0.1rem;
      width: 100%;
    }
    &__icon {
      position: absolute;

      top: -0.1rem;
      left: 0.24rem;
      padding: 0.08rem;
      width: 0.2rem;
      height: 0.2rem;
      color: #ffffff;
      background-color: #e93b3b;
      text-align: center;
      border-radius: 50%;
      transform: scale(0.4);
      transform-origin: left center;
    }
  }
  &__totl {
    flex: 1;
    margin-left: 0.32rem;
    height: 0.49rem;
    line-height: 0.49rem;
    font-size: 0.12rem;
    span {
      margin-top: 0.09rem;
      font-weight: 700;
      color: #e93b3b;
      font-size: 0.18rem;
    }
  }
  &__settl {
    width: 0.98rem;
    height: 0.49rem;
    line-height: 0.49rem;
    font-size: 0.14rem;
    color: #ffffff;
    background-color: #4fb0f9;
    text-align: center;
  }
}
.list {
  display: flex;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0.5rem;
  .content__deil {
    overflow-y: scroll;
    width: 100%;
    background-color: #fff;
    margin-left: 0rem;

    &__head {
      display: flex;
      justify-content: space-between;
      margin-left: 0.1rem;
      height: 0.52rem;
      font-size: 14px;
      color: #333333;
      border-bottom: 1px solid #f1f1f1;
      span {
        margin-right: 0.18rem;
        font-size: 14px;
        color: #333333;
        text-align: right;
        line-height: 0.52rem;
      }
      &__all {
        margin-left: -2rem;
        font-size: 14px;
        color: #333333;
      }
      &__icon {
        height: 100%;
        line-height: 0.52rem;
        font-size: 0.2rem;
      }
    }
    &__item {
      display: flex;
      width: 100%;
      font-size: 0.14rem;
      margin-left: 0.1rem;
      &__icon {
        width: 0.2rem;
        height: 100%;
        line-height: 100%;
        font-size: 0.2rem;
      }
      img {
        margin-left: 0.54rem;
        width: 0.45rem;
        height: 0.46rem;
      }
      &__des {
        position: relative;
        flex: 1;
        margin: 0 0 0.06rem 0.06rem;
        h4 {
          margin: 0 0 0.06rem 0;
        }
        p {
          margin: 0;
          padding: 0;
          font-size: 0.12rem;
        }
        .caculater {
          padding: 0;
          line-height: 0.2rem;
          color: #e93b3b;
          font-size: 0.12rem;
          font-weight: 700;
          &__sale {
            margin-left: 0.1rem;
            font-weight: 400;
            font-size: 10px;
            color: #999999;
            text-decoration: line-through;
          }
          &__cacl {
            position: absolute;
            right: 0.1rem;
            font-size: 0.14rem;
            color: #333333;
            line-height: 16px;
            &__sub,
            &__add {
              display: inline-block;
              width: 0.2rem;
              height: 0.2rem;
              line-height: 0.2rem;
              background-color: #fff;
              border: 1px solid #666666;
              border-radius: 50%;
              text-align: center;
            }
            &__sub {
              margin-right: 0.1rem;
            }
            &__add {
              margin-left: 0.1rem;
              color: #fff;
              background-color: #0091ff;
            }
          }
        }
      }
    }
  }
}
</style>