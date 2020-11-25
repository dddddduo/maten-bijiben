<template>
  <view class="recruit pageUniapp">
    <view class="from">
      <view class="from-content">
        <view class="left">
          姓名<text class="text"></text>
        </view>
        <view class="right">
          <input type="text" class="input-style" v-model="formData.name" />
        </view>
      </view>
      <view class="from-content">
        <view class="left">
          性别<text class="text"></text>
        </view>
        <view class="right">
          <view class="radio-list">
            <view class="radios">
              <view class="circle" @tap="formData.gender = 1"><text class="i" v-if="formData.gender === 1"></text></view>男
            </view>
            <view class="radios">
              <view class="circle" @tap="formData.gender = 2"><text class="i" v-if="formData.gender === 2"></text></view>女
            </view>
          </view>
        </view>
      </view>
      <view class="from-content">
        <view class="left">
          毕业院校<text class="text"></text>
        </view>
        <view class="right">
          <input type="text" class="input-style" v-model="formData.school" />
        </view>
      </view>
      <view class="from-content">
        <view class="left">
          手机<text class="text"></text>
        </view>
        <view class="right">
          <input type="text" class="input-style" v-model="formData.mobile" />
        </view>
      </view>
      <view class="from-content">
        <view class="left">
          简历编号<text class="text"></text>
        </view>
        <view class="right">
          <input type="text" class="input-style" v-model="formData.resume_code" />
        </view>
      </view>
      <view class="from-content">
        <view class="left">
          <text class="text"></text>
        </view>
        <view class="right">
          <view class="textarea-style">
            <view class="contents" v-for="(item, i) in contents" :key='i'>
              <view class="title-name">
                <image class="img" src="../../static/img/me.png" style="width: 32upx;height: 34upx;margin-right: 10upx;"
                  mode=""></image>
                <view class="name">{{item.username}}&nbsp;{{addTimeTsp(item.created_time)}}</view>
                <!-- <image class="img" @tap="deleteTap(item, 1)" src="../../static/img/del.png" style="width: 35upx;height: 30upx;margin-left: 10upx;margin-top: 8upx;"
                  mode=""></image> -->
              </view>
              <!-- <view class="content" v-if="item.intupShow === true">
                <text>{{item.content}}</text>
                <textarea class="textarea-style" style="border: 1px solid #e3e3e3;" v-model="item.content1" />
                <view class="btn-content" @tap="contentEdit(item)">
                  提交
                </view>
              </view> -->
              <view class="content" v-if="item.intupShow === false">
                <checkbox v-if="formData.btype === 7" color="#d9233b" :value="item.id" :checked="item.checked" style="transform:scale(0.7)" />
                <text class="texct">{{item.content}}</text>
                <!-- <image @tap="contentTap(item, i)" class="img" src="../../static/img/update.png" style="width: 35upx;height: 34upx;" mode=""></image> -->
              </view>
            </view>
          </view>
        </view>
      </view>
      <view class="from-content">
        <view class="left">
          沟通备注<text class="text"></text>
        </view>
        <view class="right">
          <textarea  class="textarea-style1" v-model="formData.remark" />
        </view>
      </view>
    </view>
    <view class="add-cancel-style">
      <view class="cancel-btn-style" @tap="back">取消</view>
      <view class="add-btn-style" @tap="add">提交</view>
    </view>
    <uni-popup ref="popup" type="dialog">
        <uni-popup-dialog type="base" message="成功消息" content="确定要删除么？" :duration="2000" :before-close="true" @close="close" @confirm="TransactionDel"></uni-popup-dialog>
    </uni-popup>
  </view>
</template>

