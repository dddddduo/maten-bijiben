<template>
  <view class="fundApplication pageUniapp">
    <view class="from">
      <view class="from-content">
        <view class="left">
          公司名称<text class="text"></text>
        </view>
        <view class="right">
          <input type="text" class="input-style" v-model="formData.clientName" />
        </view>
      </view>
      <view class="from-content">
        <view class="left">
          地址<text class="text"></text>
        </view>
        <view class="right">
          <input type="text" class="input-style" v-model="formData.clientAddr" />
        </view>
      </view>
      <view class="from-content">
        <view class="left">
          联系人<text class="text"></text>
        </view>
        <view class="right">
          <input type="text" class="input-style" v-model="formData.clientContacts" />
        </view>
      </view>
      <view class="from-content">
        <view class="left">
          电话<text class="text"></text>
        </view>
        <view class="right">
          <input type="text" class="input-style" v-model="formData.clientTel" />
        </view>
      </view>
      <view class="from-content">
        <view class="left">
          其他<text class="text"></text>
        </view>
        <view class="right">
          <input type="text" class="input-style" v-model="formData.clientOther" />
        </view>
      </view>
      <view class="" v-for="(item, i) in tableList" :key="i">
        <view class="from-content">
          <view class="left">
            商品名称<text class="text"></text>
          </view>
          <view class="right">
            <input type="text" class="input-style" v-model="item.goodsName" />
          </view>
        </view>
        <view class="from-content">
          <view class="left">
            商品型号<text class="text"></text>
          </view>
          <view class="right">
            <input type="text" class="input-style" v-model="item.goodsModel" @input="inputWatch($event, i)" />
          </view>
        </view>
        <view class="from-content">
          <view class="left">
            产品价格<text class="text"></text>
          </view>
          <view class="right">
            <input type="text" class="input-style" v-model="item.marketPrice" />
          </view>
        </view>
        <view class="from-content">
          <view class="left">
            数量<text class="text"></text>
          </view>
          <view class="right">
            <input type="text" class="input-style" v-model="item.goodsNum" />
          </view>
        </view>
        <view class="from-content">
          <view class="left">
            优惠价格<text class="text"></text>
          </view>
          <view class="right">
            <input type="text" class="input-style" v-model="item.publicPrice" />
          </view>
        </view>
        <view class="from-content">
          <view class="left">
            备注<text class="text"></text>
          </view>
          <view class="right">
            <textarea  class="textarea-style" v-model="item.goodsRemark" />
          </view>
        </view>
      </view>
    </view>
    <view class="table-add">
      <view class="adds" @tap="addTotal">
        <i class="iconfont icon-jiahao"></i>
      </view>
    </view>
    <view class="from">
      <view class="from-content">
        <view class="left left-add-bottom">
          结算方式及税金<text class="text"></text>
        </view>
        <view class="right">
          <input type="text" class="input-style" v-model="formData.explain1" />
        </view>
      </view>
      <view class="from-content">
        <view class="left left-add-bottom">
          交货地点及方式<text class="text"></text>
        </view>
        <view class="right">
          <input type="text" class="input-style" v-model="formData.explain2" />
        </view>
      </view>
      <view class="from-content">
        <view class="left">
          供货周期<text class="text"></text>
        </view>
        <view class="right">
          <input type="text" class="input-style" v-model="formData.explain3" />
        </view>
      </view>
      <view class="from-content">
        <view class="left">
          其它备注<text class="text"></text>
        </view>
        <view class="right">
          <input type="text" class="input-style" v-model="formData.explain4" />
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
  export default {
    data () {
      return {
        formData: {
          clientName: '',
          clientAddr: '',
          clientContacts: '',
          clientTel: '',
          clientOther: '',
          explain1: '此报价包含13%增值税发票，款到发货。',
          explain2: '快递至需方指定交付地，保险费用由供方承担，交付前的风险由供方承担。',
          explain3: '现货。',
          explain4: ''
        },
        tableList: []
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
    onLoad() {
      const that = this
      let formData = uni.getStorageSync('priceInfo');
      that.tableList.push({
        goodsName: formData.twoname,
        goodsModel: formData.model,
        marketPrice: formData.market_price,
        goodsNum: '',
        publicPrice: formData.public_price,
        goodsRemark: ''
      })
    },
    methods: {
      // 通过型号查商品
      inputWatch (e, i) {
        console.log(e, i)
        const that = this
        if (Number(that.type) !== 1) {
          that.$api.getGoodsByModelApi({model: e.detail.value}).then(res => {
            if (res.data.status === 200) {
              if (res.data.data) {
                that.tableList[i].goodsName = res.data.data.pro_names
                that.tableList[i].marketPrice = res.data.data.market_price ? res.data.data.market_price : 0
                that.tableList[i].publicPrice = res.data.data.public_price ? res.data.data.public_price : 0
                that.tableList[i].goodsNum = ''
              } else {
                that.tableList[i].goodsName = ''
                that.tableList[i].marketPrice = 0
                that.tableList[i].publicPrice = 0
                that.tableList[i].goodsNum = ''
              }
            }
          })
        }
      },
      // 添加表格
      addTotal () {
        const that = this
        that.tableList.push({
          goodsName: '',
          goodsModel: '',
          marketPrice: '',
          goodsNum: '',
          publicPrice: '',
          goodsRemark: ''
        })
      },
      back () {
        uni.switchTab({
          url: "./price"
        })
      },
      // 提交
      add () {
        const that = this
        var goods_data = {}
        if (that.formData.clientName === '') {
          uni.showToast({
            title: '请填写公司名称',
            duration: 2000,
            icon: 'none'
          });
        } else {
          if (that.tableList.length > 0) {
            that.tableList.filter((item, i) => {
              goods_data["goods[" + i + "][goodsName]"] = item.goodsName
              goods_data["goods[" + i + "][goodsModel]"] = item.goodsModel
              goods_data["goods[" + i + "][marketPrice]"] = item.marketPrice
              goods_data["goods[" + i + "][goodsNum]"] = item.goodsNum
              goods_data["goods[" + i + "][publicPrice]"] = item.publicPrice
              goods_data["goods[" + i + "][goodsRemark]"] = item.goodsRemark
            })
          }
          that.$api.quotationCreateApi({
            ...that.formData,
            ...goods_data
          }).then(res => {
            if (res.data.status === 200) {
              uni.showToast({
                title: '添加成功',
                duration: 2000,
                icon: 'none'
              });
              setTimeout(() => {
                uni.navigateTo({
                  url: "./quotation"
                })
              }, 1000)
            } else {
              uni.showToast({
                title: res.data.msg,
                duration: 2000,
                icon: 'none'
              });
            }
          })
        }
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
            // width: 90upx;
          }
        }
        .left-add-bottom {
          font-size: 28upx;
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
    .table-add {
      width: 100%;
      height: auto;
      box-sizing: border-box;
      padding: 20upx 26upx 0;
      overflow: hidden;
      .adds {
        width: 68upx;
        height: 65upx;
        border-radius: 5upx;
        background-color: #d9233b;
        text-align: center;
        line-height: 65upx;
        margin: 0 auto;
        .iconfont {
          color: #fff;
          font-size: 32upx;
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
      }
    }
  }
</style>
