<template>
  <view class="fundApplication pageUniapp">
    <view class="from">
      <view class="from-content">
        <view class="left">
          资金用途<text class="text"></text>
        </view>
        <view class="right">
          <view class="radio-list">
            <view class="radios" v-for="(item, i) in purposeList" :key="i">
              <view class="circle" @tap="purposeTap(item.id)"><text class="i" v-if="formData.zc_type === item.id"></text></view>{{item.name}}
            </view>
          </view>
        </view>
      </view>
      <view class="from-content">
        <view class="left">
          单号<text class="text"></text>
        </view>
        <view class="right">
          <input type="text" class="input-style" v-model="formData.order_num" />
        </view>
      </view>
      <view class="from-content">
        <view class="left">
          用途明细<text class="text"></text>
        </view>
        <view class="right">
          <input type="text" class="input-style" v-model="formData.purpose" />
        </view>
      </view>
      <view class="from-content">
        <view class="left">
          收款名称<text class="text"></text>
        </view>
        <view class="right">
          <input type="text" class="input-style" v-model="formData.name_bank" />
        </view>
      </view>
      <view class="from-content">
        <view class="left">
          联系人<text class="text"></text>
        </view>
        <view class="right">
          <input type="text" class="input-style" v-model="formData.linkman" />
        </view>
      </view>
      <view class="from-content">
        <view class="left">
          联系电话<text class="text"></text>
        </view>
        <view class="right">
          <input type="text" class="input-style" v-model="formData.tel" />
        </view>
      </view>
      <view class="from-content">
        <view class="left">
          付款方式<text class="text"></text>
        </view>
        <view class="right">
          <view class="radio-list">
            <view class="radios">
              <view class="circle" @tap="payTypeTap(1)"><text class="i" v-if="formData.pay_type === 1"></text></view>中行对公
            </view>
            <view class="radios">
              <view class="circle" @tap="payTypeTap(3)"><text class="i" v-if="formData.pay_type === 3"></text></view>工行对公
            </view>
            <view class="radios">
              <view class="circle" @tap="payTypeTap(2)"><text class="i" v-if="formData.pay_type === 2"></text></view>对私
            </view>
            <view class="radios">
              <view class="circle" @tap="payTypeTap(4)"><text class="i" v-if="formData.pay_type === 4"></text></view>现金
            </view>
          </view>
          <input type="text" v-if="formData.pay_type === 1" style="margin-top: 14upx;" class="input-style" v-model="formData.pay_type_remark" />
        </view>
      </view>
      <view class="from-content">
        <view class="left">
          收款人<text class="text"></text>
        </view>
        <view class="right">
          <input type="text" class="input-style" v-model="formData.pay_name" />
        </view>
      </view>
      <view class="from-content">
        <view class="left">
          收款账号<text class="text"></text>
        </view>
        <view class="right">
          <input type="text" class="input-style" v-model="formData.pay_card" />
        </view>
      </view>
      <view class="from-content">
        <view class="left">
          开户行<text class="text"></text>
        </view>
        <view class="right">
          <input type="text" class="input-style" v-model="formData.pay_address" />
        </view>
      </view>
      <view class="from-content">
        <view class="left">
          付款金额<text class="text"></text>
        </view>
        <view class="right">
          <input type="text" class="input-style" v-model="formData.monen" />
        </view>
      </view>
      <view class="from-content">
        <view class="left left1">
          备注<text class="text"></text>
        </view>
        <view class="right">
          <textarea  class="textarea-style" v-model="formData.remark" />
        </view>
      </view>
    </view>
    <view class="add-cancel-style">
      <view class="cancel-btn-style" @tap="back">取消</view>
      <view class="add-btn-style" @tap="add">提交</view>
    </view>
  </view>
</template>

<script>
  import currentDate from '../../common/currentDate.js'
  // {id: 1, name: '贸易'},
  export default {
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
          zc_type: 2,
          purpose: '',
          order_num: '',
          name_bank: '',
          linkman: '',
          tel: '',
          pay_name: '',
          pay_card: '',
          pay_address: '',
          monen: '',
          remark: '',
          pay_type_remark: '',
          pay_type: 1
        }
      }
    },
    onNavigationBarButtonTap(options) {
      console.log(options)
      if (options.index === 0) {
        this.back();  
      } else if (options.index === 1) {
        uni.reLaunch({
          url: "./capital"
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
      let date = currentDate.getDate(1)
      this.formData.order_num = date
    },
    methods: {
      // 付款方式
      payTypeTap(i) {
        this.formData.pay_type = i
        if (this.formData.pay_type === 2) {
          this.formData.pay_type_remark = ''
        }
      },
      back () {
        uni.reLaunch({
          url: "./capital"
        })
      },
      // 提交
      add () {
        const that = this
        that.$api.financeAddApi({
          ...that.formData
        }).then(res => {
          if (res.data.status === 200) {
            uni.showToast({
                title: '添加成功',
                duration: 2000,
                icon: 'none'
            });
            setTimeout(() => {
              uni.reLaunch({
                url: "./capital"
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
            height: 130upx;
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
              margin-right: 12upx;
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
</style>
