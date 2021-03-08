<template>
  <div class="wrapper">
    <!-- 地址区域 -->
    <div class="position">
      <span class="position__left iconfont"> &#xe608;</span>
      北京理工大学国防科技园2号楼10层
      <span class="position__right iconfont"> &#xe72c;</span>
    </div>
    <!-- 搜索区域 -->
    <div class="search">
      <span class="iconfont">&#xe601;</span>
      <span class="search__title">山姆会员商店优惠商品</span>
    </div>
    <!-- 图片区域 -->
    <div class="banner">
      <img
        src="http://www.dell-lee.com/imgs/vue3/banner.jpg"
        class="banner__img"
      />
    </div>
    <!-- 图标区域 -->
    <div class="icons">
      <div class="icons__item" v-for="(item, index) in iconList" :key="index">
        <img
          :src="`http://www.dell-lee.com/imgs/vue3/${item.icon}.png`"
          class="icons__item__img"
        />
        <p class="icons__item__desc">{{ item.title }}</p>
      </div>
    </div>
    <!-- 间隔区域 -->
    <div class="gap"></div>
    <!-- 店铺详情 -->
    <Nearby class="near" />
  </div>
</template>

<script>
import Nearby from "./Nearby";
export default {
  setup() {
    const iconList = [
      { icon: "超市", title: "超市便利" },
      { icon: "菜市场", title: "菜市场" },
      { icon: "水果店", title: "水果店" },
      { icon: "鲜花", title: "鲜花绿植" },
      { icon: "医药健康", title: "医疗健康" },
      { icon: "家居", title: "家居时尚" },
      { icon: "蛋糕", title: "烘培蛋糕" },
      { icon: "签到", title: "签到" },
      { icon: "大牌免运", title: "大牌免运" },
      { icon: "红包", title: "红包套餐" },
    ];
    return { iconList };
  },
  components: {
    Nearby,
  },
};
</script>

<style lang="scss" scope>
@import "../../assets/css/variable.scss";
@import "../../assets/css/mixins.scss";
.near {
  margin-left: 0.15rem;
}
.wrapper {
  overflow-y: auto;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0.5rem;
  padding: 0 0.18rem;
  .position {
    position: relative;
    padding: 0.16rem 0;
    font-size: 0.2rem;
    @include ellipse;
    &__left {
      font-size: 0.2rem;
    }
    .position__right {
      position: absolute;
      right: 0;
      font-size: 0.2rem;
    }
  }
  .search {
    box-sizing: border-box;
    margin-bottom: 0.12rem;
    padding-left: 0.3rem;
    line-height: 0.39rem;
    width: 100%;
    font-size: 0.16rem;
    color: #b7b7b7;
    background: #f5f5f5;
    border-radius: 16px;
    .iconfont {
      position: relative;
      left: -0.1rem;
    }
    &__title {
      font-size: 0.16rem;
      color: #b7b7b7;
    }
  }
  .banner {
    height: 0;
    overflow: hidden;
    padding-bottom: 25.4%;
    &__img {
      width: 100%;
    }
  }
  .icons {
    display: flex;
    flex-wrap: wrap;
    &__item {
      width: 20%;
      text-align: center;
      &__img {
        width: 0.4rem;
        height: 0.4rem;
      }
      &__desc {
        font-size: 0.12rem;
        margin-top: -0.04rem;
      }
    }
  }
}
.gap {
  margin: 0 -0.18rem;
  height: 0.16rem;
  background: $content-bgColor;
}
</style>