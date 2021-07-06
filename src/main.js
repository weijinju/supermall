import Vue from 'vue'
import App from './App.vue'
import router from "@/router"
import store from "@/sotre";

import FastClick from 'fastclick'
import VueLazyload from "vue-lazyload";

import toast from 'components/common/toast/index'

Vue.config.productionTip = false

//添加事件总线对象
Vue.prototype.$bus = new Vue()
// 安装toast插件
Vue.use(toast)

//解决移动端300ms延迟
FastClick.attach(document.body);

//懒加载
Vue.use(VueLazyload,{
  loading:require('./assets/img/common/placeholder.png')
});
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')