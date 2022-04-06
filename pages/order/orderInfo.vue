<template>
  <view class="fundApplication pageUniapp">
    <view class="from">
      <view class="from-content">
        <view class="left">
          所在区域<text class="text"></text>
        </view>
        <view class="right">
          <view class="select-content">
            <picker class="picker" mode="selector" @change="bindPickerChange" :value="index" :range="regionList"
              range-key="areaname">
              <view class="uni-input" v-if="index < 0" style="color: #adadad;">所在区域</view>
              <view class="uni-input" v-if="regionList.length > 0">{{regionList[index] ? regionList[index].areaname : ''}}</view>
              <i class="iconfont icon-leftArrows"></i>
            </picker>
          </view>
        </view>
      </view>
      <view class="from-content">
        <view class="left">
          信息源<text class="text"></text>
        </view>
        <view class="right">
          <view class="radio-list">
            <view class="radios" v-for="(item, i) in businessSourceList" :key="i" @tap="businessSourceTap(item.id)">
              <view class="circle"><text class="i" v-if="Number(formData.business_source) === item.id"></text></view>{{item.name}}
            </view>
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
          <!-- <input type="text" class="input-style" v-model="formData.suinote" /> -->
          <textarea class="textarea-style" maxlength="5000" auto-height="true" v-model="formData.suinote" />
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
      <view class="from-content from-content1">
        <view class="list-tables" v-for="(item, i) in tableList" :key="i">
          <view class="one">
            <view class="one-left">
              <view class="left">
                分类<text class="text"></text>
              </view>
              <view class="right">
                <input type="text" class="input-style" v-model="item.goodstype" />
              </view>
            </view>
            <view class="one-left one-left1">
              <view class="left">
                名称<text class="text"></text>
              </view>
              <view class="right">
                <input type="text" class="input-style" v-model="item.goodsname" />
              </view>
            </view>
          </view>
          <view class="two">
            <view class="one-left one-left2">
              <view class="left">
                型号<text class="text"></text>
              </view>
              <view class="right">
                <input type="text" class="input-style" v-model="item.goodsmodel" />
              </view>
            </view>
            <view class="one-left one-left1">
              <view class="left">
                数量<text class="number"></text>
              </view>
              <view class="right">
                <input type="text" class="input-style input-style1" v-model="item.goodsnum" />
              </view>
            </view>
          </view>
          <view class="one">
            <view class="one-left">
              <view class="left">
                单价<text class="number"></text>
              </view>
              <view class="right">
                <input type="text" class="input-style" v-model="item.goodsprice" />
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
        <input type="text" class="input-style" @tap="inpuTap" v-model="totalNum" />
      </view>
    </view>
    <view class="add-cancel-style">
      <view class="cancel-btn-style" @tap="back">取消</view>
      <view class="add-btn-style" @tap="add">提交</view>
    </view>
    <uni-popup ref="popupMessage" type="center">
      <view class="Business-information">
        <view class="title">
          快速填单选择
        </view>
        <scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y">
          <view class="table_list">
            <t-table borderColor="#d9233b">
              <t-tr bgColor="#d9233b" color="#fff" fontSize="14">
                <t-th bgColor="#d9233b" widthStyle="75%">客户名称</t-th>
                <t-th bgColor="#d9233b" widthStyle="25%">操作</t-th>
              </t-tr>
              <t-tr v-for="(item, i) in orderFasList" :key="i">
                <t-td widthStyle="75%">{{ item.cli_name }}</t-td>
                <t-td widthStyle="25%">
                  <view @tap="selectTap(item)">选择</view>
                </t-td>
              </t-tr>
            </t-table>
          </view>
        </scroll-view>
      </view>
    </uni-popup>
  </view>
</template>

