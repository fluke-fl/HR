import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'
import vueParticleLine from 'vue-particle-line'
import 'vue-particle-line/dist/vue-particle-line.css'
Vue.use(vueParticleLine)
import '@/icons' // icon
import '@/permission' // permission control
import Ripple from 'vue-ripple-directive'
import * as directives from '@/directives'
import Components from '@/components/index'
import * as filters from '@/filters' // 引入工具类
import checkPermission from '@/mixin/checkPermission'
import i18n from '@/lang'
// 注册全局的过滤器
Object.keys(filters).forEach(key => {
  // 注册过滤器
  Vue.filter(key, filters[key])
})
// 全局混入-->混入后全局旧存在此方法
Vue.mixin(checkPermission)
Vue.use(Components)
Vue.directive('ripple', Ripple)
// set ElementUI lang to EN
// Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
Vue.use(ElementUI, {
  i18n: (key, value) => i18n.t(key, value)
})

Object.keys(directives).forEach(key => {
  Vue.directive(key, directives[key])
})
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})
