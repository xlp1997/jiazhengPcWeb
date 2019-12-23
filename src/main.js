// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueAwesomeSwiper from 'vue-awesome-swiper';
import 'swiper/dist/css/swiper.css';
import App from './App'
import router from './router'
import ViewUI from 'view-design';
// import 'view-design/dist/styles/iview.css';
import './my-theme/my-theme.less';
import "./my-theme/index.less";
Vue.use(VueAwesomeSwiper)

import https from '../static/utils/https'
Vue.use(https)
// require styles
import MetaInfo from 'vue-meta-info';
Vue.use(MetaInfo)

import filter from '../static/utils/filter';

Vue.use(filter);


Vue.config.productionTip = false
Vue.use(ViewUI);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
