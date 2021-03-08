<template>
  <div class="content">
    <div class="content__item">
      <ul>
        <li
          v-for="(item, index) in categories"
          :class="{ 'content__item--active': isActive === item.tab }"
          :key="index"
          @click="() => handlActive(item.tab)"
        >
          {{ item.name }}
        </li>
      </ul>
    </div>
    <div class="content__deil">
      <div
        v-for="(item, index) in content.list"
        class="content__deil__item"
        :key="index"
      >
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
                  cartList?.[shopId]?.[item._id]?.count > 0
                    ? subProduct(shopId, item._id, item)
                    : ''
                "
                >-</span
              >
              {{ cartList?.[shopId]?.[item._id]?.count || 0 }}
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
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref, toRefs, watchEffect } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { get } from "../../utils/request";

// 左侧数据
const shopData = () => {
  const categories = [
    { name: "全部商品", tab: "all" },
    { name: "秒杀", tab: "seckill" },
    { name: "水果", tab: "fruit" },
  ];
  const isActive = ref(categories[0].tab);
  return { categories, isActive };
};
// 获取右侧数据
const useShopEffer = (current, id) => {
  const content = reactive({ list: [] });

  const getShopList = async () => {
    const { data } = await get(`/api/shop/${id}/products`, {
      tab: current,
    });
    if (data.errno === 0 && data.data.length !== 0) {
      content.list = data.data;
    }
  };
  // 自动监听 getShopList 函数所依赖的数据
  watchEffect(() => {
    getShopList();
  });
  return { getShopList, content };
};

export default {
  setup() {
    const route = useRoute();
    const shopId = route.params.id;
    const { categories, isActive } = shopData();
    const { getShopList, content } = useShopEffer(isActive.value, shopId);
    getShopList(isActive.value);
    // 点击右侧发生变化
    const handlActive = (tab) => {
      isActive.value = tab;
      getShopList(tab);
    };
    // 点击向vuex发送事件
    const store = useStore();
    const { cartList } = toRefs(store.state);
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
    return {
      subProduct,
      cartList,
      getShopList,
      content,
      handlActive,
      categories,
      isActive,
      addProduct,
      shopId,
    };
  },
};
</script>

<style lang="scss" scoped>
.content {
  display: flex;
  position: absolute;
  top: 1.54rem;
  left: 0;
  right: 0.18rem;
  bottom: 0.5rem;
  &__item {
    overflow-y: scroll;
    width: 0.76rem;
    height: 100%;
    background-color: #f5f5f5;
    ul {
      padding: 0;
      margin: 0;
      li {
        height: 0.4rem;
        line-height: 0.4rem;
        color: #333333;
        font-size: 0.14rem;
        font-style: 700;
        text-align: center;
      }
    }
    &--active {
      background-color: #fff;
    }
  }
  &__deil {
    overflow-y: scroll;
    flex: 1;
    margin-left: 0.16rem;
    margin-top: -0.1rem;
    &__item {
      display: flex;
      padding-top: 0.1rem;
      width: 100%;
      font-size: 0.14rem;
      border-bottom: 2px solid #f1f1f1;
      img {
        width: 0.68rem;
        height: 0.68rem;
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