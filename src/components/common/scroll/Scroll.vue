<template>
<!--  ref一般绑定到子组件-->
  <div class="wrap" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll"
// import BScroll from "@/components/common/scroll/Scroll";
import Pullup from '@better-scroll/pull-up'

BScroll.use(Pullup)

export default {
  name: "Scroll",
  components:{
    // PullUp
  },
  props:{
    probeType:{
      type:Number,
      default:0,
    },
    pullingUpLoad:{
      type:Boolean,
      default: true
    }

  },
  data(){
    return{
      scroll:null
    }
  },
  mounted() {
     //创建BScroll对象
     this.scroll = new BScroll(this.$refs.wrapper,{
        click:true,
       probeType:this.probeType,
       pullUpLoad:this.pullingUpLoad,
    })
    //监听滚动的位置
    if (this.probeType==2 || this.probeType == 3){
      this.scroll.on('scroll',(position)=>{
        this.$emit('scroll',position)
      })
    }
    // 监听上滚事件
    if (this.pullUpLoad){
      this.scroll.on("pullingUp", () => {
        this.$emit('pullingUp')
      });
    }
  },
  methods:{
    scrollTo(x,y,time = 300){
      this.scroll &&　this.scroll.scrollTo　&&　this.scroll.scrollTo(x,y,time)
    },
    finishPullUp(){
      this.scroll.finishPullUp();
    },
    // 对refresh非常频繁的问题，进行防抖操作
    refresh(){
      console.log('........');
      this.scroll &&this.scroll.refresh()
    },
    getScrollY(){
      return this.scroll?this.scroll.y:0
    }
  }
}
</script>

<style scoped>

</style>
