<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick ="titleClick" ></detail-nav-bar>
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imgLoad="imgLoad"></detail-goods-info>
      <detail-goods-param ref="param" :goods-param="goodsParam"></detail-goods-param>
      <detail-comment-info ref="comment" :comment-info="commentInfo"></detail-comment-info>
      <goods-list ref="recommend" :goods="recommend"></goods-list>
    </scroll>
    <detail-bottom-bar @addCart="addToCart"></detail-bottom-bar>
    <back-top @click.native="backTop" v-show="{active:isShowBackTop}"></back-top>

<!--    <toast :message="message" :show="show"></toast>-->
  </div>
</template>

<script>
import DetailNavBar from "@/views/detail/childComps/DetailNavBar";
import {getDetail,Goods,Shop,GoodsParam,getRecommend} from "@/network/detail";
import DetailBaseInfo from "@/views/detail/childComps/DetailBaseInfo";
import DetailShopInfo from "@/views/detail/childComps/DetailShopInfo";
import DetailSwiper from "@/views/detail/childComps/DetailSwiper";
import  DetailGoodsInfo from "@/views/detail/childComps/DetailGoodsInfo";
import DetailGoodsParam from "@/views/detail/childComps/DetailGoodsParam";
import DetailCommentInfo from "@/views/detail/childComps/DetailCommentInfo";
import Scroll from "@/components/common/scroll/Scroll";
import GoodsList from "@/components/content/goods/GoodsList";
import {itemListenerMixin,backTopMixin} from "@/common/mixin";
import {debounce} from "@/common/utils";
import DetailBottomBar from "@/views/detail/childComps/DetailBottomBar";

// import Toast from "@/components/common/toast/Toast";

//映射计算属性
import {mapActions} from 'vuex'

export default {
name: "Detail",
  components:{
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailGoodsParam,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar,
    // Toast
  },
  data(){
    return{
      iid:null,
      topImages:[],
      goods: {},
      shop:{},
      detailInfo:{},
      goodsParam:{},
      commentInfo:{},
      recommend:[],
      themeTopY:[],
      getThemeTopY:null,
      currentIndex:0,
      // message:'',
      // show:false
    }
  },
  mixins:[itemListenerMixin,backTopMixin],
  created() {
    // 保存iid的数据
    this.iid = this.$route.params.iid
    // 根据iid请求数据
    getDetail(this.iid).then(res=>{
      // console.log(res);
      //  获取顶部轮播图数据
      const data = res.data.result;
      this.topImages = data.itemInfo.topImages;
      this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)
      // 创建店铺信息
      this.shop = new Shop(data.shopInfo)
    //  保存商品的详情数据
      this.detailInfo = data.detailInfo;
      // 获取参数信息
      this.goodsParam = new GoodsParam(data.itemParams.info,data.itemParams.rule);
    //  取出评论信息
      if (data.rate.cRate !==0 ){
        this.commentInfo = data.rate.list[0]
      }
    //  请求推荐数据
      getRecommend().then(res=>{
        this.recommend = res.data.data.list;
      })
        //对getThemeTopY赋值操作进行防抖
      // 这里有问题，还没弄号
      this.getThemeTopY = debounce(()=>{
        // this.themeTopY = [];
        this.themeTopY.push(0);
        this.themeTopY.push(this.$refs.param.$el.offsetTop);
        this.themeTopY.push(this.$refs.comment.$el.offsetTop);
        this.themeTopY.push(this.$refs.recommend.$el.offsetTop);
        this.themeTopY.push(Number.MAX_VALUE)

        console.log(this.themeTopY);
      },100)
    })
  },
  methods:{
  ...mapActions(['addCart']),
    imgLoad(){
     this.newRefresh(),
       this.getThemeTopY
    },
    titleClick(index){
      this.$refs.scroll.scrollTo(0,-this.themeTopY[index],100)
    },
    contentScroll(position){
    // 获取y值
      const positionY = -position.y
    //  positionY的值与主题中进行对比
      let length = this.themeTopY.length;
      for (let i=0;i<length-1;i++){
        if (this.currentIndex !==i &&(positionY>=this.themeTopY[i] && positionY<this.themeTopY[i+1])){
          this.currentIndex = i;
          console.log(this.currentIndex);
          this.$refs.nav.currentIndex = this.currentIndex
        }
      }
      // 是否显示回到顶部
      this.listenShowBackTop(position)
    },
    addToCart(){
      // 获取购物车需要展示的信息
      const product = {}
      product.image = this.topImages[0];
      product.title = this.goodsParam.title;
      product.desc = this.goodsParam.desc;
      product.price = this.goodsParam.realPrice;
      product.iid = this.iid;

      this.addCart(product).then(res=>{
        // this.show = true;
        // this.message = res;
        // setTimeout(()=>{
        //   this.show = false;
        //   this.message = ''
        // },1500)
        this.$toast.show(res,2000);
        console.log(this.$toast);
      })

      // 将信息添加到购物车
      // this.$store.dispatch('addCart',product).then(res=>{
      //   console.log(res);
      // })
    }
  },
  destroyed() {
    this.$bus.$off('itemImgLoad',this.itemImgListener)
  }
}
</script>

<style scoped>
#detail{
  position: relative;
  z-index: 999;
  background-color: #fff;
  height: 100vh;
}
.detail-nav{
  position: relative;
  z-index: 9;
  background-color: #fff;
}
.content{
  height: calc(100% - 44px - 49px);
}

</style>
