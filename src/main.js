// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import httpServer from './service'
import VueResource from 'vue-resource'


Vue.use(Vuetify)
Vue.use(Vuex)
Vue.use(VueResource)


Vue.config.productionTip = false

Vue.prototype.$formatTime = function(timeStamp, format) {
    var date = {
       "M+": new Date(timeStamp).getMonth() + 1,
       "d+": new Date(timeStamp).getDate(),
       "h+": new Date(timeStamp).getHours(),
       "m+": new Date(timeStamp).getMinutes(),
       "s+": new Date(timeStamp).getSeconds(),
       "q+": Math.floor((new Date(timeStamp).getMonth() + 3) / 3),
       "S+": new Date(timeStamp).getMilliseconds()
    };
    if (/(y+)/i.test(format)) {
       format = format.replace(RegExp.$1, (new Date(timeStamp).getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for (var k in date) {
       if (new RegExp("(" + k + ")").test(format)) {
           format = format.replace(RegExp.$1, RegExp.$1.length == 1
              ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
       }
    }
    return format;
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
