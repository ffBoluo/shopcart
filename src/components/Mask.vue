<template>
  <div class="mask">{{ message }}</div>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
    },
  },
};
</script>

<style>
.mask {
  padding: 0.12rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -60%);
  color: rgba(0, 0, 0, 0.5);
  font-size: 0.3rem;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 0.05rem;
}
</style>