import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
      // 自定义tabbar数据
      vuex_tabbar: [
        {
          "pagePath": "/pages/capital/capital",
          "iconPath": "/static/img/banner/capital.png",
          "selectedIconPath": "/static/img/banner/capital-check.png",
          "text": "资金",
          isDot: false
        },
        {
          "pagePath": "",
          "iconPath": "/static/img/banner/customer.png",
          "selectedIconPath": "/static/img/banner/customer-check.png",
          "text": "客户",
          count: 0,
          isDot: true
        },
        {
          "pagePath": "/pages/channel/channel",
          "iconPath": "/static/img/banner/channel.png",
          "selectedIconPath": "/static/img/banner/channel-check.png",
          "text": "渠道",
          isDot: false
        },
        {
          "pagePath": "/pages/price/price",
          "iconPath": "/static/img/banner/price.png",
          "selectedIconPath": "/static/img/banner/price-check.png",
          "text": "价格",
          count: 0,
          isDot: true
        },
        {
          "pagePath": "/pages/order/order",
          "iconPath": "/static/img/banner/order.png",
          "selectedIconPath": "/static/img/banner/order-check.png",
          "text": "订单",
          isDot: false
        }
      ],
      changeId: null,
      addId: null,
      customerJurisdictionTrues: false,
      customerId: null,
      customerDelList: [],
      customerTopScroll: 0,
      channelId: null,
      channelDelList: [],
      channelTopScroll: 0,
      priceId: null,
      priceTopScroll: 0,
    },
    mutations: {
      vuexTabbar(state,data){
        state.vuex_tabbar[1].count = data;
      },
      vuexTabbar1(state,data){
        state.vuex_tabbar[3].count = data;
      },
      vuexTabbarList(state,data){
        console.log(state,data)
        state.vuex_tabbar = data;
      },
      changeIdKey(state,data){
        state.changeId = data;
      },
      addIdKey(state,data){
        state.addId = data;
      },
      customerJurisdictionKey(state,data){
        state.customerJurisdictionTrues = data;
      },
      customerIdKey(state,data){
        state.customerId = data;
      },
      customerDelListKey(state,data){
        state.customerDelList = data;
      },
      customerTopScrollKey(state,data){
        state.customerTopScroll = data;
      },
      channelIdKey(state,data){
        state.channelId = data;
      },
      channelDelListKey(state,data){
        state.channelDelList = data;
      },
      channelTopScrollKey(state,data){
        state.channelTopScroll = data;
      },
      priceIdKey(state,data){
        state.priceId = data;
      },
      priceTopScrollKey(state,data){
        state.priceTopScroll = data;
      }
    },
    actions: {}
})
export default store