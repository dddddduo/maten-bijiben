<script>
  import {
    mapState
  } from 'vuex'
  var numPush = 0;
  var p = null;
  var timer = null; //定时器名称
  export default {
    computed: {
      ...mapState(['changeId', 'addId'])
    },
    onLaunch: function() {
      console.log('App Launch')
      //#ifdef APP-PLUS  
      // var info = plus.push.getClientInfo();
      // console.log( JSON.stringify( info ) );
      //  /* 5+  push 消息推送 ps:使用:H5+的方式监听，实现推送*/  
      // plus.push.addEventListener("click", function(msg) {  
      //       console.log("click:"+JSON.stringify(msg));  
      //       console.log(msg.payload);  
      //       console.log(JSON.stringify(msg));  

      //       //这里可以写跳转业务代码
      //     }, false);  
      //       // 监听在线消息事件    
      //     plus.push.addEventListener("receive", function(msg) {  
      //       // plus.ui.alert(2);  
      //         //这里可以写跳转业务代码
      //       console.log("recevice:"+JSON.stringify(msg))  
      //    }, false);  

      //#endif
    },
    onShow: function() {
      console.log('App Show')
      this.limitMethods()
      // this.$store.commit("vuexTabbar", 1);
    },
    created() {
      this.run()
      this.clicks()

    },
    onHide: function() {
      console.log('App Hide')
    },
    beforeDestroy() {
      clearInterval(timer);
      timer = null;
    },
    globalData: {
      trial: 0
    },
    methods: {
      limitMethods() {
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
              list = [{
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
          list = [{
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
      plusPush() {
        console.log(123456)
        //#ifdef APP-PLUS  
        plus.push.createMessage("您有一条审核消息，请前往APP查看", this.LocalMSG(), {
          cover: false
        });
        plus.push.setAutoNotification(true);
        //#endif
      },
      LocalMSG(meg) {
        this.startPlay()
      },
      //执行网络请求
      run() {
        const that = this
        let Authorization = uni.getStorageSync('Authorization');
        if (Authorization) {
          // numPush++;
          // plus.runtime.setBadgeNumber(numPush);
          that.$api.indexStatusApi().then(res => {
            if (res.data.status === 200) {
              this.globalData.trial = Number(res.data.data.trial)
              // console.log(this.changeId)
              if (this.changeId !== Number(res.data.data.changeId)) {
                this.$store.commit("changeIdKey", res.data.data.changeId);
                // plus.runtime.setBadgeNumber(res.data.data.trialCount);
              }
			  if (this.addId === null) {
				this.$store.commit("addIdKey", res.data.data.addId);
				if (this.addId !== Number(res.data.data.addId)) {
					console.log(this.addId, res.data.data.addId)
					// plus.runtime.setBadgeNumber(res.data.data.trialCount);
					this.plusPush()
				}
              } else {
				  if (this.addId !== Number(res.data.data.addId)) {
					this.$store.commit("addIdKey", res.data.data.addId);
				  	this.plusPush()
				  }
			  }
              let trial = uni.getStorageSync('trial');
              if (Number(trial) !== 1 || !trial) {
                uni.setStorageSync('trial', res.data.data.trial);
                // console.log(123)
                if (Number(res.data.data.trial) === 1) {
                  // console.log(456)
                  // this.plusPush()
                } else {
                  // console.log(1010)
                }
              } else {
                // console.log(789)
                uni.setStorageSync('trial', res.data.data.trial);
              }
              if (Number(res.data.data.trial) === 1) {
                // uni.showTabBarRedDot({
                //   index: 1
                // })
                this.$store.commit("vuexTabbar", 1);
              } else {
                // uni.hideTabBarRedDot({
                //   index: 1
                // })
                this.$store.commit("vuexTabbar", 0);
              }
              if (Number(res.data.data.priceTrial) === 1) {
                this.$store.commit("vuexTabbar1", 1);
              } else {
                this.$store.commit("vuexTabbar1", 0);
              }
              // if (Number(res.data.data.priceTrial) === 0 && Number(res.data.data.trial) === 0) {
              //   // console.log(123)
              //   this.clearBadge()
              // } else {
              //   this.setBadge(res.data.data.trialCount)
              // }
              this.setBadge(res.data.data.trialCount)
            }
          })
        }
      },
      // 设置数字
      setBadge(data) {
        //#ifdef APP-PLUS 
        plus.runtime.setBadgeNumber(data);
        //#endif
      },
      // 清除数字
      clearBadge() {
        //#ifdef APP-PLUS 
        plus.runtime.setBadgeNumber(0);
        //#endif
      },
      //这里是通过点击的方式触发的
      clicks() {
        // setInterval(this.run,1000);
        timer = setInterval(() => {
          setTimeout(this.run, 0)
        }, 1000)
        //3000是每隔五秒运行一次 
      },
      ScanAudio() {
        // var music = null;
        // music = uni.createInnerAudioContext(); //创建播放器对象
        // music.src= "./static/img/aigei.mp3"; //选择播放的音频
        // music.play(); //执行播放
        let src = './static/img/aigei.mp3';
        //实例化声音  
        const Audio = uni.createInnerAudioContext();
        Audio.autoplay = true;
        Audio.src = src; //音频地址  
        Audio.onError((res) => {
          console.log(res.errMsg);
          console.log(res.errCode);
          Audio.destroy(); //发生错误后，销毁实例  
        });
        Audio.onPause(function() {
          console.log('end');
          Audio.destroy(); //这里是播放暂停后，销毁实例  
        });
        Audio.onStop(function() {
          console.log('stop');
          Audio.destroy(); //这里是播放停止后，销毁实例  
        });
        Audio.onEnded(function() {
          console.log('ended');
          Audio.destroy(); //这里是播放结束后，销毁实例  
        });
      },
      startPlay() {
        if (plus.audio == undefined) {
          return;
        }
        p = plus.audio.createPlayer("https://mkmngsys.mitech-ndt.com/Upload/test/aigei.mp3");
        console.log(p);
        p.play(function() {
          console.log("Audio play success!");
        }, function(e) {
          console.log("Audio play error: " + e.message);
        });
        setTimeout(() => {
          p.stop();
        }, 2000)
      }
    }
  }
</script>

<style lang="less">
  @import './static/iconfont/iconfont.css';
  .pageUniapp {
    background: #f9f9f9;
  }

  .add-cancel-style {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    box-sizing: border-box;
    padding: 42upx 50upx;

  }

  .add-btn-style {
    flex: 1;
    height: 80upx;
    border-radius: 8upx;
    background-color: #d9233b;
    font-size: 32upx;
    letter-spacing: 1upx;
    line-height: 80upx;
    color: #ffffff;
    font-family: "Adobe Heiti Std";
    text-align: center;
  }

  .cancel-btn-style {
    text-align: center;
    font-size: 32upx;
    letter-spacing: 1upx;
    line-height: 80upx;
    color: #000000;
    font-family: "Adobe Heiti Std";
    padding: 0 40upx;
    width: auto;
    height: 80upx;
    border-radius: 8upx;
    background-color: #fff;
    border: 2upx solid #aaaaaa;
    margin-right: 20upx;
    box-sizing: border-box;
  }

  page {
    background: #f9f9f9;
  }

  /*每个页面公共css */
  uni-page-head .uni-page-head__title {
    letter-spacing: 3upx;
    font-family: "Source Han Sans CN";
  }

  uni-checkbox:not([disabled]) .uni-checkbox-input:hover {
    border-color: #d9233b !important;
  }
  .uni-popup {
    z-index: 9999 !important;
  }
</style>

<style lang="scss">
  /* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
  @import "uview-ui/index.scss";

  .u-tabbar__content__item__button {
    top: 10px !important;
  }

  .u-tabbar__content__item__text {
    bottom: 10px !important;
  }

  .u-badge--bg--error {
    right: -6px !important;
    background-color: #d9233b !important;
  }
</style>
