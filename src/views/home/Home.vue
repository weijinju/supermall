<template>
  <div id="home">
<!--    首页导航栏以分析完-->
    <nav-bar class = "home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <!--    导航栏 解决滚动时，上下一致的问题-->
    <tab-control :titles="['流行','新款','精选']"
                 @tabClick = "tabClick"
                 ref="tabControl1"
                 class="tab-control"
                 v-show="isTabFixed"
    ></tab-control>
<!--    首页中，滚动部分-->
    <scroll class ="content"
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll"
            :pulling-up-load="true"
            @pullingUp = "loadMore"
    >
      <!--    轮播图展示-->
      <home-swiper :banners = banners  @swiperImageLoad="swiperImageLoad"></home-swiper>
      <!--    推荐区-->
      <recommend-view :recommends="recommends"></recommend-view>
      <!--    热门推荐区-->
      <feature-views></feature-views>
      <!--    导航栏-->
      <tab-control :titles="['流行','新款','精选']"
                   @tabClick = "tabClick"
                   ref="tabControl2"
      ></tab-control>
      <!--    商品展示-->
      <goods-list :goods = "showGoods"></goods-list>
      <!--    <goods-list :goods = "goods[this.currentType].list"></goods-list>-->
      <ul>
        <li>列表1</li>
        <li>列表2</li>
        <li>列表3</li>
        <li>列表4</li>
        <li>列表5</li>
        <li>列表6</li>
        <li>列表7</li>
        <li>列表8</li>
        <li>列表9</li>
        <li>列表10</li>
        <li>列表11</li>
        <li>列表12</li>
        <li>列表13</li>
        <li>列表14</li>
        <li>列表15</li>
        <li>列表16</li>
        <li>列表17</li>
        <li>列表18</li>
        <li>列表19</li>
        <li>列表20</li>
        <li>列表21</li>
        <li>列表22</li>
        <li>列表23</li>
        <li>列表24</li>
        <li>列表25</li>
        <li>列表26</li>
        <li>列表27</li>
        <li>列表28</li>
        <li>列表29</li>
        <li>列表30</li>
        <li>列表31</li>
        <li>列表32</li>
        <li>列表33</li>
        <li>列表34</li>
        <li>列表35</li>
        <li>列表36</li>
        <li>列表37</li>
        <li>列表38</li>
        <li>列表39</li>
        <li>列表40</li>
        <li>列表41</li>
        <li>列表42</li>
        <li>列表43</li>
        <li>列表44</li>
        <li>列表45</li>
        <li>列表46</li>
        <li>列表47</li>
        <li>列表48</li>
        <li>列表49</li>
        <li>列表50</li>
        <li>列表51</li>
        <li>列表52</li>
        <li>列表53</li>
        <li>列表54</li>
        <li>列表55</li>
        <li>列表56</li>
        <li>列表57</li>
        <li>列表58</li>
        <li>列表59</li>
        <li>列表60</li>
        <li>列表61</li>
        <li>列表62</li>
        <li>列表63</li>
        <li>列表64</li>
        <li>列表65</li>
        <li>列表66</li>
        <li>列表67</li>
        <li>列表68</li>
        <li>列表69</li>
        <li>列表70</li>
        <li>列表71</li>
        <li>列表72</li>
        <li>列表73</li>
        <li>列表74</li>
        <li>列表75</li>
        <li>列表76</li>
        <li>列表77</li>
        <li>列表78</li>
        <li>列表79</li>
        <li>列表80</li>
        <li>列表81</li>
        <li>列表82</li>
        <li>列表83</li>
        <li>列表84</li>
        <li>列表85</li>
        <li>列表86</li>
        <li>列表87</li>
        <li>列表88</li>
        <li>列表89</li>
        <li>列表90</li>
        <li>列表91</li>
        <li>列表92</li>
        <li>列表93</li>
        <li>列表94</li>
        <li>列表95</li>
        <li>列表96</li>
        <li>列表97</li>
        <li>列表98</li>
        <li>列表99</li>
        <li>列表100</li>
      </ul>
    </scroll>