<script>
  import uniPopup from '@/components/uni-popup/uni-popup.vue'
  import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog.vue'
  export default {
    components: {
      uniPopup,
      uniPopupDialog
    },
    data () {
      return {
        formData: {
          name: '',
          gender: '',
          school: '',
          mobile: '',
          remark: '',
          resume_code: ''
        },
        infoId: '',
        contents: [],
        delId: '',
        deleteIndex: -1,
      }
    },
    onNavigationBarButtonTap(options) {
      if (options.index === 0) {
        uni.navigateTo({
          url: './recruitList'
        })
      } else if (options.index === 1) {
        uni.navigateTo({
          url: './index'
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
    onShow() {
    },
    onLoad(option) {
      const that = this
      if (option.id) {
        that.infoId = option.id
        that.init()
      }
    },
    methods: {
      // 时间戳转换为日期
      addTimeTsp (num) {
        let intDate = null;
        if (num.length === 10) {
          intDate = parseInt(num)*1000
        } else {
          intDate = parseInt(num)
        }
        var date = new Date(intDate);
        var YY = date.getFullYear() + '-';
        var MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        var DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
        var hh = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
        var mm = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
        var ss = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
        return YY + MM + DD;
      },
      // 提交
      contentEdit (val) {
        const that = this
        that.$api.upConApi({
          id: val.id,
          content: val.content1
        }).then(res => {
          if (res.data.status === 200) {
            uni.showToast({
                title: '修改成功',
                duration: 2000,
                icon: 'none'
            });
            that.close()
            that.init()
          }
        })
      },
      close () {
        this.$refs.popup.close()
      },
      contentTap (val, i) {
        const that = this
        that.contents[i].intupShow = true
        that.$forceUpdate()
      },
      // 删除往来记录
      deleteTap (val, i) {
        const that = this
        that.$refs.popup.open()
        that.delId = val.id
        that.deleteIndex = i
      },
      TransactionDel () {
        const that = this
        if (that.deleteIndex === 1) {
          that.$api.contentDelApi({id: that.delId}).then(res => {
            if (res.data.status === 200) {
              uni.showToast({
                  title: '删除成功',
                  duration: 2000,
                  icon: 'none'
              });
              that.close()
              that.init()
            }
          })
        } else if (that.deleteIndex === 0) {
          that.$api.cusdataFileDelApi({id: that.delId}).then(res => {
            if (res.data.status === 200) {
              uni.showToast({
                  title: '删除成功',
                  duration: 2000,
                  icon: 'none'
              });
              that.close()
              that.init()
            }
          })
        }
      },
      // 打开文件
      openFile (val) {
        console.log(val)
        let config = "http://mkmngsys.mitech-ndt.com/"
        uni.downloadFile({
          // 下面一行时拼接预览PDF的地址！！！
          url: config + val,
          success: function(res) {
            var filePath = res.tempFilePath;
            if (!filePath) return
            uni.openDocument({
              filePath: filePath,
              success: function(res) {
                console.log(res);
                console.log('打开文档成功');
              }
            });
          }
        });
      },
      // 初始化
      init () {
        const that = this
        that.$api.ApplicantInfoApi({
          id: that.infoId
        }).then(res => {
          if (res.data.status === 200) {
            that.formData = res.data.data
            that.formData.gender = Number(res.data.data.gender)
            that.contents = res.data.data.remarkList
            that.contents.filter((wei, w) => {
              wei.intupShow = false
              wei.isShowData = false
              wei.content1 = wei.content
            })
          }
        })
      },
      back () {
        uni.navigateTo({
          url: "./index"
        })
      },
      // 提交
      add () {
        const that = this
        that.$api.ApplicantEditApi({
          name: that.formData.name,
          gender: that.formData.gender,
          school: that.formData.school,
          mobile: that.formData.mobile,
          remark: that.formData.remark,
          resume_code: that.formData.resume_code,
          id: that.infoId
        }).then(res => {
          if (res.data.status === 200) {
            uni.showToast({
              title: '修改成功',
              duration: 2000,
              icon: 'none'
            });
            setTimeout(() => {
              uni.reLaunch({
                url: "./recruitList"
              })
            }, 1000)
          }
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  .recruit {
    width: 100%;
    .from {
      width: 100%;
      box-sizing: border-box;
      padding: 30upx 26upx 0 10upx;
      .from-content {
        width: 100%;
        display: flex;
        flex-direction: row;
        box-sizing: border-box;
        margin-top: 10upx;
        align-items: center;
        .left {
          height: 80upx;
          width: 130upx;
          // text-align: justify;
          font-size: 30upx;
          color: #000000;
          font-family: "Ping Fang";
          line-height: 80upx;
          box-sizing: border-box;
          text.text {
            display: inline-block;
            width: 100%;
          }
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
          .input-style1 {
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
            overflow: hidden;
            line-height: 80upx;
          }
          .textarea-style {
            width: 100%;
            height: auto;
            padding: 10upx;
            box-sizing: border-box;
            font-size: 30upx;
            color: #000000;
            font-family: "Ping Fang";
            .contents {
              box-sizing: border-box;
              padding-bottom: 10upx;
              .title-name {
                display: flex;
                flex-direction: row;
                font-size: 30upx;
                letter-spacing: 1upx;
                color: #333333;
                font-family: "Source Han Sans CN";
                overflow: hidden;
                .name {
                  padding-top: 4upx;
                  box-sizing: border-box;
                  float: left;
                }
                image.img {
                  float: left;
                  margin-top: 8upx;
                }
              }
              .content {
                font-size: 30upx;
                letter-spacing: -1upx;
                line-height: 45upx;
                color: #666666;
                text-align: left;
                overflow: hidden;
                font-family: "Source Han Sans CN";
                padding-top: 6upx;
                text.texct {
                }
                image.img {
                  margin-top: 8upx;
                  margin-left: 10upx;
                }
              }
              .btn-content {
                width: 80upx;
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
              }
            }
          }
          .textarea-style1 {
            width: 100%;
            min-height: 300upx;
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
            display: flex;
            flex-direction: row;
            justify-content: left;
            align-items: center;
            .radios {
              font-size: 30upx;
              letter-spacing: 1upx;
              line-height: 80upx;
              color: #333333;
              font-family: "Ping Fang";
              width: 150upx;
              display: flex;
              flex-direction: row;
              align-items: center;
              .circle {
                width: 24upx;
                height: 24upx;
                border-radius: 50%;
                background-color: #fff;
                border: 2upx solid #363636;
                text-align: center;
                margin-right: 12upx;
                display: flex;
                justify-content: center;
                align-items: center;
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
          .select-content {
            width: 220upx;
            height: 83upx;
            border-radius: 3upx;
            background-color: #ffffff;
            border: 2.7814814814814817upx solid #fff;
            margin-right: 14upx;
            font-size: 30upx;
            letter-spacing: 1upx;
            line-height: 83upx;
            color: #010101;
            font-family: "Ping Fang";
            display: flex;
            flex-direction: row;
            box-sizing: border-box;
            padding: 0 20upx 0 10upx;
            overflow: hidden;
            position: relative;
            .picker {
              flex: 1;
              height: 100%;
              text-align: center;
            }
            .icon-leftArrows {
              display: inline-block;
              transform: rotate(270deg);
              font-size: 24upx;
              color: #adadad;
              position: absolute;
              right: 10upx;
              top: 0;
            }
            .uni-input {
              height: 83upx;
            }
          }
        }
        .right-choice {
          display: flex;
          flex-direction: column;
          .one {
            display: flex;
            flex-direction: row;
            .select-btn {
              width: 200upx;
            }
          }
          .two {
            .list {
              overflow: hidden;
              display: flex;
              flex-direction: row;
              align-items: center;
              box-sizing: border-box;
              padding-top: 10upx;
              .content {
                width: auto;
                font-size: 30upx;
                letter-spacing: 1upx;
                line-height: 35upx;
                color: #010101;
                font-family: "Ping Fang";
                padding-right: 20upx;
                box-sizing: border-box;
              }
              .del {
                width: 28upx;
                box-sizing: border-box;
              }
            }
          }
        }
        .select-btn {
          width: 165upx;
          height: 83upx;
          border-radius: 4upx;
          background-color: #d9233b;
          font-size: 30upx;
          letter-spacing: 1upx;
          line-height: 83upx;
          color: #ffffff;
          text-align: center;
          margin-left: 15upx;
          font-family: "Ping Fang";
          box-sizing: border-box;
        }
        .list-tables {
          width: 100%;
          box-sizing: border-box;
          border-bottom: 2upx dashed #d1d1d1;
          padding: 20upx 0;
          .one {
            display: flex;
            flex-direction: row;
            margin-bottom: 10upx;
            .one-left {
              flex: 1;
              display: flex;
              flex-direction: row;
              box-sizing: border-box;
              .right {
                .select-content {
                  width: 185upx;
                }
              }
            }
            .one-left1 {
              .left {
                width: 60upx;
              }
              .right {
                padding-left: 10upx;
                .select-content {
                  width: 100%;
                }
                .input-style1 {
                  width: 80upx;
                }
                .input-style2 {
                  width: 100%;
                }
              }
            }
          }
        }
        .list-tables:first-child {
          padding-top: 0;
        }
      }
      .from-content1 {
        padding: 0;
        display: flex;
        flex-direction: column;
      }
    }
    .table-add {
      width: 100%;
      height: auto;
      box-sizing: border-box;
      padding: 20upx 26upx;
      overflow: hidden;
      .adds {
        width: 68upx;
        height: 65upx;
        border-radius: 5upx;
        background-color: #d9233b;
        text-align: center;
        line-height: 60upx;
        margin: 0 auto;
        .iconfont {
          color: #fff;
          font-size: 32upx;
        }
      }
      .total {
        float: right;
        height: 83upx;
        display: flex;
        flex-direction: row;
        .left {
          font-size: 30upx;
          color: #000000;
          font-family: "Ping Fang";
          line-height: 80upx;
        }
        .input-style {
          width: 263upx;
          height: 80upx;
          border-radius: 3upx;
          background-color: #ffffff;
          border: 2.7777777777777777upx solid #fff;
          padding: 0 20upx;
          box-sizing: border-box;
          font-size: 30upx;
          color: #000000;
          font-family: "Ping Fang";
          margin-left: 10upx;
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
        width: 296upx;
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
        width: 296upx;
        height: 80upx;
        border-radius: 2upx;
        background-color: #fff;
        border: 2upx solid #aaaaaa;
      }
    }
  }
  .Business-information {
    background: #fff;
    width: 600upx;
    .title {
      font-size: 30upx;
      color: #000000;
      font-family: "Ping Fang";
      text-align: center;
      padding: 30upx 0;
    }
    .table_list {
      height: 600upx;
      overflow: hidden;
      overflow-y: auto;
    }
    .btn-list {
      width: 100%;
      padding: 10upx 0 30upx;
      box-sizing: border-box;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      .add {
        width: 100upx;
        height: 60upx;
        border-radius: 2upx;
        background-color: #d9233b;
        font-size: 28upx;
        letter-spacing: 1upx;
        line-height: 60upx;
        color: #ffffff;
        font-family: "Adobe Heiti Std";
        margin-right: 58upx;
        text-align: center;
      }
      .cancel {
        text-align: center;
        font-size: 28upx;
        letter-spacing: 1upx;
        line-height: 60upx;
        color: #000000;
        font-family: "Adobe Heiti Std";
        width: 100upx;
        height: 60upx;
        border-radius: 2upx;
        background-color: #fff;
        border: 0.6944444444444444upx solid #aaaaaa;
      }
    }
    .page {
      width: 100%;
      padding: 20upx;
      box-sizing: border-box;
      .uni-pagination {
        width: 100%;
      }
    }
  }
</style>
