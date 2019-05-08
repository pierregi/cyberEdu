// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Vuex from 'vuex';
import VueSocketio from 'vue-socket.io';
import VueResource from 'vue-resource';
// import * as io from 'socket.io-client';
import App from './App';
import router from './router';
import store from './store/Appstore';
// const options = { path: '/my-app/' };

Vue.use(Vuex);
Vue.config.productionTip = false;

Vue.use(VueSocketio, 'http://localhost:3000'); // Automaticly socket connect from url string
Vue.use(VueResource);
Vue.http.options.root = 'http://localhost:3000/api';
/*
  import socketio from 'socket.io-client';

  var ioInstance = socketio('http://socketserver.com:1923');

  Vue.use(VueSocketio, ioInstance); // bind custom socketio instance
*/

// Vue.use(new VueSocketIO(io('http://localhost:3000'), store));
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>',
});
