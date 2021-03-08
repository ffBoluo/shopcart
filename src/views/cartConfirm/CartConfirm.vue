<template>
  <div>
    <div class="confirm">
      <!-- 头部信息栏 -->
      <div class="confirm__head">
        <div class="confirm__head__back iconfont" @click="getBack">
          &#xe602;
        </div>
        <div class="confirm__head__title">确认订单</div>
        <div class="confirm__head__adress">
          <h4 class="confirm__head__adress__title">收货地址</h4>
          <p class="confirm__head__adress__p">
            北京理工大学国防科技园2号楼10层
          </p>
          <span>瑶妹（先生）</span><span>18911024266</span>
        </div>
      </div>
      <!-- 产品列表 -->
      <div class="confirm__product">
        <h4 class="confirm__product__title">沃尔玛</h4>
        <!-- 结算物品 -->
        <div
          class="content__deil__item"
          v-for="item in cartList"
          :key="item._id"
          v-show="total.result"
        >
          <img :src="item.imgUrl" />
          <div class="content__deil__item__des">
            <h4>{{ item.name }}</h4>
            <p class="caculater">
              ¥{{ item.price }}×{{ item.count }}
              <span class="caculater__cacl"
                >¥{{ (item.price * item.count).toFixed(2) }}</span
              >
            </p>
          </div>
        </div>
        <!-- 底部点击扩展 -->
        <div class="confirm__product__bottom">
          <span>共计{{ total.result }}件/{{ total.weight }}</span
          ><span class="confirm__product__bottom__down iconfont">&#xe625;</span>
        </div>
      </div>
    </div>
    <!-- 确认遮罩 -->
    <div class="mask" v-if="flag">
      <div class="center">
        <h3>确认要离开收银台？</h3>
        <p>请尽快完成支付，否则将被取消</p>
        <div class="mask__btn">
          <div class="mask__btn__cancle" @click="handleConfirm(false)">
            取消订单
          </div>
          <div class="mask__btn__confirm" @click="handleConfirm(true)">
            确认支付
          </div>
        </div>
      </div>
    </div>
    <!-- 底部结算栏 -->
    <div class="cart">
      <div class="cart__totl">
        实付金额：<span> ￥{{ total.totalPrice }}</span>
      </div>
      <div class="cart__settl" @click="flag = true" v-show="total.result > 0">
        提交订单
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import { post } from "../../utils/request";
// 计数
const totalCount = (shopId) => {
  const store = useStore();
  const cartList = store.state.cartList[shopId];
  const total = computed(() => {
    let result = 0,
      weight = 0,
      totalPrice = 0;
    for (let k in cartList) {
      totalPrice += cartList[k].count * cartList[k].price;
      result++;
      weight += cartList[k].name.replace(/[^0-9]/gi, "") * cartList[k].count;
    }
    weight = weight / 1000 + "kg";
    totalPrice = totalPrice.toFixed(2);
    return { result, weight, totalPrice };
  });
  // 遍历数组提交
  const products = [];
  for (let k in cartList) {
    const item = {
      id: cartList[k]._id,
      num: cartList[k].count,
    };
    products.push(item);
  }

  return { total, products, cartList };
};

// 发送提交订单请求
const orderEffect = (shopId, products) => {
  const router = useRouter();
  const handleConfirm = async (isCanceled) => {
    try {
      const { data } = await post("/api/order", {
        addressId: "12",
        shopId,
        shopName: "沃尔玛",
        isCanceled,
        products,
      });
      if (data.errno === 0) {
        router.push("/order");
      }
    } catch (e) {
      console.log(e);
    }
  };
  return { handleConfirm };
};
export default {
  setup() {
    const route = useRoute();
    const shopId = route.params.id;
    // 控制提交订单mask 变量
    const flag = ref(false);
    // 返回按钮
    const getBack = () => {
      router.back();
    };
    const { total, products, cartList } = totalCount(shopId);
    const { handleConfirm } = orderEffect(shopId, products);
    return {
      shopId,
      cartList,
      total,
      getBack,
      handleConfirm,
      flag,
    };
  },
};
</script>

