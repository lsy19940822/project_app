// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'vant/lib/index.css'
import echarts from 'echarts'
import pinyin from 'js-pinyin'
import $ from 'jquery'
// 萤石云视频直播所需依赖
import './assets/video/ezuikit.js'
import moment from 'moment'//导入文件 
Vue.prototype.$echarts = echarts;
Vue.prototype.$moment = moment;//赋值使用
// import preview from 'vue-photo-preview'
// import 'vue-photo-preview/dist/skin.css'
// Vue.use(preview, options)
// 配置项感觉也可以放在具体的组件中
var options = {
	 fullscreenEl: false, //关闭全屏按钮
	 tapToClose: true,
}
//import Store from './store'
import * as filters from '@/utils/filters'
// import moment from '@/utils/moment'
import VueCookies from 'vue-cookies'
Vue.use(VueCookies)

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
 // Vue.prototype.$moment = moment;//赋值使用
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
