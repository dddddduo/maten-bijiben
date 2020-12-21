<template>
  <view class="login pageUniapp">
    <view class="top-img">
      <image class="logo" src="../../static/img/logo.png" mode="aspectFit"></image>
    </view>
    <view class="input-list">
      <view class="input-row border">
        <image class="input-img" src="../../static/img/login/user.png" mode=""></image>
      	<lyd-input class="m-input" type="text" clearable focus v-model="username" placeholder="请输入用户名"></lyd-input>
      </view>
      <view class="input-row border">
        <image class="input-img" src="../../static/img/login/pwd.png" mode=""></image>
      	<lyd-input type="password" displayable v-model="password" placeholder="请输入密码"></lyd-input>
      </view>
      <view class="last-input">
        <view class="input-row border">
          <image class="input-img" src="../../static/img/login/code.png" mode=""></image>
        	<lyd-input class="m-input" type="text" clearable focus v-model="code" placeholder="请输入验证码"></lyd-input>
        </view>
        <view class="right-code">
          <image :src="imgUrl" class="avator" @tap="init" mode="">
        </view>
      </view>
      <view class="last-input">
        <view class="square" :class="pwdRemember ? 'background' : ''" @tap="pwdRemember = !pwdRemember">
          <view class="block">
            <!-- <image v-if="pwdRemember" src="../../static/img/login/checked.png" class="checked" mode=""></image> -->
          </view>
        </view>
        <view class="title">
          记住密码
        </view>
      </view>
      <view class="bottom-btn" @tap="login" :class="password !== '' ? 'bg-btn' : ''">
        登录
      </view>
    </view>
  </view>
</template>

<script>
	import lydInput from '../../components/lyd-input/lyd-input.vue'
  export default {
  	components: {
  		lydInput
  	},
    data(){
      return{
        username: '',
        password: '',
        pwdRemember: true,
        imgUrl: 'https://mkmngsys.mitech-ndt.com/admin.php?m=app&c=Login&a=verify',
        code: ''
      }
    },
    methods:{
      init(){
        this.imgUrl = this.imgUrl + '&' + Math.random()
      },
      login(){
        const that = this
		console.log(123456)
        if (that.password) {
          that.$api.getLoginApi({
            name: that.username,
            pwd: that.password,
            code: that.code
          }).then(res => {
            console.log(res)
            if (res.data.status === 200) {
              uni.setStorageSync('Authorization', res.data.data.token);
              uni.setStorageSync('dpLimit', res.data.data.user.dp_limit);
              uni.setStorageSync('uid', res.data.data.user.uid);
              let list = [
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
              ]
              this.$store.commit("vuexTabbarList", list);
              this.$store.commit("customerJurisdictionKey", false);
              uni.navigateTo({
                url: '../index/index'
              });
              this.limitMethods()
            } else if (res.data.status === 0) {
              uni.showToast({
                title: res.data.msg,
                duration: 2000,
                icon: 'none'
              });
              this.init()
            }
          }).catch(err => {
            console.log(err)
          })
        }
      },
      limitMethods () {
        const that = this
        let dpLimit = uni.getStorageSync('dpLimit');
        let uid = uni.getStorageSync('uid');
        console.log(1111111111111)
        console.log(dpLimit, uid)
        let list = []
        if (dpLimit.length > 0) {
          dpLimit.filter(item => {
            if (Number(item) === 264) {
              console.log(22222)
              list = [
                {
                  "pagePath": "/pages/capital/capital",
                  "iconPath": "/static/img/banner/capital.png",
                  "selectedIconPath": "/static/img/banner/capital-check.png",
                  "text": "资金",
                  isDot: false
                },
                {
                  "pagePath": "/pages/customer/customer",
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
              ]
              this.$store.commit("vuexTabbarList", list);
              this.$store.commit("customerJurisdictionKey", true);
            }
          })
        }
        if (Number(uid) === 1) {
          list = [
            {
              "pagePath": "/pages/capital/capital",
              "iconPath": "/static/img/banner/capital.png",
              "selectedIconPath": "/static/img/banner/capital-check.png",
              "text": "资金",
              isDot: false
            },
            {
              "pagePath": "/pages/customer/customer",
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
          ]
          this.$store.commit("vuexTabbarList", list);
          this.$store.commit("customerJurisdictionKey", true);
        }
      },
    }
  }
</script>

<style lang="less">
  .login {
    height: 100vh;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: #fff;
    .top-img {
      height: 120upx;
      text-align: center;
      image.logo{
        height: 120upx;
      }
    }
    .input-list {
      width: 100%;
      padding: 48upx 54upx 0;
      box-sizing: border-box;
      .last-input {
        display: flex;
        flex-direction: row;
        .square {
          width: 40upx;
          height: 35upx;
          box-sizing: border-box;
          margin-top: 56upx;
          margin-left: 30upx;
          padding-top: 2upx;
          .block{
            width: 29upx;
            height: 29upx;
            border: 1px solid #717171;
            border-radius: 1upx;
            box-sizing: border-box;
          }
        }
        .background {
          background: url(../../static/img/login/checked.png) no-repeat 4upx top;
          background-size: 35upx 26upx;
        }
        .title {
          box-sizing: border-box;
          padding-top: 50upx;
          font-size: 30upx;
          letter-spacing: 3upx;
          color: #666666;
          font-family: "Source Han Sans CN";
          text-align: left;
          padding-left: 10upx;
        }
      }
      .input-row {
        display: flex;
        flex-direction: row;
        padding: 50upx 0 30upx 10upx;
        box-sizing: border-box;
        image.input-img{
          height: 48upx;
          width: 48upx;
        }
        .m-input {
          // margin-top: 8upx;
          height: 48upx;
          font-size: 30upx;
          letter-spacing: 3upx;
          color: #cccccc;
          font-family: "Source Han Sans CN";
          box-sizing: border-box;
          padding-top: 10upx;
        }
      }
      .right-code {
        width: 45%;
        box-sizing: border-box;
        padding-left: 20upx;
        padding-top: 20upx;
        image.avator {
          width: 100%;
          height: 100upx;
        }
      }
      .border {
        border-bottom: 1px solid #e1e1e1;
      }
      .bottom-btn {
        width: 100%;
        height: 88upx;
        border-radius: 12upx;
        font-size: 38upx;
        letter-spacing: 4upx;
        line-height: 88upx;
        font-family: "Source Han Sans CN";
        text-align: center;
        margin-top: 68upx;
        background-color: #e1e1e1;
        color: #acacac;
      }
      .bg-btn {
        background-color: #d9233b;
        color: #ffffff;
      }
    }
  }
</style>
