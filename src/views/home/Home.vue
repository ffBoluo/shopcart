<template>
  <div>
    <StaticPart />
    <Docker />
  </div>
</template>

<script>
import Docker from "../../components/dock/Docker";
import StaticPart from "./StaticPart";
export default {
  components: {
    Docker,
    StaticPart,
  },
};
</script>

<style>
</style>