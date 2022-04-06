<template>
  <view class="uni-index">
    <view class="notice">
      <view class="top-notice">
        <view class="top-notice-content">
          <image class="index-bg" src="../../static/img/index-bg.png" mode=""></image>
          <view class="top">
            <view class="texts">
              <image src="../../static/img/tongzhi.png" class="tongzhi" mode=""></image>通知提醒
            </view>
            <view class="right-pepol" @tap="recruitTap">
              <image src="../../static/img/pepol.png" class="tongzhi1" mode=""></image>招贤纳士
            </view>
          </view>
          <view class="content-noticeData">
            <textarea maxlength="1000" @focus="textareaFocus" v-model="noticeData" @blur="blurnotice" class="textarea-style" />
            <!-- <view class="btn-content btn-content1" @tap="blurnotice" v-if="FocusShow">
              取消
            </view> -->
            <view class="btn-content" @tap="noticeAdd" v-if="FocusShow">
              提交
            </view>
          </view>
        </view>
      </view>
      <view class="bottom-btn">
        <view class="btn" style="border-radius:30upx 0 0;" @tap="RankingTap(0)">
          <view class="title" :class="RankingIndex === 0 ? 'active' : ''">
            拜访排行榜
          </view>
          <view class="square" v-if="RankingIndex === 0"></view>
        </view>
        <view class="btn" style="border-radius: 0 30upx 0 0;">
          <view class="title" :class="RankingIndex === 1 ? 'active' : ''">
            国外排行榜
          </view>
          <view class="square" v-if="RankingIndex === 1"></view>
        </view>
      </view>
    </view>
    <view class="table-list">
      <view class="box">
        <t-table @change="change">
          <t-tr color="#333333" :lineShow="true">
            <t-th :widthStyle="RankingIndex === 0 ? '15%' : '23%'" bgColor="#f6f6f6" paddingLeft="0px" textAlign="center">名次</t-th>
            <t-th :widthStyle="RankingIndex === 0 ? '30%' : '24%'" bgColor="#f6f6f6" textAlign="center">姓名</t-th>
            <!-- <t-th widthStyle="24%" bgColor="#f6f6f6" textAlign="center">年度业绩</t-th>
            <t-th :widthStyle="RankingIndex === 0 ? '24%' : '28%'" bgColor="#f6f6f6" textAlign="center">本月业绩</t-th> -->
            <t-th widthStyle="30%" bgColor="#f6f6f6" textAlign="center" v-if="RankingIndex === 0">拜访数量</t-th>
            <t-th widthStyle="25%" bgColor="#f6f6f6" textAlign="center" v-if="RankingIndex === 0">总拜访量</t-th>
          </t-tr>
          <t-tr v-for="(item, i) in tableList" :key="item.id" trBg="trBg">
            <t-td :widthStyle="RankingIndex === 0 ? '15%' : '23%'" paddingStyle="0px" fontSizes="28upx" colors="#333333">
              <view class="tds">
                <view v-if="i === 0"><image class="Ranking" src="../../static/img/login/1.png" mode=""></image></view>
                <view v-else-if="i === 1"><image class="Ranking" src="../../static/img/login/2.png" mode=""></image></view>
                <view v-else-if="i === 2"><image class="Ranking" src="../../static/img/login/3.png" mode=""></image></view>
                <view v-else>{{ i + 1 }}</view>
              </view>
            </t-td>
            <t-td :widthStyle="RankingIndex === 0 ? '30%' : '24%'" fontSizes="28upx" colors="#333333">
              <view class="tds">
                {{ item.username }}
              </view>
            </t-td>
            <!-- <t-td widthStyle="24%" fontSizes="28upx" colors="#333333">
              <view class="tds">
                {{ item.year_total }}
              </view>
            </t-td>
            <t-td :widthStyle="RankingIndex === 0 ? '24%' : '28%'" fontSizes="28upx" colors="#333333">
              <view class="tds">
                {{ item.month_total ? item.month_total : '' }}
              </view>
            </t-td> -->
            <t-td widthStyle="30%" fontSizes="28upx" colors="#333333" v-if="RankingIndex === 0">
              <view class="tds">
                {{ item.visit ? item.visit : '' }}
              </view>
            </t-td>
            <t-td widthStyle="25%" fontSizes="28upx" colors="#333333" v-if="RankingIndex === 0">
              <view class="tds">
                {{ item.visit_all ? item.visit_all : '' }}
              </view>
            </t-td>
          </t-tr>
        </t-table>
      </view>
    </view>
    <!-- <uni-nav :current="current" :list="navList" :barBargea="true" @clicks="clickNav"></uni-nav> -->
    <u-tabbar :list="vuex_tabbar" height="60px" @change="tabbarChange"></u-tabbar>
	</view>
