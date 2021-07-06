import {ADD_TO_CART,ADD_COUNTER} from "@/sotre/mutations-type";

export default {
  [ADD_COUNTER](state,payload){
    payload.count++
  },
  [ADD_TO_CART](state,payload){
    payload.checked = true
    state.cartList.push(payload)
  }
}

//mutations唯一目的是修改state中的状态
//mutations中的每一个方法尽可能完成任务单一
