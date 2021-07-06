module.exports={
//    配置别名
    configureWebpack:{
        //与路径有关
        resolve:{
        //    别名
        alias:{
          // 'src':'@':系统已自动配置该文件
            'assets':'@/assets',
            'common':'@/common',
            'components':'@/components',
            'network':'@/network',
        }
        }
    }
}
