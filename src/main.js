import Vue from 'vue'
import App from './App.vue'
// import * as echarts from 'echarts'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import {createWorker, createScheduler,RecognizeResult,PSM,OEM}  from "tesseract.js"
import VueResource from 'vue-resource'
import axios from "axios";
axios.defaults.headers.post['Content-Type'] = 'application/json';
Vue.prototype.$axios = axios;
Vue.use(VueResource);
Vue.use(BootstrapVue);
Vue.use(ElementUI);
Vue.config.productionTip = true;
// Vue.prototype.$echarts = echarts

// Vue.prototype.HOST = '/we'

import router from '@/router';
new Vue({
  render: h => h(App),
  router,
  beforeCreate(){
    Vue.prototype.$bus = this;
  }
}).$mount('#app')
