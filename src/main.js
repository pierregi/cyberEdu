// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueSocketIO from 'vue-socket.io'
import io from 'socket.io-client'
import VueResource from 'vue-resource'
import VueCookie from 'vue-cookie'
import App from './App'
import BootstrapVue from 'bootstrap-vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faAngleUp, faAngleDown, faExpand, faCompress } from '@fortawesome/free-solid-svg-icons'
import { faLightbulb } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import router from './router'
import store from './store/Appstore'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

window.$ = window.jQuery = require('jquery');

Vue.use(VueCookie)
Vue.use(BootstrapVue)
Vue.use(VueResource)

library.add(faAngleUp, faAngleDown, faExpand, faCompress, faLightbulb)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(new VueSocketIO({
  debug: false,
  connection: io(),// 'http://localhost:3000',
  vuex: {
    store,
    actionPrefix: 'SOCKET_',
    mutationPrefix: 'SOCKET_'
  }
}))

Vue.http.options.root = io('/api', { forceNew: true }).io.uri // 'http://localhost:3000/api'
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router: router,
  store: store,
  render: h => h(App)
}).$mount('#app')
