// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from "vuex";
import App from './App'
import router from './router'
import $http from './request'
import store from './store'
import { Swipe, SwipeItem } from 'vue-swipe';

import { PullRefresh, list, Dialog } from 'vant'

Vue.use(Vuex);
Vue.component('swipe', Swipe);
Vue.component('swipe-item', SwipeItem);

Vue.use(PullRefresh).use(list).use(Dialog)


Vue.config.productionTip = false
Vue.prototype.$http = $http

router.afterEach((to,from,next) => {
  setTimeout(()=>{
    var _mtac = {"performanceMonitor":1};
  	(function() {
  		var mta = document.createElement("script");
  		mta.src = "//pingjs.qq.com/h5/stats.js?v2.0.4";
  		mta.setAttribute("name", "MTAH5");
  		mta.setAttribute("sid", "500713000");
  		mta.setAttribute("cid", "500713003");
  		var s = document.getElementsByTagName("script")[0];
  		s.parentNode.insertBefore(mta, s);
  	})();
  },0)
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

