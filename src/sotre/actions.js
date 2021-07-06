import {ADD_TO_CART,ADD_COUNTER} from "@/sotre/mutations-type";
export default {
  addCart(context,payload){
    return new Promise((resolve, reject) => {
      let oldProduct =context.state.cartList.find(item => item.iid === payload.iid);
      if (oldProduct){
        // oldProduct.count +=1
        context.commit(ADD_COUNTER,oldProduct)
        resolve('当前商品加1')
      }else {
        payload.count = 1
        // context.state.cartList.push(payload)
        context.commit(ADD_TO_CART,payload)
        resolve('添加了新商品')
      }
    })

  }
}

//有判断逻辑可放入actions
