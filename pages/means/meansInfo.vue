<template>
  <view class="fundApplication pageUniapp">
    <view class="from">
      <view class="from-content">
        <view class="left">
          名称<text class="text"></text>
        </view>
        <view class="right">
          <input type="text" class="input-style" v-model="formData.goodsnames" />
        </view>
      </view>
      <view class="from-content">
        <view class="left">
          品牌<text class="text"></text>
        </view>
        <view class="right">
          <input type="text" class="input-style" v-model="formData.goodsbrand" />
        </view>
      </view>
      <view class="from-content">
        <view class="left">
          型号<text class="text"></text>
        </view>
        <view class="right">
          <input type="text" class="input-style" v-model="formData.goodsmodels" />
        </view>
      </view>
      <view class="from-content">
        <view class="left">
          市价<text class="text"></text>
        </view>
        <view class="right">
          <input type="text" class="input-style" v-model="formData.guideprice" />
        </view>
      </view>
      <view class="from-content">
        <view class="left left1">
          备注<text class="text"></text>
        </view>
        <view class="right">
          <textarea  class="textarea-style" v-model="formData.mark" />
        </view>
      </view>
      <view class="from-content" v-if="listCont.length > 0">
        <view class="left left1">
        </view>
        <view class="right">
          <view class="two">
            <view class="list" v-for="(val, j) in listCont" :key="j">
              <view class="content">
                {{ val[1] }}
              </view>
              <view class="del" v-if="val.pdf === 1">
                <image
                  src="../../static/img/share.png"
                  @tap="shareWeixin(val, val[0], val[1])"
                  style="width: 31upx; height: 31upx"
                  mode=""
                ></image>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
    <uni-popup ref="popup2" type="dialog">
      <uni-popup-dialog
        type="base"
        message="成功消息"
        content="当前网络非wifi网络,确定继续下载么？"
        :duration="2000"
        :before-close="true"
        @close="close"
        @confirm="okGo"
      ></uni-popup-dialog>
    </uni-popup>
  </view>
</template>

