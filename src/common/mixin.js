import {debounce} from "@/common/utils";
import backTop from "@/components/content/backTop/backTop";
import {BACK_POSITION} from "@/common/const";

export const itemListenerMixin = {
  data(){
    return{
      itemImgListener:null,
      newRefresh:null
    }
  },
  mounted(){
// 图片加载完成的事件监听
    let newRefresh = debounce(this.$refs.scroll.refresh,100)
    //对监听事件进行保存
    this.itemImgListener = ()=>{
     this.newRefresh()
    }
    // 监听item图片加载完成
    this.$bus.$on('itemImageLoad',this.itemImgListener)
    console.log('我是混入中的内容');
  }
}

export const backTopMixin = {
  components:{
    backTop
  },
  data() {
    return{
      isShowBackTop:false
    }
  },
  methods:{
    backTop(){
      this.$refs.scroll.scrollTo(0,0,300)
    },
    listenShowBackTop(position){
      this.isShowBackTop = -position.y>BACK_POSITION
    }
  }
}
