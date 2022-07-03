import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import echarts from 'echarts'

import '@/icons' // icon
// import '@/permission' // permission control

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
// if (process.env.NODE_ENV === 'production') {
//     const { mockXHR } = require('../mock')
//     mockXHR()
// }

// set ElementUI lang to EN
// Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
Vue.use(ElementUI)

Date.prototype.Format = function(type) {
    let month = ''
    let date = ''
    if (type === 0) {
        if (+new Date().getMonth() + 1 <= 9) {
            month = `0${new Date().getMonth() + 1}`
        } else {
            month = `${new Date().getMonth() + 1}`
        }
        if (+new Date().getDate() <= 9) {
            date = `0${new Date().getDate()}`
        } else {
            date = `${new Date().getDate()}`
        }
        return `${new Date().getFullYear()}-${month}-${date}`
    } else {
        if (+new Date().getMonth() + 1 <= 9) {
            month = `0${new Date().getMonth() + 1}`
        } else {
            month = `${new Date().getMonth() + 1}`
        }
        return `${new Date().getFullYear()}-${month}`
    }
}

Vue.prototype.$echarts = echarts

Vue.config.productionTip = false

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
})