import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false


import VueMarkowndDoc from '../src/index'
// Vue.component('vue-md-doc', VueMarkowndDoc)
Vue.use(VueMarkowndDoc)

new Vue({
    el: '#app',
    router,
    render: h => h(App)
})