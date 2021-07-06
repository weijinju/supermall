<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button
        :is-checked="isSelectAll"
        class="check-button"
        @click.native="checkClick"
      ></check-button>
      <span>全选</span>
    </div>

    <div class="totalPrice">
      合计:{{totalPrice}}
    </div>

    <div class="calculate" @click="calcuClick">
      去计算:{{ (checkLength)}}
    </div>

  </div>
</template>

<script>
import CheckButton from "@/components/content/checkButton/CheckButton";
import {mapGetters} from "vuex"
export default {
name: "CartBottomBar",
  components:{
  CheckButton
  },

  computed:{
    ...mapGetters(['cartList']),
  totalPrice(){
    return '￥'+ this.cartList.filter(item=>{
      return item.checked
    }).reduce((previousValue, item) =>{
      return item.price * item.count + previousValue
    },0).toFixed(2)
  },
    checkLength(){
    return this.cartList.filter(item=>item.checked).length
    },
    isSelectAll(){
      //方法1
      // return  !(this.cartList.filter(item=> !item.checked).length)
    //  方法2
    //   if (this.cartList.length === 0){
    //     return false
    //   }
    //   return !this.cartList.find(item => !item.checked)
    //  方法3 遍历
      for (let item in this.cartList){
        if (!item.checked){
          return false
        }else {
          return true
        }
      }
    }
  },
  methods:{
    checkClick(){
      if (this.isSelectAll){
        this.cartList.forEach(item=>item.checked = false)
      }else {
        this.cartList.forEach(item=>item.checked = true)
      }
    },
    calcuClick(){
      if (!this.isSelectAll){
        this.$toast.show('请选择购买的商品',2000)
      }
    }
  }
}
</script>

<style scoped>
  .bottom-bar{
    height: 40px;
    position: relative;
    line-height: 40px;
    display: flex;
  }
  .check-content{
    display: flex;
    align-items: center;
    margin-left: 10px;
    width: 70px;
  }
  .check-button{
    width: 20px;
    height: 20px;
    line-height: 20px;
    margin-right: 5px;
  }
  .totalPrice{
    margin-left: 20px;
    flex: 1;
  }
  .calculate{
   width: 80px;
    font-size: 14px;
    background: crimson;
  }
</style>
