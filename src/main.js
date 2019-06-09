// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import VueSocketIO from 'vue-socket.io'
import VueResource from 'vue-resource'
import VueCookie from 'vue-cookie'
import App from './App'
import BootstrapVue from 'bootstrap-vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faAngleUp, faAngleDown, faExpand, faCompress } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import router from './router'
import store from './store/Appstore'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(Vuex)
Vue.use(VueCookie)
Vue.use(BootstrapVue)
library.add(faAngleUp, faAngleDown, faExpand, faCompress)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

Vue.use(new VueSocketIO({
  debug: true,
  connection: 'http://localhost:3000',
  vuex: {
    store,
    actionPrefix: 'SOCKET_',
    mutationPrefix: 'SOCKET_'
  }
}))

Vue.use(VueResource)
Vue.http.options.root = 'http://localhost:3000/api'

/* eslint-disable no-new */
new Vue({
  router: router,
  store: store,
  render: h => h(App)
}).$mount('#app')
