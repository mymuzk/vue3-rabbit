// 把components下的所有组件进行全局注册
// 通过插件的形式进行注册
import DetailView from './DetailView/index.vue'
import XtxSku from './XtxSku/index.vue'
// const { install } = require("element-plus");

export const componentPlugin = {
  install(app) {
    // app.component('组件名字'， 组件配置对象)  
    app.component('XtxDetailView', DetailView)
    app.component('XtxSku', XtxSku)

  }
}