<script>
import uniPopup from "@/components/uni-popup/uni-popup.vue";
import uniPopupDialog from "@/components/uni-popup/uni-popup-dialog.vue";
  export default {
  components: {
    uniPopup,
    uniPopupDialog
  },
    data () {
      return {
        purposeList: [
          {id: 2, name: '推广'},
          {id: 3, name: '差旅'},
          {id: 4, name: '经营'},
          {id: 5, name: '资产'},
          {id: 6, name: '原料'},
          {id: 7, name: '其他'}
        ],
        formData: {
          goodsnames: '',
          goodsmodels: '',
          goodsbrand: '',
          guideprice: '',
          mark: ''
        },
        infoId: '',
        replySetShow: false,
        paymeatShow: false,
        listCont: [],
        fileUrl: '',
        fileName: '',
        file_path: ''
      }
    },
    onNavigationBarButtonTap(options) {
      console.log(options)
      if (options.index === 0) {
        this.back();
      } else if (options.index === 1) {
        uni.switchTab({
          url: "./means"
        })
      }
    },
    // 原生导航栏返回按钮监听
    onBackPress (options) {
      if (options.from === 'navigateBack') {  
        return false;  
      }
      this.back();  
      return true;  
    },
    onLoad(option) {
      const that = this
      if (option.id) {
        that.infoId = option.id
        that.info()
      }
    },
    methods: {
      // 打开文件
      openFile(val, val1, val2) {
        console.log(val.pdf, val1, val2, 666666);
        if (val.pdf === 1) {
          let config = "https://mitechsys.mitech-ndt.com/";
          uni.downloadFile({
            // 下面一行时拼接预览PDF的地址！！！
            url: config + val1,
            success: function (res) {
              var filePath = res.tempFilePath;
              if (!filePath) return;
              uni.openDocument({
                filePath: filePath,
                success: function (res) {
                  console.log(res);
                  console.log("打开文档成功");
                },
              });
            },
          });
        }
      },
      // 分享到微信
      shareWeixin(val, val1, val2) {
        console.log(val, val1, val2, 123456);
        const that = this;
        if (val.pdf === 1) {
          uni.showLoading({
            title: "加载中",
          });
          that.fileName = val2;
          that.file_path = val1;
          const FileShare = uni.requireNativePlugin("life-FileShare");
        
          that.fileUrl = "https://mitechsys.mitech-ndt.com/" + that.file_path;
          if (that.fileName) {
            plus.io.resolveLocalFileSystemURL(
              "_doc/pdf/" + that.fileName,
              function (entry) {
                console.log(entry);
                uni.getSystemInfo({
                  success: (res) => {
                    //检测当前平台，如果是安卓则启动安卓更新
                    console.log(res);
                    if (res.platform === "ios") {
                      setTimeout(() => {
                        uni.hideLoading();
                      }, 100);
                    }
                  },
                });
                FileShare.render(
                  {
                    type: "SYSTEM", //QQ为QQ，微信为WX，系统默认是SYSTEM，不填写默认SYSTEM
                    filePath: plus.io.convertLocalFileSystemURL(
                      "_doc/pdf/" + that.fileName
                    ),
                  },
                  (result) => {
                    uni.hideLoading();
                  }
                );
              },
              function (e) {
                uni.getNetworkType({
                  success: function (res) {
                    console.log(res.networkType);
                    // that.okGo();
                    if (res.networkType !== "wifi") {
                      console.log(1234)
                      uni.hideLoading();
                      that.$refs.popup2.open();
                      // uni.showToast({
                      //   title: "无可转发文件",
                      //   duration: 2000,
                      //   icon: "none",
                      // });
                    } else {
                      that.okGo();
                    }
                  },
                });
              }
            );
          } else {
            setTimeout(function () {
              uni.hideLoading();
            }, 300);
            uni.showToast({
              title: "无可转发文件",
              duration: 2000,
              icon: "none",
            });
          }
        }
      },
      close() {
        this.$refs.popup2.close();
      },
      okGo() {
        const that = this;
        uni.showLoading({
          title: "加载中",
        });
        const FileShare = uni.requireNativePlugin("life-FileShare");
        var dtask = plus.downloader.createDownload(
          that.fileUrl,
          { filename: "_doc/pdf/" + that.fileName },
          function (d, status) {
            // 下载完成
            if (status == 200) {
              FileShare.render(
                {
                  type: "SYSTEM", //QQ为QQ，微信为WX，系统默认是SYSTEM，不填写默认SYSTEM
                  filePath: plus.io.convertLocalFileSystemURL(d.filename),
                },
                (result) => {
                  uni.hideLoading();
                  that.close();
                }
              );
              uni.getSystemInfo({
                success: (res) => {
                  //检测当前平台，如果是安卓则启动安卓更新
                  console.log(res);
                  if (res.platform === "ios") {
                    setTimeout(() => {
                      uni.hideLoading();
                    }, 100);
                  }
                },
              });
            } else {
              console.log("Download failed: " + status);
            }
          }
        );
        dtask.start();
      },
      // 付款方式
      payTypeTap(i) {
        this.formData.pay_type = i
        if (this.formData.pay_type === 2) {
          this.formData.pay_type_remark = ''
        }
      },
      // 批复
      replySet () {
        const that = this
        that.$api.replySetApi({id: that.infoId}).then(res => {
          if (res.data.status === 200) {
            uni.showToast({
              title: '批复成功',
              duration: 2000,
              icon: 'none'
            });
            setTimeout(() => {
              uni.switchTab({
                url: "./means"
              })
            }, 1000)
          }
        })
      },
      // 支付
      paymeatTap () {
        const that = this
        that.$api.financePayApi({id: that.infoId}).then(res => {
          if (res.data.status === 200) {
            uni.showToast({
              title: '支付成功',
              duration: 2000,
              icon: 'none'
            });
            setTimeout(() => {
              uni.switchTab({
                url: "./means"
              })
            }, 1000)
          }
        })
      },
      info () {
        const that = this
        that.$api.ProInfoApi({id: that.infoId}).then(res => {
          if (res.data.status === 200) {
            that.formData.goodsmodels = res.data.data.goodsmodels
            that.formData.goodsnames = res.data.data.goodsnames
            that.formData.goodsbrand = res.data.data.goodsbrand
            that.formData.guideprice = res.data.data.guideprice
            that.formData.mark = res.data.data.mark
            if (res.data.data.cont !== '0') {
              that.listCont = res.data.data.cont
            }
          }
        })
        let dpLimit = uni.getStorageSync('dpLimit');
        let uid = uni.getStorageSync('uid');
        console.log(dpLimit)
        if (dpLimit.length > 0) {
          dpLimit.filter(item => {
            if (Number(item) === 81) {
              that.replySetShow = true
            }
            if (Number(item) === 80) {
              that.paymeatShow = true
            }
          })
        }
        if (Number(uid) === 1) {
          that.replySetShow = true
          that.paymeatShow = true
        }
      },
      back () {
        uni.switchTab({
          url: "./means"
        })
      },
      // 提交
      add () {
        const that = this
        that.$api.financeEditApi({
          ...that.formData,
          id: that.infoId
        }).then(res => {
          if (res.data.status === 200) {
            uni.showToast({
                title: '修改成功',
                duration: 2000,
                icon: 'none'
            });
            setTimeout(() => {
              uni.switchTab({
                url: "./means"
              })
            }, 1000)
          }
        })
      },
      // 取消
      cancel () {},
      // 单选框
      purposeTap (id) {
        const that = this
        that.formData.zc_type = id
      }
    }
  }
