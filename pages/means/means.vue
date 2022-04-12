<template>
  <view class="capital pageUniapp">
    <view class="pageu">
      
      <view class="search">
        <!-- <view class="search-input">
          <input type="text" class="input" v-model="keyword" placeholder="搜索" placeholder-style="color: #cccccc;" confirm-type="search" @input="searchSubmit" />
          <i class="iconfont icon-sousuo"></i>
          <i v-if="keyword.length" class="iconfont icon-cuohao" @click="clear"></i>
        </view> -->
        <input type="text" class="search-input" v-model="keyword" />
        <view class="btn" @tap="searchSubmit">
          <image src="../../static/img/search1.png" class="magnifier" mode=""></image>
        </view>
      </view>
      <view class="table_list">
        <t-table>
          <t-tr color="#000" fontSize="14">
            <t-th widthStyle="50%" textAlign="center">产品名称</t-th>
            <t-th widthStyle="20%" paddingLeft="0 0 0 20upx">型号</t-th>
            <t-th widthStyle="19%" paddingLeft="0 0 0 20upx">品牌</t-th>
            <t-th widthStyle="11%" textAlign="center" paddingLeft="0 0 0 2upx"></t-th>
          </t-tr>
          <t-tr v-for="(item, i) in list" :key="i">
            <t-td widthStyle="50%"><i class="diandian" :class="Number(item.mark_tiny) === 1 ? 'red-dian' : ''"></i>{{ item.goodsnames }}</t-td>
            <t-td widthStyle="20%" textAlign="center">{{ item.goodsmodels }}</t-td>
            <t-td widthStyle="19%" textAlign="center">{{ item.goodsbrand }}</t-td>
            <t-td widthStyle="11%">
              <view class="img-list" @tap="selectInfo(item)">
                <i class="iconfont icon-jiantou"></i>
              </view>
            </t-td>
          </t-tr>
        </t-table>
      </view>
      <m-loading :loading="loading" :finished="finished"></m-loading>
      <!-- <uni-nav :current="current" :list="navList" @clicks="clickNav"></uni-nav> -->
    </view>
    <u-tabbar :list="vuex_tabbar" height="60px" @change="tabbarChange"></u-tabbar>
  </view>
</template>

