import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

import uView from "uview-ui";
Vue.use(uView);

import store from '@/store'

App.mpType = 'app'
import './api'

const app = new Vue({
    ...App,
    store
})
app.$mount()
