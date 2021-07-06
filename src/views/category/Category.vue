<template>
  <div class="wrapper">
    <back-top @click.native="backTop" v-show="{active:isShowBackTop}"></back-top>

  </div>
</template>

<script>
import {backTopMixin} from "@/common/mixin";

export default {
name: "Category",
  mixins:[backTopMixin]
}
</script>

<style scoped>

</style>