<script>
  import tTable from '@/components/t-table/t-table.vue';
  import tTh from '@/components/t-table/t-th.vue';
  import tTr from '@/components/t-table/t-tr.vue';
  import tTd from '@/components/t-table/t-td.vue';
  import mLoading from '@/components/m-icon/m-loading.vue';
  import listMixin from '@/common/mixins/list-mixin.js';
  import uniNav from "@/components/uni-bottom-nav/uni-nav.vue"
  import {mapState} from 'vuex'
  export default {
    computed: {
      ...mapState(['vuex_tabbar', 'customerJurisdictionTrues'])
    },
    data () {
      return {
        tableList: [],
        list: [],
        finished: false,
        current: 0,
				navList: [
          {
          	"pagePath": "../../pages/capital/capital",
          	"text": "资金",
          	"src": "../../static/img/banner/capital.png",
          	"srcSelect": "../../static/img/banner/capital-check.png"
          }, {
          	"pagePath": "../../pages/customer/customer",
          	"text": "客户",
          	"src": "../../static/img/banner/customer.png",
          	"srcSelect": "../../static/img/banner/customer-check.png"
          }, {
          	"pagePath": "../../pages/channel/channel",
          	"text": "渠道",
          	"src": "../../static/img/banner/channel.png",
          	"srcSelect": "../../static/img/banner/channel-check.png"
          }, {                              
          	"pagePath": "../../pages/price/price",
          	"text": "价格",                 
          	"src": "../../static/img/banner/price.png",
          	"srcSelect": "../../static/img/banner/price-check.png"
          }, {
          	"pagePath": "../../pages/order/order",
          	"text": "订单",
          	"src": "../../static/img/banner/order.png",
          	"srcSelect": "../../static/img/banner/order-check.png"
          }
        ],
        keyword: ''
      }
    },
    mixins: [listMixin],
    components: {
      tTable,
      tTh,
      tTr,
      tTd,
      mLoading,
      uniNav
    },
    onNavigationBarButtonTap(options) {
      if (options.index === 0) {
        this.back();
      } else if (options.index === 1) {
        // uni.navigateTo({
        //   url: "./fundApplication"
        // })
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
    onTabItemTap(e) {
      console.log(666666)
      // this.clear()
    },
    onLoad() {
      let tabList = uni.getStorageSync('tabList');
      console.log(tabList, 'onLoad')
      if (tabList[0] === 0) {
        tabList[0] = 1
        uni.setStorageSync('tabList', tabList)
      }
    },
    onShow() {
      let tabList = uni.getStorageSync('tabList');
      console.log(tabList)
      if (tabList[0] === 0) {
        this.clear()
        tabList[0] = 1
        // tabList = [1,0,0,0,0]
        uni.setStorageSync('tabList', tabList)
      }
    },
    methods: {
      tabbarChange (e) {
        const that = this
        console.log(e, 999999999999999999999999999)
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
      clear () {
        this.keyword = ''
        this.searchSubmit()
      },
      clickNav (data) {
        const that = this
        that.current = data.select
      },
      // 批复
      replySet (id) {
        const that = this
        that.$api.replySetApi({id: id}).then(res => {
          if (res.data.status === 200) {
            uni.showToast({
                title: '批复成功',
                duration: 2000,
                icon: 'none'
            });
            that.searchSubmit()
          }
        })
      },
      // 查询详情
      selectInfo (val) {
        uni.navigateTo({
          url: "./meansInfo?id=" + val.id
        })
      },
      // 返回首页
      back () {
        uni.navigateTo({
          url: "../index/index"
        })
      },
      // 搜索
      searchSubmit(){
        // 调用混合搜索
        this._searchData();
      },
      // 数据请求(没错就是这么少的代码)
      async _getList() {
        this.$api.ProDataApi({
          "page": this.page,    //页码，整数大于0，必填
          "pageSize": 15, //每页显示条数，整数大于0必填
          "key": this.keyword
        }).then(res => {
          if (res.data.status === 200) {
            let self = this;
            this.tableList = res.data.data
            this.total = res.data.data.count
            res.data.data.map(item => {
              self.list.push(item);
            });
            if (this.total === this.list.length) {
              this.finished = true
            } else {
              this.finished = false
            }
            // console.log(self.list)
          }
        })
      },
      init () {
        const that = this
        that.$api.ProDataApi({
          "page": 1,    //页码，整数大于0，必填
          "pageSize":10 //每页显示条数，整数大于0必填
        }).then(res => {
          if (res.data.status === 200) {
            that.tableList = res.data.data
            this.list = res.data.data
            this.total = res.data.data.count
          }
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  .capital {
    .search {
      height: auto;
      width: 100%;
      padding: 10upx;
      box-sizing: border-box;
      display: flex;
      flex-direction: row;
      .search-input{
        flex: 1;
        height: 83upx;
        border-radius: 3upx;
        background-color: #ffffff;
        border: 2upx solid #fff;
        padding: 0 20upx;
        line-height: 83upx;
        box-sizing: border-box;
        position: relative;
        display: flex;
        align-items: center;
        .input {
          border: none;
          background: none;
        }
      }
      .icon-sousuo {
        position: absolute;
        left: 20upx;
        font-size: 32upx;
        color: #999;
      }
      .icon-cuohao {
        position: absolute;
        right: 15upx;
        font-size: 40upx;
        color: #999;
      }
      .btn {
        width: 110upx;
        height: 83upx;
        border-radius: 4upx;
        background-color: #d9233b;
        margin-left: 20upx;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        image.magnifier{
          width: 45upx;
          height: 45upx;
        }
      }
    }
    .table_list {
      box-sizing: border-box;
      margin-bottom: 130upx;
      .span {
        overflow: hidden;
      }
      .diandian {
        width: 10rpx;
        height: 10rpx;
        border-radius: 50%;
        background: #fff;
        display: inline-block;
        margin-right: 20rpx;
        margin-bottom: 5rpx;
      }
      .red-dian {
        background: #d9233b;
      }
      .t-td {
        // display: flex;
        // flex-direction: row;
        // align-items: center;
      }
      .img-list {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        text-align: center;
        image.iconimg {
          width: 38upx;
          height: 10upx;
        }
        .iconfont {
          color: #b0b0b0;
          font-size: 38upx;
        }
        .color {
          color: #d9233b;
        }
      }
      image.select {
        width: 35upx;
        height: 35upx;
      }
      image.copy {
        width: 36upx;
        height: 40upx;
        margin-left: 40upx;
      }
    }
  }
</style>
