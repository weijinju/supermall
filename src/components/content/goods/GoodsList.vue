<template>
  <div class="goods">
    <goods-list-item v-for="item in goods" :goods-item="item">

    </goods-list-item>
  </div>
</template>

<script>
import GoodsListItem from "@/components/content/goods/GoodsListItem";
export default {
  name: "GoodList",
  props:{
    goods:{
      type:Array,
      default(){
        // 对象事数据和对象时，default必须要用对象
        return []
      }
    }
  },
  components:{
    GoodsListItem
  }
}
</script>

<style scoped>
  .goods{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    padding: 2px;
  }

</style>
