<template>
  <view class="login pageUniapp">
    <view class="top-img">
      <image class="logo" src="../../static/img/logo.png" mode="aspectFit"></image>
    </view>
    <view class="input-list">
      <view class="input-row border">
        <image class="input-img" src="../../static/img/login/user.png" mode=""></image>
      	<lyd-input class="m-input" type="text" autocapitalize="on" clearable focus v-model="username" placeholder="请输入用户名"></lyd-input>
      </view>
      <view class="input-row border">
        <image class="input-img" src="../../static/img/login/pwd.png" mode=""></image>
      	<lyd-input type="password" displayable v-model="password" placeholder="请输入密码"></lyd-input>
      </view>
      <view class="last-input">
        <view class="input-row border">
          <image class="input-img" src="../../static/img/login/code.png" mode=""></image>
        	<lyd-input class="m-input" type="text" autocapitalize="on" clearable focus v-model="code" placeholder="请输入验证码"></lyd-input>
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
        imgUrl: '',
        code: '',
        verify: '',
        t_data: ''
      }
    },
    onShow() {
      const that = this
      that.VersionData = '202104191';
      // 版本号检测
      uni.getSystemInfo({
        success:(res) => {
          console.log(res)
          //检测当前平台，如果是安卓则启动安卓更新  
          if(res.platform=="android"){  
            this.Version();  
          }
        }
      })
    },
    mounted() {
      this.init()
    },
    methods:{
      Version () {
        const that = this
        that.$api.getVersionApi().then(res => {
          if (res.data.status === 200) {
            that.newVersion = res.data.data.version
            that.VersionUrl = res.data.data.url
            console.log(that.VersionUrl)
            that.checkVersionToLoadUpdate(Number(res.data.data.version), Number(that.VersionData), res.data.data.url)
          }
        })
      },
      /**
       * 进行版本型号的比对 以及下载更新请求
       * @param {Object} server_version 服务器最新 应用版本号
       * @param {Object} curr_version 当前应用版本号
      */
      checkVersionToLoadUpdate:function(server_version,curr_version, url){
        if(server_version > curr_version){
          //TODO 此处判断是否为 WIFI连接状态
          if(plus.networkinfo.getCurrentType()!==3){
            // 有新的版本发布，检测到您目前非Wifi连接，为节约您的流量，程序已停止自动更新，将在您连接WIFI之后重新检测更新
            uni.showModal({
                title: "版本更新",
                content: '有新的版本发布，检测到您目前非Wifi连接，是否继续更新新版本？',
                confirmText:'立即更新',
                cancelText:'稍后进行',
                confirmColor: '',
                success: function (res) {
                  if (res.confirm) {
                    //设置 最新版本apk的下载链接
                    console.log(url)
                    var downloadApkUrl = "https://mkmngsys.mitech-ndt.com/" + url;
                    var dtask = plus.downloader.createDownload( downloadApkUrl, {}, function ( d, status ) {
                    console.log(d, status)
                    // 下载完成  
                    if ( status == 200 ) {
                      plus.runtime.install(plus.io.convertLocalFileSystemURL(d.filename), {}, e => e, function(error) {
                        uni.showToast({
                          title: '安装失败-01',
                          mask: false,
                          duration: 1500
                        });
                      })
                    } else {  
                      uni.showToast({  
                        title: '更新失败',
                        duration: 1500
                      });
                    }    
                  });
                  try {
                    dtask.start(); // 开启下载的任务
                    var prg = 0;
                    var showLoading = plus.nativeUI.showWaiting("正在下载");  //创建一个showWaiting对象 
                    dtask.addEventListener('statechanged', function(
                      task,
                      status
                    ) {
                      // 给下载任务设置一个监听 并根据状态  做操作
                      switch (task.state) {
                      case 1:
                        showLoading.setTitle("正在下载");
                        break;
                      case 2:
                        showLoading.setTitle("已连接到服务器");
                        break;
                      case 3:
                        prg = parseInt(
                        (parseFloat(task.downloadedSize) /
                          parseFloat(task.totalSize)) *
                          100
                        );
                        showLoading.setTitle("  正在下载" + prg + "%  ");
                        // console.log(prg)
                        break;
                      case 4:
                        plus.nativeUI.closeWaiting();
                        console.log(111)
                        console.log(server_version)
                        uni.setStorageSync('Version', server_version);
                        //下载完成
                        break;
                      }
                    });
                  } catch (err) {
                    plus.nativeUI.closeWaiting();
                    uni.showToast({
                      title: '更新失败-03',
                      mask: false,
                      duration: 1500
                    });
                  }
                } else if (res.cancel) {
                  console.log('稍后更新')
                }
              }
            });
              return;
            }else{
              uni.showModal({
                title: "版本更新",
                content: '有新的版本发布，检测到您当前为Wifi连接，是否立即进行新版本下载？',
                confirmText:'立即更新',
                cancelText:'稍后进行',
                confirmColor: '',
                success: function (res) {
                  if (res.confirm) {
                    //设置 最新版本apk的下载链接
                    console.log(url)
                    var downloadApkUrl = "https://mkmngsys.mitech-ndt.com/" + url;
                    var dtask = plus.downloader.createDownload( downloadApkUrl, {}, function ( d, status ) {
                    console.log(d, status)
                    // 下载完成  
                    if ( status == 200 ) {
                      plus.runtime.install(plus.io.convertLocalFileSystemURL(d.filename), {}, e => e, function(error) {
                        uni.showToast({
                          title: '安装失败-01',
                          mask: false,
                          duration: 1500
                        });
                      })
                    } else {  
                      uni.showToast({  
                        title: '更新失败',
                        duration: 1500
                      });
                    }    
                  });
                  try {
                    dtask.start(); // 开启下载的任务
                    var prg = 0;
                    var showLoading = plus.nativeUI.showWaiting("正在下载");  //创建一个showWaiting对象 
                    dtask.addEventListener('statechanged', function(
                      task,
                      status
                    ) {
                      // 给下载任务设置一个监听 并根据状态  做操作
                      switch (task.state) {
                      case 1:
                        showLoading.setTitle("正在下载");
                        break;
                      case 2:
                        showLoading.setTitle("已连接到服务器");
                        break;
                      case 3:
                        prg = parseInt(
                        (parseFloat(task.downloadedSize) /
                          parseFloat(task.totalSize)) *
                          100
                        );
                        showLoading.setTitle("  正在下载" + prg + "%  ");
                        // console.log(prg)
                        break;
                      case 4:
                        plus.nativeUI.closeWaiting();
                        console.log(111)
                        console.log(server_version)
                        uni.setStorageSync('Version', server_version);
                        //下载完成
                        break;
                      }
                    });
                  } catch (err) {
                    plus.nativeUI.closeWaiting();
                    uni.showToast({
                      title: '更新失败-03',
                      mask: false,
                      duration: 1500
                    });
                  }
                } else if (res.cancel) {
                  console.log('稍后更新')
                }
              }
            });
          }
        }
      },
      init(){
        // this.imgUrl = this.imgUrl + '&' + Math.random()
        const that = this
        that.$api.getVerifyApi().then(res => {
          if (res.data.status === 200) {
            that.imgUrl = res.data.data.image
            that.verify = res.data.data.verify
            that.t_data = res.data.data.t
          }
        })
      },
      login(){
        const that = this
        console.log(123456)
        if (that.password) {
          that.$api.getLoginApi({
            name: that.username,
            pwd: that.password,
            code: that.code,
            verify: that.verify,
            t: that.t_data
          }).then(res => {
            console.log(res)
            if (res.data.status === 200) {
              uni.setStorageSync('Authorization', res.data.data.token);
              uni.setStorageSync('dpLimit', res.data.data.user.dp_limit);
              uni.setStorageSync('uid', res.data.data.user.uid);
              uni.setStorageSync('tabList', [0, 0, 0, 0, 0]);
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
            if (Number(item) === 19) {
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
