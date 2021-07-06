export function debounce(func,delay){
  let timer = null
  return function (...args) {
    if (timer) clearTimeout()
    timer = setTimeout(()=>{
      func.apply(this,args)
    },delay)
  }
}

// 时间格式化

//正则表达式：是字符串匹配
//+ 表示1个或多个；*表示0个或多个；？0个或1个y
export function formatDate(date, fmt) {
  //获取年份
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  //获取
  //M+：正则表达规则
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
};
function padLeftZero (str) {
  return ('00' + str).substr(str.length);
};

//如何蒋时间戳转化为时间格式化字符串
// 1.蒋时间戳转化成Date对象
// 2.蒋date进行格式化，转成对应的字符串
