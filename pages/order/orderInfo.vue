<template>
  <view class="fundApplication pageUniapp">
    <view class="from">
      <view class="from-content">
        <view class="left">
          所在区域<text class="text"></text>
        </view>
        <view class="right">
          <view class="select-content">
            <picker class="picker" mode="selector" @change="bindPickerChange" :value="index" :range="regionList" range-key="areaname">
              <view class="uni-input" v-if="index < 0" style="color: #adadad;">所在区域</view>
              <view class="uni-input" v-if="regionList.length > 0">{{regionList[index] ? regionList[index].areaname : ''}}</view>
              <i class="iconfont icon-leftArrows"></i>
            </picker>
          </view>
        </view>
      </view>
      <view class="from-content">
        <view class="left">
          客户名称<text class="text"></text>
        </view>
        <view class="right">
          <input type="text" class="input-style" v-model="formData.cli_name" />
        </view>
      </view>
      <view class="from-content">
        <view class="left">
          发货地址<text class="text"></text>
        </view>
        <view class="right">
          <input type="text" class="input-style" v-model="formData.cli_address" />
        </view>
      </view>
      <view class="from-content">
        <view class="left">
          联系人<text class="text"></text>
        </view>
        <view class="right">
          <input type="text" class="input-style" v-model="formData.cli_linkname" />
        </view>
      </view>
      <view class="from-content">
        <view class="left">
          联系电话<text class="text"></text>
        </view>
        <view class="right">
          <input type="text" class="input-style" v-model="formData.cli_tel" />
        </view>
      </view>
      <view class="from-content">
        <view class="left">
          税务批注<text class="text"></text>
        </view>
        <view class="right">
          <input type="text" class="input-style" v-model="formData.cli_moneydesc" />
        </view>
      </view>
      <view class="from-content">
        <view class="left">
          物流备注<text class="text"></text>
        </view>
        <view class="right">
          <input type="text" class="input-style" v-model="formData.cli_wldesc" />
        </view>
      </view>
      <view class="from-content">
        <view class="left">
          随机附带<text class="text"></text>
        </view>
        <view class="right">
          <input type="text" class="input-style" v-model="formData.suinote" />
        </view>
      </view>
      <view class="from-content">
        <view class="left">
          贷款情况<text class="text"></text>
        </view>
        <view class="right">
          <input type="text" class="input-style" v-model="formData.huonote" />
        </view>
      </view>
      <view class="from-content from-content1" v-if="tableList.length > 0">
        <view class="list-tables" v-for="(item, i) in tableList" :key="i">
          <view class="one">
            <view class="one-left">
              <view class="left">
                分类<text class="text"></text>
              </view>
              <view class="right">
                <input type="text" class="input-style" style="width: 200upx;" v-model="item.goodstype" />
              </view>
            </view>
            <view class="one-left one-left1">
              <view class="left" style="text-align: right;">
                型号<text class="text"></text>
              </view>
              <view class="right">
                <input type="text" class="input-style" v-model="item.goodsmodel" />
              </view>
            </view>
          </view>
          <view class="one">
            <view class="one-left">
              <view class="left">
                名称<text class="text"></text>
              </view>
              <view class="right">
                <input type="text" class="input-style" v-model="item.goodsname" />
              </view>
            </view>
          </view>
          <view class="one">
            <view class="one-left">
              <view class="left">
                数量<text class="number"></text>
              </view>
              <view class="right1">
                <input type="text" class="input-style input-style1" v-model="item.goodsnum" />
              </view>
              <view class="left" style="text-align: right;width: 80upx;">
                单价<text class="number"></text>
              </view>
              <view class="right">
                <input type="text" class="input-style input-style2" v-model="item.goodsprice" />
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
    <view class="table-add">
      <view class="total">
        <view class="left">
          合计
        </view>
        <input type="text" class="input-style" v-model="totalNum" />
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data () {
      return {
        formData: {
          cli_name: '',
          area: '',
          cli_address: '',
          cli_linkname: '',
          cli_tel: '',
          cli_moneydesc: '',
          cli_wldesc: '',
          suinote: '',
          huonote: ''
        },
        index: -1,
        regionList: [],
        tableList: [],
        totalNum: null,
        infoId: ''
      }
    },
    onNavigationBarButtonTap(options) {
      console.log(options)
      if (options.index === 0) {
        this.back();
      } else if (options.index === 1) {
        uni.switchTab({
          url: "./order"
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
        that.init()
      }
    },
    methods: {
      // 初始化
      init () {
        const that = this
        // 区域列表
        that.$api.areaListApi().then(res => {
          if (res.data.status === 200) {
            that.regionList = res.data.data
            // 列表
            that.$api.orderInfoApi({
              id: that.infoId
            }).then(res => {
              if (res.data.status === 200) {
                that.formData = res.data.data.info
                that.tableList = res.data.data.list
                that.totalNum = res.data.data.total
                // 区域
                console.log(that.regionList)
                if (that.regionList.length > 0) {
                  that.regionList.filter((item, i) => {
                    if (Number(item.id) === Number(that.formData.area)) {
                      console.log(i)
                      that.index = i
                    }
                  })
                }
              }
            })
          }
        })
      },
      // 下拉菜单发生改变时
      bindPickerChange ($event) {
        console.log($event)
        const that = this
        that.index = $event.detail.value
        that.formData.area = that.regionList[that.index].id
      },
      back () {
        uni.switchTab({
          url: "./order"
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  .fundApplication {
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
          .textarea-style {
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
            justify-content: center;
            align-items: center;
            .radios {
              font-size: 30upx;
              letter-spacing: 1upx;
              line-height: 80upx;
              color: #333333;
              font-family: "Ping Fang";
              flex: 1;
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
                margin-left: 20upx;
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
            .right1 {
              width: 180upx;
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
                .input-style2 {
                  width: 100%;
                }
              }
            }
            .input-style1 {
              width: 180upx;
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