<script>
  import uniPopup from '@/components/uni-popup/uni-popup.vue'
  import tTable from '@/components/t-table/t-table.vue';
  import tTh from '@/components/t-table/t-th.vue';
  import tTr from '@/components/t-table/t-tr.vue';
  import tTd from '@/components/t-table/t-td.vue';
  export default {
    components: {
      tTable,
      tTh,
      tTr,
      tTd,
      uniPopup
    },
    data() {
      return {
        scrollTop: 0,
        purposeList: [{
            id: 2,
            name: '推广'
          },
          {
            id: 3,
            name: '差旅'
          },
          {
            id: 7,
            name: '其他'
          }
        ],
        formData: {
          cli_name: '',
          area: '',
          cli_address: '',
          cli_linkname: '',
          cli_tel: '',
          cli_moneydesc: '',
          cli_wldesc: '',
          suinote: '',
          huonote: '',
          business_source: ''
        },
        wenshu: '',
        businessSourceList: [{
            id: 1,
            name: '贴牌'
          },
          {
            id: 2,
            name: '拓展'
          },
          {
            id: 3,
            name: '分配'
          },
          {
            id: 4,
            name: '维护'
          },
          // 2 拓展  3分配  1贴牌  4维护
        ],
        index: -1,
        regionList: [],
        AssignPersonnel: [],
        indexAssign: -1,
        Businesslist: [],
        sendOutList: [],
        choiceList: [],
        page: 1,
        count: '',
        tableList: [{
          goodstype: '',
          goodsname: '',
          goodsmodel: '',
          goodsnum: 1,
          goodsprice: '',
          selectIndex: -1,
          nameIndex: -1,
          modelIndex: -1,
          nameList: [],
          modelList: []
        }],
        orderFasList: [],
        cli_name: '',
        selectList: [{
            "id": 21,
            "title": "国内自主"
          },
          {
            "id": -3,
            "title": "出口商品"
          },
          {
            "id": -2,
            "title": "相关配件"
          },
          {
            "id": -1,
            "title": "贸易产品"
          },
          // 21国内自主   -3 出口商品  -2 相关配件  -1 贸易产品
        ],
        selectIndex: -1,
        nameList: [],
        nameIndex: -1,
        modelList: [],
        modelIndex: -1,
        totalNum: null,
        infoTop: null
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
    onBackPress(options) {
      if (options.from === 'navigateBack') {
        return false;
      }
      this.back();
      return true;
    },
    onShow() {
      const that = this
    },
    onLoad(option) {
      const that = this
      if (option.id) {
        that.infoId = option.id
        that.infoTop = option.top
        that.init()
      }
    },
    methods: {
      // 单选框
      businessSourceTap(id) {
        const that = this
        if (that.formData.business_source === '') {
          that.formData.business_source = id
        } else {
          if (that.formData.business_source === id) {
            that.formData.business_source = ''
          } else {
            that.formData.business_source = id
          }
        }
      },
      // 总计
      inpuTap() {
        const that = this
        let num = 0
        if (that.tableList.length > 0) {
          that.tableList.filter(item => {
            num += item.goodsprice * item.goodsnum
          })
        }
        console.log(num)
        this.totalNum = num
      },
      // 选择
      selectTap(val) {
        const that = this
        that.formData.cli_name = val.cli_name
        // that.formData.area = val.area
        that.formData.cli_address = val.cli_address
        that.formData.cli_linkname = val.cli_linkname
        that.formData.cli_tel = val.cli_tel
        // that.formData.cli_moneydesc = val.cli_moneydesc
        // that.formData.cli_wldesc = val.cli_wldesc
        // that.formData.suinote = val.suinote
        // that.formData.huonote = val.huonote
        that.close()
      },
      close() {
        this.$refs.popupMessage.close()
      },
      // 添加发送项
      addSendOut() {
        const that = this
        var Businesslist = that.Businesslist,
          arr = [];
        for (var i = 0; i < Businesslist.length; i++) {
          if (Number(Businesslist[i].id) === Number(that.wenshu)) {
            that.sendOutList.push(Businesslist[i])
            return;
          }
        }
        uni.showToast({
          title: '未搜索到',
          duration: 2000,
          icon: 'none'
        });
      },
      // 移除发送项
      delSendOut(val, i) {
        console.log(val, i)
        const that = this
        that.sendOutList.splice(i, 1);
      },
      // 数组去重
      MergeArray(arr1, arr2) {
        var _arr = [];
        for (var i = 0; i < arr1.length; i++) {
          _arr.push(arr1[i]);
        }
        for (var i = 0; i < arr2.length; i++) {
          var flag = true;
          for (var j = 0; j < arr1.length; j++) {
            if (arr2[i].id === arr1[j].id) {
              flag = false;
              break;
            }
          }
          if (flag) {
            _arr.push(arr2[i]);
          }
        }
        return _arr;
      },
      // 初始化
      init() {
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
      bindPickerChange($event) {
        console.log($event)
        const that = this
        that.index = $event.detail.value
        that.formData.area = that.regionList[that.index].id
      },
      // 添加表格
      addTotal() {
        const that = this
        that.tableList.push({
          goodstype: '',
          goodsname: '',
          goodsmodel: '',
          goodsnum: 1,
          goodsprice: '',
          selectIndex: -1,
          nameIndex: -1,
          modelIndex: -1,
          nameList: [],
          modelList: []
        })
      },
      // 下拉菜单发生改变时---分类
      selectPickerChange($event, i) {
        console.log($event, i)
        const that = this
        that.tableList[i].selectIndex = $event.detail.value
        that.tableList[i].goodstype = that.selectList[that.tableList[i].selectIndex].id
        that.ordergetLm(that.selectList[that.tableList[i].selectIndex].id, i, 0)
      },
      // 下拉菜单发生改变时---分类
      namePickerChange($event, i) {
        console.log($event, i)
        const that = this
        that.tableList[i].nameIndex = $event.detail.value
        that.tableList[i].goodsname = that.tableList[i].nameList[that.tableList[i].nameIndex].id
        that.ordergetLm(that.tableList[i].nameList[that.tableList[i].nameIndex].id, i, 1)
      },
      // 下拉菜单发生改变时---型号列表
      modelPickerChange($event, i) {
        console.log($event, i)
        const that = this
        that.tableList[i].modelIndex = $event.detail.value
        that.tableList[i].goodsmodel = that.tableList[i].modelList[that.tableList[i].modelIndex].id
        that.$api.getPriceApi({
          id: that.tableList[i].goodsmodel
        }).then(res => {
          if (res.data.status === 200) {
            that.tableList[i].goodsprice = res.data.data
          }
        })
      },
      // 获取产品名称,型号列表
      ordergetLm(id, i, j, obj) {
        const that = this
        console.log(obj, 111111)
        that.$api.ordergetLmApi({
          id: id
        }).then(res => {
          if (res.data.status === 200) {
            if (j === 0) {
              that.tableList[i].nameList = res.data.data
              if (obj === 1) {
                if (that.tableList[i].nameList.length > 0) {
                  that.tableList[i].nameList.filter((item, k) => {
                    if (Number(item.id) === Number(that.tableList[i].goodsnames)) {
                      that.tableList[i].nameIndex = k
                    }
                  })
                }
              }
            } else if (j === 1) {
              that.tableList[i].modelList = res.data.data
              if (obj === 1) {
                if (that.tableList[i].modelList.length > 0) {
                  that.tableList[i].modelList.filter((item, k) => {
                    if (Number(item.id) === Number(that.tableList[i].goodsmodels)) {
                      that.tableList[i].modelIndex = k
                    }
                  })
                }
              }
            }
            that.$forceUpdate()
          }
        })
      },
      back() {
        this.$store.commit("checkoutIdKey", this.infoId);
        let value = {}
        value.id = this.infoId
        value.top = this.infoTop
        uni.setStorageSync('checkoutIdKey', value);
        this.$store.commit("checkoutTopScrollKey", 1);
        uni.switchTab({
          url: "./order"
        })
        uni.removeStorage({
          key: 'orderInfo'
        })
      },
      // 提交
      add() {
        const that = this
        // console.log(this.formData.suinote)
        that.$api.orderEditApi({
          ...that.formData
        }).then(res => {
          if (res.data.status === 200) {
            uni.showToast({
              title: '修改成功',
              duration: 2000,
              icon: 'none'
            });
            setTimeout(() => {
              uni.reLaunch({
                url: "./order"
              })
            }, 1000)
          }
        })
      },
      // 单选框
      purposeTap(id) {
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
      padding: 30upx 16upx 0 10upx;

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

        .left1 {
          height: 80upx;
          width: 130upx;
          // text-align: justify;
          font-size: 30upx;
          color: #000000;
          font-family: "Ping Fang";
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
            min-height: 40px;
            line-height: 60upx;
            height: auto;
            width: 100%;
            // min-height: 300upx;
            border-radius: 3upx;
            background-color: #ffffff;
            border: 2.7777777777777777upx solid #fff;
            padding: 10upx 10upx 0;
            box-sizing: border-box;
            font-size: 30upx;
            color: #000000;
            font-family: "Ping Fang";
            outline: none;
          }

          .radio-list {
            width: 100%;
            display: inline-block;

            // display: flex;
            // flex-direction: row;
            // justify-content: center;
            // align-items: center;
            .radios {
              font-size: 30upx;
              letter-spacing: 1upx;
              // line-height: 80upx;
              padding-top: 10upx;
              color: #333333;
              font-family: "Ping Fang";
              float: left;
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

            .one-left2 {
              flex: 1;

              .input-style {
                width: 200upx;
              }
            }

            .one-left3 {
              width: 130upx;
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
                  width: 100upx;
                }

                .input-style2 {
                  width: 100%;
                }
              }
            }
          }
        }

        .two {
          display: flex;
          flex-direction: row;
          margin-bottom: 10upx;

          .one-left {
            display: flex;
            flex-direction: row;
            box-sizing: border-box;

            .right {
              .select-content {
                width: 185upx;
              }
            }
          }

          .one-left2 {
            flex: 1;
          }

          .one-left1 {
            width: 210upx;
            text-align: right;

            .input-style1 {
              width: 120upx;
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

    .scroll-Y {
      height: 600upx;
      // overflow: hidden;
      // overflow-y: auto;
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
