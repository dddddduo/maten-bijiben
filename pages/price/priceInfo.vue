<template>
  <view class="fundApplication pageUniapp">
    <view class="from">
      <view class="from-content">
        <view class="left">
          商品分类<text class="text"></text>
        </view>
        <view class="right">
          <input type="text" class="input-style" v-model="formData.onename" />
        </view>
      </view>
      <view class="from-content">
        <view class="left">
          商品名称<text class="text"></text>
        </view>
        <view class="right">
          <input type="text" class="input-style" v-model="formData.twoname" />
        </view>
      </view>
      <view class="from-content">
        <view class="left">
          商品型号<text class="text"></text>
        </view>
        <view class="right">
          <input type="text" class="input-style" v-model="formData.model" />
        </view>
      </view>
      <view class="from-content">
        <view class="left">
          市场价格<text class="text"></text>
        </view>
        <view class="right">
          <input type="text" class="input-style" v-model="formData.market_price" />
        </view>
      </view>
      <view class="from-content">
        <view class="left">
          优惠活动<text class="text"></text>
        </view>
        <view class="right">
          <input type="text" class="input-style" v-model="formData.public_price" />
        </view>
      </view>
      <view class="from-content">
        <view class="left">
          代理价格<text class="text"></text>
        </view>
        <view class="right">
          <view class="input-style" style="line-height: 80upx;">
            {{AgencyPrice(formData, 1)}}
          </view>
        </view>
      </view>
      <view class="from-content">
        <view class="left">
          签约价格<text class="text"></text>
        </view>
        <view class="right">
          <input type="text" class="input-style" v-model="formData.store_price" />
        </view>
      </view>
      <view class="from-content">
        <view class="left">
          价格底限<text class="text"></text>
        </view>
        <view class="right">
          <view class="input-style" style="line-height: 80upx;">
            {{AgencyPrice(formData, 2)}}
          </view>
        </view>
      </view>
      <view class="from-content">
        <view class="left">
          成本价格<text class="text"></text>
        </view>
        <view class="right">
          <input type="text" class="input-style" v-if="moneyShow === true" v-model="formData.cost_price" />
          <input type="text" class="input-style" v-else />
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
      <view class="add-btn-style" @tap="quotationTap">制作报价单</view>
    </view>
  </view>
</template>

<script>
  export default {
    data () {
      return {
        formData: {
        },
        moneyShow: false,
        infoId: '',
        infoTop: null
      }
    },
    onNavigationBarButtonTap(options) {
      console.log(options)
      if (options.index === 0) {
        this.back();
      } else if (options.index === 1) {
        uni.navigateTo({
          url: "./quotation"
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
      const that = this
      that.formData = uni.getStorageSync('priceInfo');
      console.log(that.formData)
      that.limitMethods()
    },
    onLoad(option) {
      console.log(option)
      const that = this
      if (option.id) {
        that.infoId = option.id
        that.infoTop = option.top
      }
    },
    methods: {
      limitMethods () {
        const that = this
        let dpLimit = uni.getStorageSync('dpLimit');
        let uid = uni.getStorageSync('uid');
        if (dpLimit.length > 0) {
          dpLimit.filter(item => {
            if (Number(item) === 264) {
              that.moneyShow = true
            }
          })
        }
        if (Number(uid) === 1) {
          that.moneyShow = true
        }
      },
      quotationTap () {
        uni.navigateTo({
          url: "./quotationData"
        })
      },
      AgencyPrice (val, i) {
        let a;
        if (i === 1) {
          a = '75_price'
        } else if (i === 2) {
          a = '68_price'
        }
        return val[a]
      },
      back () {
        this.$store.commit("priceIdKey", this.infoId);
        let value = {}
        value.id = this.infoId
        value.top = this.infoTop
        uni.setStorageSync('priceIdKey', value);
        this.$store.commit("priceTopScrollKey", 1);
        uni.switchTab({
          url: "./price"
        })
        uni.removeStorage({
          key: 'priceInfo'
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
        text-align: center;
        box-sizing: border-box;
      }
    }
  }
</style>
