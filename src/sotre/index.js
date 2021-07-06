import Vue from "vue";
import Vuex from "vuex"
import {ADD_COUNTER, ADD_TO_CART} from "@/sotre/mutations-type";
import mutations from "@/sotre/mutations";
import actions from "@/sotre/actions";
import getters from "@/sotre/getters";


Vue.use(Vuex)

const state = {
  cartList:[]
}
const store = new Vuex.Store({
    state,
  mutations,
  actions,
  getters

    //mutations唯一的目的是修改state中的状态
})

export default store