<!--    .native当需要监听组件的原生事件时，必须给组件加上修饰符.native-->
    <back-top @click.native = "backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
  import NavBar from "@/components/common/navbar/NavBar";
  import HomeSwiper from "@/views/home/childComps/HomeSwiper";
  import RecommendView from "@/views/home/childComps/RecommendView";
  import FeatureViews from "@/views/home/childComps/FeatureViews";
  import GoodsList from "@/components/content/goods/GoodsList";
  import Scroll from "@/components/common/scroll/Scroll";
  import backTop from "@/components/content/backTop/backTop";

  import TabControl from "@/components/content/tabControl/TabControl";

  import {getHomeMultidata,getHomeGoods} from "@/network/home";
  import {itemListenerMixin,backTopMixin} from "@/common/mixin";

  export default {
    name: "Home",
    components:{
      NavBar,
      HomeSwiper,
      RecommendView,
      FeatureViews,
      GoodsList,
      TabControl,
      getHomeGoods,
      Scroll,
      backTop
      },
    //保存data数据
    data(){
      return{
        banners:[],
        recommends:[],
        goods:{
          'pop':{page:0,list:[]},
          'news':{page:0,list:[]},
          'sell':{page:0,list:[]},
        },
        currentType:'pop',
        tabOffsetTop:0,
        isTabFixed:false,
        saveY:0,

      }
    },
    mixins:[itemListenerMixin,backTopMixin],
    created() {
      //请求多个数据
      this.getHomeMultidata();
    //  请求商品数据
      this.getHomeGoods('pop');
      this.getHomeGoods('news');
      this.getHomeGoods('sell');


    },

    methods:{
      //防抖函数起作用的过程：
      //如果直接执行refresh，则refresh函数会执行30次
      //可将refresh传入debounce函数中，生成一个新的函数
      //之后在调用非常频繁的时候，使用新生成的函数
      //而新生成的函数，并不会非常频繁的调用，会将上次取消掉

      // 事件监听相关方法
      tabClick(index){
        switch (index) {
          case 0:
            this.currentType = 'pop'
            break;
          case 1:
            this.currentType = 'news'
            break;
          case 2:
            this.currentType = 'sell'
            break;
        }
        if (this.$refs.tabControl1.currentIndex !==undefined){
          this.$refs.tabControl1.currentIndex = index;
          this.$refs.tabControl2.currentIndex = index;
        }
      },
      backClick(){
        this.$refs.scroll.scrollTo(0,0,1000)
      },
      contentScroll(position){
        // 判断BackTop是否显示
        this.isShowBackTop = (-position.y) > 1000
        // 决定tabControl是否吸顶
        this.listenShowBackTop(position);
      },
      loadMore(){
        this.getHomeGoods(this.currentType);
      },
      swiperImageLoad(){
        // 获取tabControl的offsetTop
        // 所有组件都有一个属性$el,用于获取组件中的元素
        this.scroll = this.$refs.tabControl2.$el.offsetTop;

      },

      // 网络请求相关代码
      getHomeMultidata(){
        getHomeMultidata().then(res=>{
          this.result = res;
          this.banners = res.data.data.banner.list;
          this.recommends = res.data.data.recommend.list;
        })
      },
      getHomeGoods(type){
        const page = this.goods[type].page+1;
        getHomeGoods('pop',1).then(res=>{
          this.goods[type].list.push(...res.data.data.list);
          this.goods[type].page+=1;
          //  完成上拉加载更多
          this.$refs.scroll.finishPullUp()
        })
      }
    },
    computed:{
      showGoods(){
        return this.goods[this.currentType].list;
      }
    },
    destroyed() {
      console.log('home destroyed');
    },
    activated() {
      this.$refs.scroll.scrollTo(0,this.saveY,0)
      this.$refs.scroll.refresh();
    },
    deactivated() {
      //保存Y值
      this.saveY = this.$refs.scroll.getScrollY();
      // 取消全局事件的监听
      this.$bus.$on('itemImageLoad',this.itemImgListener)
    }
  }
</script>

<style scoped>
    #home{
      /*padding-top: 44px;*/
      height: 100vh;
      position: relative;
    }
    .home-nav{
    background-color: var(--color-tint);
      color: #fff;
      /*在使用浏览器原生滚动时，为了让导航不跟随一起滚动*/
      /*position: fixed;*/
      /*left: 0;*/
      /*right: 0;*/
      /*top:0;*/
      /*z-index: 9;*/
  }
    .content{
      /*height: 300px;*/
      overflow: hidden;

      position: absolute;
      top:10px;
      bottom: 49px;
      left: 0;
      right: 0;
    }
    .tab-control{
      position: relative;
      z-index: 9;
    }
    .fixed{
      position: fixed;
      left: 0;
      right: 0;
      top: 44px;
    }
    .content{
      height: calc(100%- 93px);
      background-color: bisque;
      overflow: hidden;
      margin-top: 52px;
    }
</style>