<style lang="scss" scoped>
.confirm {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0.5rem;
  background-color: #f8f8f8;
  &__head {
    position: relative;
    width: 100%;
    height: 1.59rem;
    background: linear-gradient(0deg, rgba(0, 145, 255, 0) 4%, #0091ff 50%);
    &__back {
      position: absolute;
      left: 0.18rem;
      top: 0.31rem;
      height: 0.2rem;
      color: #ffffff;
      font-size: 0.2rem;
    }
    &__title {
      position: absolute;
      left: 50%;
      top: 0.31rem;
      transform: translateX(-50%);
      font-size: 0.16rem;
      color: #ffffff;
    }
    &__adress {
      position: absolute;
      left: 50%;
      top: 0.84rem;
      transform: translateX(-50%);
      width: 3.39rem;
      height: 1.11rem;
      font-size: 0.16rem;
      background-color: #fff;
      border-radius: 0.04rem;
      &__title {
        margin-top: 0.15rem;
        padding-left: 0.1rem;
      }
      &__p {
        margin: 0 0 0.1rem;
        padding-left: 0.1rem;
        font-size: 0.14rem;
        color: #333333;
      }
      span {
        margin-left: 0.1rem;
        font-size: 12px;
        color: #666666;
      }
    }
  }
  &__product {
    position: absolute;
    left: 50%;
    top: 2.12rem;
    transform: translateX(-50%);
    width: 3.39rem;
    background-color: #fff;
    border-radius: 0.04rem;
    &__title {
      margin: 0.15rem 0 0.1rem;
      padding-left: 0.1rem;
      font-size: 0.16rem;
      color: #333333;
    }
    &__bottom {
      margin: 0.05rem auto;
      width: 3.07rem;
      height: 0.28rem;
      line-height: 0.28rem;
      font-size: 0.14rem;
      color: #999999;
      background: #f5f5f5;
      text-align: center;
      &__down {
        display: inline-block;
        margin-left: 0.05rem;
      }
    }
  }
}
// 遮罩
.mask {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1;
  .center {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 3rem;
    height: 1.57rem;
    background-color: #fff;
    border-radius: 0.04rem;
    h3 {
      margin: 0.24rem 0 0.08rem 0;
      font-size: 0.18rem;
      color: #333333;
    }
    p {
      margin: 0 0 0.24rem;
      font-size: 0.14rem;
      color: #666666;
    }
  }
  &__btn {
    display: flex;
    font-size: 0.14rem;
    &__cancle,
    &__confirm {
      width: 0.8rem;
      height: 0.32rem;
      line-height: 0.32rem;
      border: 1px solid #4fb0f9;
      border-radius: 0.16rem;
      text-align: center;
    }
    &__cancle {
      margin-right: 0.05rem;
      color: #0091ff;
    }
    &__confirm {
      margin-left: 0.05rem;
      color: #ffffff;
      background: #4fb0f9;
    }
  }
}

// 无品栏

.content__deil__item {
  display: flex;
  margin-left: 0.16rem;
  padding-top: 0.1rem;
  width: 100%;
  font-size: 0.14rem;
  img {
    width: 0.46rem;
    height: 0.46rem;
  }
  &__des {
    position: relative;
    flex: 1;
    margin: 0 0 0.16rem 0.16rem;
    h4 {
      margin: 0 0 0.06rem 0;
    }
    p {
      margin: 0;
      padding: 0.06rem 0;
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
        right: 0.3rem;
        font-size: 0.14rem;
        color: #333333;
        line-height: 16px;
      }
    }
  }
}

.cart {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  left: 0;
  bottom: 0rem;
  width: 100%;
  height: 0.49rem;
  background-color: #fff;
  box-shadow: 0 -1px 1px 0 #f1f1f1;
  &__totl {
    flex: 1;
    margin-left: 0.32rem;
    height: 0.49rem;
    line-height: 0.49rem;
    font-size: 0.14rem;
    span {
      margin-top: 0.09rem;
      font-weight: 700;
      color: #333333;
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
</style>