</template>

<script>
  import uniNav from "@/components/uni-bottom-nav/uni-nav.vue"
  import tTable from '@/components/t-table/t-table.vue';
  import tTh from '@/components/t-table/t-th.vue';
  import tTr from '@/components/t-table/t-tr.vue';
  import tTd from '@/components/t-table/t-td.vue';
  import {mapState} from 'vuex'
	export default {
    computed: {
      ...mapState(['vuex_tabbar', 'customerJurisdictionTrues'])
    },
		data() {
			return {
        Authorization: null,
        current: -1,
				navList: [
          {
          	"pagePath": "../../pages/capital/capital",
          	"text": "资金",
          	"src": "../../static/img/banner/capital.png",
          	"srcSelect": "../../static/img/banner/capital.png",
            barBargea: false
          }, {
          	"pagePath": "../../pages/customer/customer",
          	"text": "客户",
          	"src": "../../static/img/banner/customer.png",
          	"srcSelect": "../../static/img/banner/customer.png",
            barBargea: false
          }, {
          	"pagePath": "../../pages/channel/channel",
          	"text": "渠道",
          	"src": "../../static/img/banner/channel.png",
          	"srcSelect": "../../static/img/banner/channel.png",
            barBargea: false
          }, {                              
          	"pagePath": "../../pages/price/price",
          	"text": "价格",                 
          	"src": "../../static/img/banner/price.png",
          	"srcSelect": "../../static/img/banner/price.png",
            barBargea: false
          }, {
          	"pagePath": "../../pages/order/order",
          	"text": "订单",
          	"src": "../../static/img/banner/order.png",
          	"srcSelect": "../../static/img/banner/order.png",
            barBargea: false
          }
        ],
        tableList: [],
        tableTitle: ['名次', '姓名', '年度业绩总和', '本月业绩总和'],
        RankingIndex: 0,
        RankingData: {},
        noticeData: '',
        dpLimitShow: false,
        VersionData: '',
        VersionUrl: '',
        newVersion: '',
        FocusShow: false
			}
		},
    components: {
      uniNav,
      tTable,
      tTh,
      tTr,
      tTd
    },
		onLoad() {
      const that = this
		},
    // 自定义按钮跳转
    onNavigationBarButtonTap(options) {
      console.log(options)
      if (options.index === 0) {
        uni.clearStorage()
        uni.navigateTo({
          url: '../login/login'
        })
      }
    },
    created() {
      let Authorization = uni.getStorageSync('Authorization');
      if (Authorization) {
        // this.run()
        // setInterval(this.run,5000);
      }
    },
    onShow() {
      const that = this
      that.current = -1
      that.Authorization = uni.getStorageSync('Authorization');
      that.VersionData = '202204061';
      console.log(that.Authorization)
      if(that.Authorization){
        that.init()
      }else{
        this.guideToLogin()
      }
      // 版本号检测
      uni.getSystemInfo({
        success:(res) => {
          console.log(res);
          //检测当前平台，如果是安卓则启动安卓更新  
          if(res.platform=="android"){  
            this.Version();  
          }
        }
      })
    },
		methods: {
      recruitTap () {
        uni.navigateTo({
          url: './recruitList'
        })
      },
      tabbarChange (e) {
        const that = this
        console.log(e, this.customerJurisdictionTrues)
        if (that.customerJurisdictionTrues === false) {
          if (Number(e) === 1) {
            uni.showToast({
              title: '暂无权限',
              duration: 2000,
              icon: 'none'
            });
          }
        }
      },
      run () {
        const that = this
        var globalData = getApp().globalData.trial; //获取全局变量
        console.log(globalData)
        if (Number(globalData) === 1) {
          that.navList[1].barBargea = true
        } else {
          that.navList[1].barBargea = false
        }
      },
      textareaFocus () {
        console.log(123)
        if (this.dpLimitShow === true) {
          this.FocusShow = true
        }
      },
      Version () {
        const that = this
        that.$api.getVersionApi().then(res => {
          if (res.data.status === 200) {
            // uni.setStorageSync('Version', that.newVersion);
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
                    // uni.showToast({
                    //   icon:"none",
                    //   mask: true,
                    //     title: '有新的版本发布，检测到您目前为Wifi连接，程序已启动自动更新。新版本下载完成后将自动弹出安装程序',  
                    //     duration: 5000,  
                    // }); 
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
                    // uni.showToast({
                    //   icon:"none",
                    //   mask: true,
                    //     title: '有新的版本发布，检测到您目前为Wifi连接，程序已启动自动更新。新版本下载完成后将自动弹出安装程序',  
                    //     duration: 5000,  
                    // }); 
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
      noticeAdd () {
        const that = this
        that.$api.noticeAddApi({content: that.noticeData}).then(res => {
          console.log(res.data)
          if (res.data.status === 200) {
            uni.showToast({
              title: '添加成功',
              duration: 2000,
              icon: 'none'
            });
            that.FocusShow = false
            that.noticeInfo()
          }
        })
      },
      blurnotice() {
        setTimeout(() => {
          this.FocusShow = false
          this.noticeInfo()
        }, 500)
      },
      noticeInfo () {
        const that = this
        that.$api.noticeInfoApi().then(res => {
          if (res.data.status === 200) {
            that.noticeData = res.data.data.content
          }
        })
      },
      // 初始化
      init () {
        const that = this
        console.log(123)
        that.$api.LeaderboardDataApi().then(res => {
          console.log(res.data)
          if (res.data.status === 200) {
            that.RankingData = res.data.data
            that.tableList = that.RankingData.gn
          }
        })
        that.$api.noticeInfoApi().then(res => {
          if (res.data.status === 200) {
            if (res.data.data) {
              that.noticeData = res.data.data.content
            }
          }
        })
        let dpLimit = uni.getStorageSync('dpLimit');
        let uid = uni.getStorageSync('uid');
        console.log(dpLimit)
        if (dpLimit.length > 0) {
          dpLimit.filter(item => {
            if (Number(item) === 296) {
              that.dpLimitShow = true
            }
          })
        }
        if (Number(uid) === 1) {
          that.dpLimitShow = true
        }
      },
      // 切换国内外排行榜
      RankingTap (i) {
        const that = this
        that.RankingIndex = i
        if (i === 0) {
          that.tableList = that.RankingData.gn
        } else {
          that.tableList = that.RankingData.gw
        }
      },
      change(e) {
        console.log(e.detail);
      },
      edit(item) {
        uni.showToast({
            title: item.name,
            icon: 'none'
        });
      },
      clickNav (data) {
        const that = this
        console.log(data)
        that.current = data.select
        console.log(that.current)
      },
      guideToLogin() {
      	uni.showModal({
      		title: '未登录',
      		content: '您未登录，需要登录后才能继续',
      		/**
      		 * 如果需要强制登录，不显示取消按钮
      		 */
      		showCancel: !this.Authorization,
      		success: (res) => {
      			if (res.confirm) {
      				/**
      				 * 如果需要强制登录，使用reLaunch方式
      				 */
      				if (this.Authorization) {
      					uni.reLaunch({
      						url: '../login/login'
      					});
      				} else {
      					uni.navigateTo({
      						url: '../login/login'
      					});
      				}
      			}
      		}
      	});
      }
		}
	}
</script>

<style lang="less">
  .uni-index{
    background: #fff;
    .notice {
      width: 100%;
      height: auto;
      // background-image: linear-gradient(0deg, #f93d55 0%, #d73248 48%, #cc2037 100%);
      .top-notice{
        width: 100%;
        box-sizing: border-box;
        padding: 27upx 10upx;
        .top-notice-content {
          height: 400upx;
          border-radius: 20upx;
          background-color: #fdeef1;
          position: relative;
          overflow: hidden;
          image.index-bg {
            position: absolute;
            right: -50upx;
            bottom: -60upx;
            width: 295upx;
            height: 330upx;
          }
          .top {
            position: absolute;
            top: 0upx;
            z-index: 1;
            height: 80upx;
            width: 100%;
            box-sizing: border-box;
            padding: 0 30upx;
            .texts {
              width: 300upx;
              height: 80upx;
              font-size: 34upx;
              letter-spacing: 4upx;
              color: #d9233b;
              font-family: "Source Han Sans CN";
              text-align: left;
              float: left;
              position: relative;
              padding-top: 18upx;
              padding-left: 60upx;
            }
            .right-pepol {
              width: 220upx;
              height: 60upx;
              border-radius: 30upx;
              background-color: rgb(217, 35, 59);
              float: right;
              font-size: 30upx;
              line-height: 60upx;
              color: #ffffff;
              font-weight: 500;
              font-family: "Source Han Sans CN";
              text-align: center;
              position: relative;
              padding-left: 34upx;
              margin-top: 16upx;
            }
            image.tongzhi1 {
              width: 30upx;
              height: 30upx;
              top: 16upx;
              left: 20upx;
              position: absolute;
            }
            image.tongzhi {
              width: 44upx;
              height: 44upx;
              margin-right: 8upx;
              top: 22upx;
              left: 0;
              position: absolute;
            }
          }
          .content-noticeData {
            position: absolute;
            z-index: 1;
            top: 95upx;
            padding: 0 26upx;
            box-sizing: border-box;
            width: 100%;
            .textarea-style {
              width: 100%;
              max-height: 280upx;
              line-height: 48upx;
              border-radius: 3upx;
              background-color: none;
              border: none;
              box-sizing: border-box;
              font-size: 30upx;
              color: #333;
              font-family: "Ping Fang";
            }
            .btn-content {
              width: auto;
              padding: 0 10upx;
              box-sizing: border-box;
              height: 50upx;
              border-radius: 4upx;
              background-color: #d9233b;
              font-size: 26upx;
              letter-spacing: 1upx;
              line-height: 50upx;
              color: #ffffff;
              font-family: "Ping Fang";
              text-align: center;
              margin-top: 10upx;
              position: absolute;
              right: 20upx;
              bottom: -20upx;
            }
            .btn-content1 {
              box-sizing: border-box;
              position: absolute;
              right: 110upx;
              background-color: #fff;
              border: 2upx solid #aaaaaa;
              color: #000000;
            }
          }
        }
      }
      .bottom-btn {
        display: flex;
        flex-direction: row;
        box-sizing: border-box;
        .btn {
          height: 90upx;
          line-height: 90upx;
          text-align: center;
          flex: 1;
          background-color: #fff;
          font-size: 32upx;
          letter-spacing: 3upx;
          font-family: "Ping Fang";
          position:relative;
          color: #999999;
          display: flex;
          flex-direction: column;
          .title {
            height: 85upx;
          }
          .active {
            color: #333;
          }
          .square {
            height: 8upx;
            width: 131upx;
            background: #d63248;
            margin: 0 auto;
            border-radius: 4upx;
          }
          // .square {
          //   position:absolute;
          //   width: 0;
          //   height: 0;
          //   border-width: 0 15upx 15upx;
          //   border-style: solid;
          //   border-color: transparent transparent white;
          //   bottom: 0;
          //   left:46%;
          // }
        }
      }
    }
    .table-list {
      .Ranking {
        width: 56upx;
        height: 44upx;
        background: none;
        margin-top: 22upx;
      }
      .tds {
        // flex: 1;
        display: flex;
        justify-content: center;
        text-align: center;
        height: 100%;
        margin: 0 auto;
      }
    }
  }
</style>
