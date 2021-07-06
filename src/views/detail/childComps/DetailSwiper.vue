<template>
  <div class="detail-swiper">
<!--    轮播图没有显示全-->
    <swiper>
      <swiper-item v-for="item in topImages">
          <img :src="item" alt="">
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import {Swiper, SwiperItem} from "@/components/common/swiper"

export default {
name: "DetailSwiper",
  components:{
    Swiper,
    SwiperItem
  },
  props:{
    topImages:{
      type:Array,
      default(){
        return []
      }
    }
  },
  methods:{

  }
}
</script>

<style scoped>
.detail-swiper{
  height: 300px;
  overflow: hidden;
}
</style>
