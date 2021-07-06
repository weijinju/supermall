import {request} from "./request"

export function getHomeMultidata() {
  return request({
    url:'/home/multidata'
  })
}

export function getHomeGoods(type,page) {
  return request({
    url:'/home/data',
    // 传路径
    params:{
      type,
      page
    }
  })
}
