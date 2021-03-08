<template>
  <div>
    <div class="nearby__item">
      <img :src="list.imgUrl" class="nearby__item__img" />
      <div class="nearby__item__title">{{ list.name }}</div>
      <div class="nearby__item__tags">
        <span class="nearby__item__tag">月售：{{ list.sales }}</span>
        <span class="nearby__item__tag">起送￥{{ list.expressLimit }}</span>
        <span class="nearby__item__tag">基础运费￥{{ list.expressPrice }}</span>
      </div>
      <div
        :class="{ nearby__item__vip: true, 'nearby__item__vip--boder': isShow }"
      >
        {{ list.slogan }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Object,
    },
    isShow: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

<style lang="scss" scope>
@import "../../assets/css/variable.scss";
.nearby__item {
  &__img {
    float: left;
    margin-right: 0.16rem;
    vertical-align: middle;
    width: 0.56rem;
  }
  &__title {
    margin: 0.08rem 0;
    font-size: 0.16rem;
    font-weight: 700;
  }
  &__tags {
    margin-top: -0.3rem;
  }
  &__tag {
    display: inline-block;
    margin: 0 0.16rem 0.08rem 0;
    font-size: 0.13rem;
  }
  &__vip {
    margin-left: 0.72rem;
    padding-bottom: 0.12rem;
    font-size: 0.15rem;
    color: #e93b3b;
    font-family: PingFangSC-Regular;
  }
  &__vip--boder {
    border-bottom: 1px solid $content-bgColor;
  }
}
</style>