module.exports = {
  plugins: {
    autoprefixer: {},
    "postcss-px-to-viewport": {
      viewportWidth: 375,  // 视窗的宽度，对应的是我们设计稿的宽度.
      viewportHeight: 667, // 视窗的高度，对应的是我们设计稿的高度.(也可以不配置)
      unitPrecision: 5, // 指定`px`转换为视窗单位值的小数位数（很多时候无法整除）
      viewportUnit: 'vw', // 指定需要转换成的视窗单位，建议使用vw
      selectorBlackList: ['ignore','tab-bar', 'tab-bar-item', 'shopping-cart-bottom-bar'], // 指定不需要转换的类
      minPixelValue: 1, // 小于或等于`1px`不转换为视窗单位.
      mediaQuery: false, // 允许在媒体查询中转换`px`
      exclude:[/TabBar.vue$/]  //必须正则匹配文件
    }
  }
}
//再JS中使用正则：/正则相关规则/
//exclude中存放的元素必须是正则表达式
//按照排除的文件写对应的正则
//正则的规则：
//1>^abc:表示匹配的内容，必须以内容开头(以abc开头)
//2>abc$:表示匹配的内容跟，必须以什么内容结尾(以abc结尾)
//