</script>

<style lang="less" scoped>
  .fundApplication {
    width: 100%;
    .two {
      box-sizing: border-box;
      .list {
        overflow: hidden;
        display: flex;
        flex-direction: row;
        align-items: center;
        box-sizing: border-box;
        padding-top: 15upx;
        .content {
          width: auto;
          font-size: 30upx;
          letter-spacing: 1upx;
          line-height: 40upx;
          color: #010101;
          font-family: "Ping Fang";
          padding-right: 20upx;
          box-sizing: border-box;
        }
        .del {
          box-sizing: border-box;
          display: flex;
          flex-direction: row;
        }
      }
    }
    .from {
      width: 100%;
      box-sizing: border-box;
      padding: 20upx 28upx 0 10upx;
      .from-content {
        width: 100%;
        display: flex;
        flex-direction: row;
        box-sizing: border-box;
        margin-top: 10upx;
        .left {
          height: 80upx;
          width: 120upx;
          font-size: 30upx;
          color: #000000;
          justify-content: left;
          align-items: center;
          display: flex;
          color: #333333;
          font-family: "Source Han Sans CN";
          box-sizing: border-box;
          text.text {
            display: inline-block;
          }
        }
        .left1 {
          height: 130upx;
          line-height: 130upx;
        }
        .right {
          flex: 1;
          padding-left: 10upx;
          box-sizing: border-box;
          .input-style {
            width: 100%;
            height: 80upx;
            border-radius: 3upx;
            background-color: #ffffff;
            border: 2.7777777777777777upx solid #fff;
            padding: 0 20upx;
            box-sizing: border-box;
            font-size: 30upx;
            color: #000000;
            font-family: "Ping Fang";
          }
          .textarea-style {
            width: 100%;
            height: 460upx;
            border-radius: 3upx;
            background-color: #ffffff;
            border: 2.7777777777777777upx solid #fff;
            padding: 10upx;
            box-sizing: border-box;
            font-size: 30upx;
            color: #000000;
            font-family: "Ping Fang";
          }
          .radio-list {
            width: 100%;
            // display: flex;
            // flex-direction: column;
            justify-content: center;
            align-items: center;
            overflow: hidden;
            box-sizing: border-box;
            padding-top: 10upx;
            padding-bottom: 10upx;
            .radios {
              float: left;
              font-size: 30upx;
              letter-spacing: 1upx;
              padding-top: 10upx;
              color: #333333;
              font-family: "Ping Fang";
              flex: 1;
              display: flex;
              flex-direction: row;
              align-items: center;
              margin-right: 20upx;
              .circle {
                width: 24upx;
                height: 24upx;
                border-radius: 50%;
                background-color: #fff;
                border: 2upx solid #363636;
                text-align: center;
                display: flex;
                justify-content: center;
                align-items: center;
                // margin-left: 20upx;
                margin-right: 12upx;
                text.i {
                  width: 12upx;
                  height: 12upx;
                  border-radius: 50%;
                  background-color: #d9233b;
                  display: inline-block;
                }
              }
            }
          }
        }
      }
    }
    .btn-list {
      width: 100%;
      padding: 42upx 0;
      box-sizing: border-box;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      .add {
        width: 150upx;
        height: 80upx;
        border-radius: 2upx;
        background-color: #d9233b;
        font-size: 32upx;
        letter-spacing: 1upx;
        line-height: 80upx;
        color: #ffffff;
        font-family: "Adobe Heiti Std";
        margin-right: 20upx;
        text-align: center;
      }
      .cancel {
        text-align: center;
        font-size: 32upx;
        letter-spacing: 1upx;
        line-height: 80upx;
        color: #000000;
        font-family: "Adobe Heiti Std";
        width: 150upx;
        height: 80upx;
        border-radius: 2upx;
        background-color: #fff;
      }
    }
  }
</style>
